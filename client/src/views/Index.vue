<template>
  <div class="index">
    <header-nav></header-nav>
    <article class="main">
      <left-menu class="left-menu"></left-menu>
      <div class="right-main">
        <router-view></router-view>
      </div>
    </article>
  </div>
</template>

<script>
import HeaderNav from "../components/headerNav";
import LeftMenu from "../components/leftMenu";
export default {
  name: "index",
  components: {
    HeaderNav,
    LeftMenu
  }
};
</script>

<style lang="stylus" scoped>
.index {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .main {
    width: 100%;
    height: 100%;
    display: flex;

    .left-menu {
      flex: 0 0 220px;
      width: 220px;
      background: #324057;
    }

    .right-main {
      flex: 1;
    }
  }
}
</style>

