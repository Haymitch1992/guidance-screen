<template>
  <div>
    <headerbox :showTime="true"></headerbox>
    <broadcast></broadcast>
    <entrance :stationType="stationType" :fullScreen="true"></entrance>
  </div>
</template>

<script>
import broadcast from '../components/broadcast.vue';
import headerbox from '../components/headerbox.vue';
import entrance from '../components/entrance.vue';
import { weatherInfoApi } from '../service/user';
export default {
  name: 'jinzhan',
  components: {
    broadcast,
    headerbox,
    entrance
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
  methods: {
    // 降级页面监听接口 如果有数据 跳转回之前的
    getWeatherInfo() {
      weatherInfoApi(1, 1, 1).then(res => {
        this.$goPage();
      });
    }
  },
  mounted() {
    this.getWeatherInfo();
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.getWeatherInfo();
    }, this.intervalNum);
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    clearInterval(this.timer);
    next();
  }
};
</script>

<style></style>
