<template>
  <div class="broadcast-box">
    <div class="dongao-item">
      <img src="../assets/dongao.png" alt="" />
    </div>
    <div class="broadcast">
      <div class="broadcast-container" :style="{ left: leftNum + 'px' }">
        <div class="broadcast-item">
          <span class="broadcast-text" ref="box1">
            {{ this.$store.state.broadcast.cn }}
          </span>
        </div>
        <div class="broadcast-item" ref="box2">
          <span class="broadcast-text">
            {{ this.$store.state.broadcast.en }}
          </span>
        </div>
        <div class="broadcast-item">
          <span class="broadcast-text">
            {{ this.$store.state.broadcast.cn }}
          </span>
        </div>
        <div class="broadcast-item">
          <span class="broadcast-text">
            {{ this.$store.state.broadcast.en }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'broadcast',
  props: {
    weatherInfo: {
      type: Object,
      timer: ''
    }
  },
  data() {
    return {
      leftNum: 140
    };
  },
  mounted() {
    clearTimeout(this.timer);
    // 避免
    this.timer = setTimeout(() => {
      this.scrollScreen();
    }, 5000);
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    scrollScreen() {
      let calcWith =
        this.$refs.box1.offsetWidth + this.$refs.box2.offsetWidth + 40;
      // 获取内容的宽度
      setInterval(() => {
        if (this.leftNum <= -calcWith) {
          this.leftNum = 0;
        } else {
          this.leftNum = this.leftNum - 2;
        }
      }, 10);
    }
  }
};
</script>

<style scoped lang="scss">
.dongao-item {
  width: 120px;
  height: 120px;
  background: #003c85;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  img {
    display: block;
    margin: 20px auto 0;
  }
}
.broadcast-box {
  position: absolute;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.broadcast {
  background: #17172c;
  color: #fff;
  height: 120px;
  line-height: 120px;
  font-size: 50px;
}
.broadcast-container {
  position: absolute;
  width: 7060px;
  text-align: left;
}
.broadcast-item {
  display: inline-block;
  // width: 1920px;
}
.broadcast-text {
  margin-right: 40px;
  font-size: 40px;
}
</style>
