<template>
  <div>
    <headerbox showTip="true"></headerbox>
    <div class="screen-A">
      <div class="screen-A-box">
        <div class="screen-top">
          <img
            src="../assets/arrow-left.png"
            style="margin-right:10px"
            alt=""
          />
          <img class="distance-img" src="../assets/distance-left.gif" alt="" />
          <span class="distance-text">12m</span>
          <img src="../assets/subway-icon.png" alt="" />
          <img class="margin-icon" src="../assets/line-6-big.png" alt="" />
          <div class="screent-text-block">
            <p>号线</p>
            <p class="text">Line 14</p>
          </div>
        </div>
      </div>
      <div class="screen-A-box">
        <div class="screen-top">
          <img
            src="../assets/subway-icon.png"
            style="margin-left:50px"
            alt=""
          />
          <img class="margin-icon" src="../assets/line-4-big.png" alt="" />
          <div class="screent-text-block">
            <p>号线</p>
            <p class="text">Line 3</p>
          </div>
          <img class="distance-img" src="../assets/distance-right.gif" alt="" />
          <span class="distance-text" style="margin-right:20px;">12m</span>
          <img
            src="../assets/arrow-right.png"
            alt=""
            class="margin-left-img"
            style="margin-left:20px;margin-right:10px"
          />
        </div>
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
  name: '进站检票',
  components: {
    broadcast,
    headerbox
  },
  data() {
    return {
      stationType: {
        text1: '进站检票',
        text2: 'Entrance Gate'
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
.screen-A {
  position: absolute;
  top: 450px;
  width: 100%;
  padding: 0 44px;
  color: #fff;
  box-sizing: border-box;
  .margin-left-img {
    margin-left: 80px;
  }
  .screen-top {
    padding: 38px 0 30px;
  }
  img {
    vertical-align: middle;
  }
  .quarantine {
    width: 100%;
    display: block;
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
  .screent-text-block {
    display: inline-block;
    width: 140px;
    font-size: 68px;
    margin-right: 60px;
    vertical-align: middle;
    text-align: left;
    .text {
      font-size: 38px;
    }
  }
  .margin-icon {
    margin: 0 22px;
  }
  .screen-bottom {
    width: 100%;
    text-align: left;
    .screen-bottom-item {
      width: 50%;
      display: inline-block;
      font-size: 40px;
      box-sizing: border-box;
      padding-left: 60px;
      padding-top: 60px;
      padding-bottom: 100px;
    }
    .text-1 {
      font-size: 40px;
      color: #707070;
    }
    .text-2 {
      font-size: 24px;
      color: #707070;
    }
    .text-3 {
      font-size: 60px;
      margin-top: 30px;
    }
  }
}
.screen-A-box {
  border: 2px solid #707070;
  background: #1d1a1b;
  display: inline-block;
  width: 50%;
  border-radius: 20px;
  width: 900px;
}
.screen-A-box:first-child {
  margin-right: 20px;
}
</style>
