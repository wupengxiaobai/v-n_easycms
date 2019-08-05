<template>
  <div class="header-component">
    <el-row class="header-wrap">
      <el-col class="logo-wrap">
        <div class="logo">
          <img src="../assets/logo.png" alt>
        </div>
        <div class="title">米修后台管理系统</div>
      </el-col>
      <el-col class="info-wrap">
        <div class="avatar">
          <img :src="user.avatar" alt>
        </div>
        <div class="welcome">
          欢迎
          <div class="username">{{ user.nickname }}</div>
        </div>
        <div class="dropdown">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleCommand(dropItem) {
      switch (dropItem) {
        case "info":
          this.showUserInfo();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    logout() {
      //  删除本地的token
      localStorage.removeItem("mixiuToken");
      //  清楚vuex数据
      this.$store.dispatch("clearCurrentLoginInfo");
      //  路由跳转
      this.$router.push("/login");
    },
    showUserInfo() {
      this.$router.push("/info");
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style lang='stylus' scoped>
.header-component {
  height: 60px;
  color: #fff;
  background: #324057;

  .header-wrap {
    display: flex;
    justify-content: space-between;

    .logo-wrap {
      height: 60px;
      display: flex;
      align-items: center;

      .logo {
        img {
          margin: 0 10px;
          height: 45px;
        }
      }

      .title {
        font-size: 28px;
        font-weight: 700;
      }
    }

    .info-wrap {
      flex: 0 0 160px;
      width: 160px;
      height: 60px;
      display: flex;
      align-items: center;

      .avatar {
        overflow: hidden;
        border-radius: 50%;

        img {
          height: 45px;
        }
      }

      .welcome {
        text-align: center;
        font-size: 13px;
        margin: 0 5px;
        line-height: 1.2;

        .username {
          font-weight: 700;
          color: #409eff;
        }
      }

      .dropdown {
        line-height: 60px;
        height: 60px;
        cursor: pointer;

        .el-icon-arrow-down {
          color: #fff;
        }
      }
    }
  }
}
</style>

function newFunction(dropItem) {
  if(dropItem==="info") { }
}
