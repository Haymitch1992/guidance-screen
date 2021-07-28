<template>
  <div class="header-box">
    <img src="../assets/sreen-logo.png" class="screen-logo" alt="screen-logo" />
    <div class="right-text" v-if="showtext">
      <p class="text-cn">当前区域为安全区域，请按引导标识有序疏散</p>
      <p class="text-en">
        The current area is safe, please evacuate orderly by guidence
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showtext: Boolean
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.header-box {
  width: 100%;
  height: 120px;
  position: absolute;
  padding: 40px 30px;
  box-sizing: border-box;
  text-align: left;
  top: 0;
  .screen-logo {
    width: 283px;
    display: inline-block;
    vertical-align: middle;
  }
  .right-text {
    display: inline-block;
    width: 1430px;
    vertical-align: middle;
    margin-left: 110px;
    box-sizing: border-box;
    text-align: right;
    p {
      color: #fff;
      font-size: 42px;
      font-weight: bold;
    }
    .text-en {
      font-size: 23px;
    }
  }
  .header-tip {
    width: 1440px;
    display: inline-block;
    font-size: 40px;
    color: #fff;
    border: 2px solid #707070;
    background: #1d1a1b;
    line-height: 74px;
    vertical-align: middle;
    margin-left: 110px;
    text-align: center;
    border-radius: 6px;
  }
  .header-tip2 {
    width: 1440px;
    display: inline-block;
    font-size: 40px;
    color: #fff;
    line-height: 74px;
    vertical-align: middle;
    margin-left: 110px;
    text-align: right;
    border-radius: 6px;
  }
}
</style>
