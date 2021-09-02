<template>
  <div class="header-box">
    <img src="../assets/sreen-logo.png" class="screen-logo" alt="screen-logo" />
    <span class="header-tip" v-if="showTip">
      面向任意摄像头挥手3秒即可召援！ Wave to any camera for 3 seconds!
    </span>
    <span class="header-tip2" v-if="showTime">
      {{ currentTime1[0] }}年{{ currentTime1[1] }}月{{ currentTime1[2] }}日{{
        transformCn[currentTime3]
      }}
      {{ currentTime2 }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'LOGO',
  props: {
    showTip: Boolean,
    showTime: Boolean
  },
  data() {
    return {
      currentTime1: '',
      currentTime2: '',
      currentTime3: '', // 星期几
      transformCn: [
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期日'
      ]
    };
  },
  mounted() {
    this.getCurrentTime();
    setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  },
  methods: {
    getCurrentTime() {
      let dayjs = require('dayjs');
      let currnet = dayjs();
      this.currentTime1 = currnet.format('YYYY-MM-DD').split('-');
      this.currentTime2 = currnet.format('HH:mm:ss');
      this.currentTime3 = currnet.day();
    }
  }
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
