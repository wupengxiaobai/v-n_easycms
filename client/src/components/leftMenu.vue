<template>
  <div class="left-menu-component">
    <el-menu
      default-active="0"
      mode="vertical"
      class="el-menu-vertical-demo"
      background-color="#324057"
      text-color="#fff"
      active-text-color="#409eff"
    >
      <router-link to="/home">
        <el-menu-item index="0">
          <i class="fa fa-margin fa-server"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </router-link>
      <div v-for="(menu,index) in menus" :key="index">
        <el-submenu v-if="menu.children" :index="menu.path" :key="menu.path">
          <template slot="title">
            <i class="fa" :class="menu.icon"></i>
            <span slot="title">{{ menu.name }}</span>
          </template>
          <router-link :to="citem.path" v-for="(citem,cindex) in menu.children" :key="cindex">
            <el-menu-item :index="citem.path">
              <i class="fa" :class="citem.icon" v-if="citem.icon"></i>
              <span slot="title">{{ citem.name }}</span>
            </el-menu-item>
          </router-link>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "left-menu",
  data() {
    return {
      menus: [
        {
          icon: "fa-money",
          name: "资金管理",
          path: "fund",
          children: [
            {
              path: "/fundlist",
              name: "资金流水"
            }
          ]
        },
        {
          icon: "fa-info",
          name: "信息管理",
          path: "info",
          children: [
            {
              path: "/info",
              name: "个人信息"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang='stylus' scoped>
.left-menu-component {
  height: 100%;

  .el-menu-vertical-demo {
    // width: 220px;
    background: #324057;
    border: none;

    .fa {
      display: inline-block;
      width: 20px;
      margin-right: 5px;
    }

    .el-menu-item {
      display: flex;
      align-items: center;
    }
  }
}
</style>
