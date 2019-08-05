<template>
  <div class="register">
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
        <el-form-item label="昵称" prop="nickname" required>
          <el-input v-model="ruleForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" required>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" required>
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="to_login">
            已有账户，现在
            <router-link to="/login">登录</router-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  data() {
    let validateEmail = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空！"));
      }
      //  格式校验
      let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (!reg.test(value)) {
        return callback(new Error("请确定邮箱格式的正确！"));
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
          })
          .catch(err => {
            return callback(new Error("请求校验邮箱存在错误！"));
          });
      })
        .then(res => {
          return res;
        })
        .catch(err => {
          console.log("err__ ", err);
        });
      if (ret.data.code) {
        return callback(new Error(ret.data.msg));
      }
      callback();
    };

    let validateNickName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空！"));
      }
      if (value.length > 20 || value.length < 3) {
        return callback(new Error("昵称长度不宜少于3字节或超过20字节!"));
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

    let validatePass2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请在此输入密码！"));
      }
      if (this.ruleForm.checkPass != this.ruleForm.password) {
        return callback(new Error("两次密码输入不一致!"));
      }
      callback();
    };
    return {
      ruleForm: {
        email: "",
        nickname: "",
        password: "",
        checkPass: "",
        jurisdiction: ""
      },

      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        nickname: [{ validator: validateNickName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/register", this.ruleForm)
            .then(res => {
              if (res.data.code === 0) {
                Message.success("注册成功");
                setTimeout(() => {
                  this.$router.push("/login");
                }, 1500);
              } else {
                Message.error("T_T 注册失败");
              }
            })
            .catch(err => {
              Message.error("T_T 请求错误，注册失败！");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang='stylus' scoped>
.register {
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
    }

    .to_login {
      text-align: right;
      margin: -20px 0;
      font-size: 13px;
    }
  }
}
</style>
