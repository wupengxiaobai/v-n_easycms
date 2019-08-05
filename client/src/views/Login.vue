<template>
  <div class="login">
    <section class="form-container">
      <div class="manage-tip">米修管理后台系统</div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="ruleForm"
      >
        <el-form-item label="Eamil" prop="email" required>
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" required>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <div class="to_login">
          没有账户，现在
          <router-link to="/register">注册</router-link>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { Message } from "element-ui";
import jwt_decode from "jwt-decode";
export default {
  data() {
    let validateEmail = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空！"));
      }
      //  格式校验
      let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入正确格式的邮箱"));
      }
      let ret = await new Promise((resolve, reject) => {
        this.$axios
          .get("/api/users/emailIsExist", {
            params: {
              email: value
            }
          })
          .then(res => {
            return resolve(res);
          });
      }).then(res => {
        return res;
      });

      if (!ret.data.code) {
        callback(new Error("邮箱不存在！"));
        return;
      }

      callback();
    };

    let validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空！"));
      }
      if (value.length < 6 || value.length > 20) {
        return callback(new Error("密码位数应在6~20以内！"));
      }
      callback();
    };

    return {
      ruleForm: {
        email: "",
        password: ""
      },

      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/login", this.ruleForm)
            .then(res => {
              if (res.data.success) {
                Message.success("登陆成功！");
                // 保存本地（token）
                localStorage.setItem("mixiuToken", res.data.token);

                //  解析token, 存储数据到vuex
                let decoded = jwt_decode(res.data.token);

                this.$store.dispatch(
                  "setAuthenticated",
                  !this.isEmpty(decoded)
                );
                this.$store.dispatch("setUser", decoded);

                setTimeout(() => {
                  this.$router.push("/index");
                }, 1500);
              } else {
                Message.error("登录失败，请确认输入邮箱/密码！");
              }
            })
            .catch(err => {
              Message.error("请求错误，登录失败！");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

<style lang='stylus' scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../assets/bg.jpg') no-repeat center / cover;
  background-size: 100% 100%;
  position: relative;

  .form-container {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 420px;
    min-height: 350px;
    transform: translate3d(-50%, -50%, 0);

    .manage-tip {
      text-align: center;
      font-size: 28px;
      font-weight: 700;
      color: #fff;
    }

    .ruleForm {
      margin-top: 50px;
      padding: 0 20px;

      .to_login {
        line-height: 1.2;
        font-size: 12px;
        text-align: right;
      }
    }
  }
}
</style>
