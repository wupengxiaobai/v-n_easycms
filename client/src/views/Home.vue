<template>
  <div class="home">
    <div class="container">
      <h1 class="title">米修在线</h1>
      <p>专注啦啦啦啦啦啦啦，用心学习，用心服务！</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>

<style lang="stylus" scoped>
.home {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: url('../assets/showcase.png') 0 0 no-repeat;
  background-size: 100% 100%;

  .container {
    width: 100%;
    height: 100%;
    line-height: 1.5;
    align-items: center;
    color: #fff;
    background: rgba(0, 0, 0, 0.66);
    display: flex;
    flex-direction: column;
    justify-content: start;

    h1 {
      margin: 160px 0 20px 0;
      font-weight: 700;
      font-size: 36px;
    }

    p {
      font-size: 18px;
    }
  }
}
</style>

