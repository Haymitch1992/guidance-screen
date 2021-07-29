<template>
  <div class="broadcast-box">
    <div class="dongao-item">
      <img src="../assets/dongao.png" alt="" />
    </div>
    <div class="broadcast">
      <div class="broadcast-container" :style="{ left: leftNum + 'px' }">
        <div class="broadcast-item">
          <span class="broadcast-text">欢迎乘坐北京地铁十一号线</span>
          <span>Welcome to BeiJing Subway Line 11</span>
        </div>
        <div class="broadcast-item" v-if="weatherInfo">
          <span class="broadcast-text">
            {{ weatherInfo.weather }} 温度 {{ weatherInfo.temperture }} 湿度
            {{ weatherInfo.humidity }}
          </span>
          <span>
            Welcome to BeiJing Subway Line 11
          </span>
        </div>
        <div class="broadcast-item" v-if="!weatherInfo">
          <span class="broadcast-text">欢迎乘坐北京地铁十一号线</span>
          <span>Welcome to BeiJing Subway Line 11</span>
        </div>
        <div class="broadcast-item">
          <span class="broadcast-text">欢迎乘坐北京地铁十一号线</span>
          <span>Welcome to BeiJing Subway Line 11</span>
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
      type: Object
    }
  },
  data() {
    return {
      leftNum: -500
    };
  },
  mounted() {
    this.scrollScreen();
  },
  methods: {
    scrollScreen() {
      setInterval(() => {
        if (this.leftNum <= -3840) {
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
  width: 1920px;
}
.broadcast-text {
  margin-right: 40px;
}
</style>
