<template>
  <div class="info">
    <div class="left">
      <div class="avatar">
        <img :src="user.avatar" alt>
      </div>
    </div>
    <div class="right">
      <div class="username">
        <i class="fa fa-user fa-lg"></i>
        {{ user.nickname }}
      </div>
      <div class="jurisdiction">
        <i class="fa fa-gear fa-lg"></i>
        {{ user.jurisdiction === 0?'普通管理':"超级管理" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style lang='stylus' scoped>
.info {
  width: 100%;
  height: 100%;
  display: flex;

  .left {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    // align-items:center;
    .avatar {
      width: 120px;
      height: 120px;
      overflow: hidden;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .right {
    flex: 2;
    line-height: 1.5;
    font-size: 22px;
    background: #ddd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .username {
    }
  }
}
</style>
