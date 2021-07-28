<template>
  <div>
    <headerbox :showTip="true"></headerbox>
    <div class="screen-C">
      <div class="screen-item">
        <img src="../assets/subway-icon.png" class="margin-icon" alt="" />
        <div class="screent-text-block" style="width:240px">
          <p>乘车</p>
          <p class="text">To Train</p>
        </div>

        <img class="distance-img" src="../assets/distance-right.gif" alt="" />
        <span class="distance-text" style="margin-right:20px">12m</span>
        <img src="../assets/arrow-top-right.png" alt="" />
      </div>
    </div>
    <broadcast></broadcast>
  </div>
</template>

<script>
import broadcast from '../components/broadcast.vue';
import headerbox from '../components/headerbox.vue';
import { trainInfo } from '../service/user';
export default {
  components: {
    broadcast,
    headerbox
  },
  data() {
    return {
      stationType: {
        text1: '出站检票',
        text2: 'Exit Gate'
      },
      timer: ''
    };
  },
  mounted() {
    this.getAtsInfo();
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.getAtsInfo();
    }, this.intervalNum);
  },
  methods: {
    getAtsInfo() {
      // 上行
      trainInfo(1, 1, 0).then(res => {
        this.$goPage();
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    clearInterval(this.timer);
    next();
  }
};
</script>

<style lang="scss" scoped>
.screen-C {
  position: absolute;
  top: 390px;
  width: 100%;
  padding: 0 44px;
  color: #fff;
  box-sizing: border-box;
  .waiting-box {
    vertical-align: top;
    margin-top: 20px;
    .waiting-img {
      display: block;
      width: 100%;
    }
    display: inline-block;
    position: relative;
    .waiting-box-item {
      display: inline-block;
      width: 180px;
      img {
        margin: 0 10px;
      }
    }
    .postion-img {
      position: absolute;
    }
    .postion-img-1 {
      top: 20px;
      left: 114px;
    }
    .postion-img-2 {
      top: 20px;
      left: 482px;
    }
    .postion-img-3 {
      top: 20px;
      left: 848px;
    }
    .postion-img-4 {
      top: 20px;
      left: 300px;
    }
    .postion-img-5 {
      top: 20px;
      left: 666px;
    }
  }
  .waiting-info {
    display: inline-block;
    text-align: left;
    width: 360px;
    margin-left: 120px;
    .waiting-info-item {
      display: inline-block;
      width: 180px;
      vertical-align: top;
    }
    img {
      vertical-align: top;
      margin-right: 20px;
    }
  }
  .waiting-info-text {
    display: inline-block;
    vertical-align: top;
    font-size: 32px;
    .text {
      font-size: 24px;
    }
  }
  .information-block {
    display: inline-block;
    font-size: 34px;
    vertical-align: middle;
    color: #707070;
    margin: 0 100px 0 20px;
    .text {
      font-size: 24px;
    }
  }
  .information-block-1 {
    display: inline-block;
    font-size: 48px;
    vertical-align: middle;
    margin-right: 40px;
  }
  .screen-item {
    border: 2px solid #707070;
    background: #1d1a1b;
    display: inline-block;
    width: 100%;
    border-radius: 20px;
    padding: 30px 0;
    margin-bottom: 30px;
  }
  .screent-text-block {
    display: inline-block;
    font-size: 68px;
    margin-right: 60px;
    text-align: left;
    vertical-align: middle;
    width: 500px;
    .text {
      font-size: 38px;
    }
  }
  .exit-block {
    color: #fdd40d;
  }
  .distance-text {
    font-size: 48px;
    margin-right: 80px;
    margin-left: 12px;
    vertical-align: middle;
  }
  .distance-img {
    margin-left: 20px;
    vertical-align: middle;
  }
  img {
    vertical-align: middle;
  }
  .margin-icon {
    margin: 0 22px;
  }
}
</style>
