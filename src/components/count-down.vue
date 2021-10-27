<template>
  <div class="countDown" v-if="showCountBox">
    <p>距北京冬奥会开幕还有</p>
    <span></span>
    <span class="number-text">{{ day | toFix2 }}</span>
    <span>天</span>
    <span class="number-text">{{ hour | toFix2 }}</span>
    <span>时</span>
    <span class="number-text">{{ minute | toFix2 }}</span>
    <span>分</span>
    <span class="number-text">{{ second | toFix2 }}</span>
    <span>秒</span>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      targetTime: '2022-02-04 19:30:00', // 冬奥会开幕时间
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      timer: '',
      showCountBox: false
    };
  },
  computed: {},
  created() {},
  filters: {
    toFix2(val) {
      if (parseInt(val) < 10) {
        return '0' + val;
      } else {
        return val;
      }
    }
  },
  mounted() {
    this.calcTime();
    this.timer = setInterval(() => {
      this.calcTime();
    }, 1000);
  },
  methods: {
    calcTime() {
      // 计算时间差
      let timeNumber =
        new Date(this.targetTime).getTime() - new Date().getTime();
      if (timeNumber > 0) {
        this.showCountBox = true;
        this.day = Math.floor(timeNumber / (1000 * 60 * 60 * 24));
        this.hour = Math.floor((timeNumber / (1000 * 60 * 60)) % 24);
        this.minute = Math.floor((timeNumber / (1000 * 60)) % 60);
        this.second = Math.floor((timeNumber / 1000) % 60);
      } else {
        clearInterval(this.timer);
        this.showCountBox = false;
      }
    }
  },
  destroyed() {
    clearInterval(this.timer);
  },
  components: {}
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'electronicFont';
  src: url('../assets/DS-DIGIT.TTF');
}
.countDown {
  position: absolute;
  top: 30px;
  left: 1090px;
  z-index: 1000;
  background: #22223c;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 24px;
  color: #fff;
  border: 4px solid #2b2b46;
  p {
    line-height: 40px;
  }
}
.number-text {
  font-family: 'electronicFont';
  font-size: 40px;
  margin: 0 2px;
  width: 60px;
  display: inline-block;
  color: #0a96d9;
}
</style>
