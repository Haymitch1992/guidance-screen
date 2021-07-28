<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { agsagsInfo } from '../src/service/user';
export default {
  data() {
    return {
      routerUrl: ''
    };
  },
  mounted() {
    // setInterval(() => {
    //   this.getDangerInfo();
    // }, this.intervalNum);
  },
  methods: {
    // 监听紧急状态
    getDangerInfo() {
      agsagsInfo(1).then(res => {
        // 如果返回值 那么页面进行跳转至应急页面
        if (res.data.result.page_type) {
          console.log('紧急接口0');
          this.routerUrl = `danger-${res.data.result.page_type}`;
          this.$router.push(this.routerUrl);
        } else {
          console.log('紧急接口1');
          this.$goPage();
        }
      });
      // .catch(() => {
      //   console.log('紧急接口2');
      //   this.$goBack();
      // });
      // 定时获取
    }
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 1920px;
  height: 1080px;
  background: #000 url('../src/assets/bg.png') repeat;
  position: relative;
}
p {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
