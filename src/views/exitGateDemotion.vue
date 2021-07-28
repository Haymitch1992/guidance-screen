<template>
  <div>
    <headerbox :showTime="true"></headerbox>
    <broadcast></broadcast>
    <entrance :stationType="stationType" fullScreen="true"></entrance>
  </div>
</template>

<script>
import broadcast from '../components/broadcast.vue';
import headerbox from '../components/headerbox.vue';
import entrance from '../components/entrance.vue';
import { weatherInfoApi } from '../service/user';
export default {
  name: '出站检票',
  components: {
    broadcast,
    headerbox,
    entrance
  },
  data() {
    return {
      stationType: {
        text1: '出站检票',
        text2: 'Exit Gate'
      },
      timer:''
    };
    
  },
  methods: {
    getInfo() {
      weatherInfoApi(1, 1, 1).then(res => {
        this.$goPage();
      });
    }
  },
  mounted() {
    this.getInfo();
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.getInfo();
    }, this.intervalNum);
  }
};
</script>

<style></style>
