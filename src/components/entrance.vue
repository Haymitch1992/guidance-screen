<template>
  <div class="stop-box">
    <div class="stop-item" :class="fullScreen ? 'fullScreen' : ''">
      <img
        src="../assets/entrance.png"
        v-if="stationType.text1 === '进站检票'"
        alt=""
        class="stop-img"
      />
      <img
        src="../assets/exit.png"
        v-if="stationType.text1 === '出站检票'"
        alt=""
        class="stop-img"
      />
      <div
        class="stop-text"
        :class="stationType.text1 === '出站检票' ? 'exit-text' : ''"
      >
        <p class="stop-text-1">{{ stationType.text1 }}</p>
        <p class="stop-text-2">{{ stationType.text2 }}</p>
      </div>
    </div>
    <div class="station-box" :class="fullScreen ? 'fullScreen' : ''">
      <!-- 进站右侧屏幕 显示 无感进站通道  -->
      <div class="urcc-box">
        <img src="../assets/urcc.jpg" alt="" class="urcc-logo" />
        <p>扫码体验无感进站</p>
      </div>
      <img
        src="../assets/gate-2.png"
        v-if="!showImage"
        alt=""
        class="station-img"
      />
      <img
        src="../assets/gate-1.png"
        v-if="showImage"
        alt=""
        class="station-img"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'forbid',
  props: {
    stationType: Object,
    fullScreen: Boolean
  },
  data() {
    return {
      showImage: false
    };
  },
  mounted() {
    // 获取参数
    if (localStorage.getItem('showAuto')) {
      this.showImage = true;
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  text-align: left;
  vertical-align: middle;
}

.urcc-box {
  padding: 0px;
  border-radius: 8px;
  position: fixed;
  top: 554px;
  left: 238px;
  border: 4px solid #2b2b46;
  z-index: 1000;
  background: #22223c;
  overflow: hidden;

  p {
    color: #0a96d9;
    font-size: 22px;
    text-align: center;
    line-height: 50px;
  }
  img {
    display: block;
    width: 200px;
    height: 200px;
  }
}
.stop-box {
  position: absolute;
  top: 260px;
  width: 100%;
  color: #fff;
  .stop-item {
    width: 1526px;
  }
  .station-box {
    width: 1526px;
    height: 416px;
    overflow: hidden;
    .station-img {
      width: 100%;
    }
  }
  .fullScreen {
    width: 100%;
  }
  .stop-img {
    display: inline-block;
    margin-right: 100px;
  }
  .arrow-img {
    display: inline-block;
    margin-right: 140px;
    margin-left: 50px;
    margin-top: 40px;
  }
  .stop-text {
    width: 730px;
    display: inline-block;
    vertical-align: top;
  }
  .stop-text-1 {
    font-size: 180px;
    height: 180px;
    line-height: 180px;
    font-weight: bold;
  }
  .stop-text-2 {
    font-size: 89px;
  }
  .stop-text-3 {
    font-size: 82px;
  }
  .stop-text-4 {
    font-size: 34px;
  }

  .exit-text {
    color: #fdd40d;
  }
}
</style>
