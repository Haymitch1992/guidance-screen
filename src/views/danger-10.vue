<template>
  <div>
    <div class="danger-map">
      <danger-header :showtext="true"></danger-header>
      <div class="danger-content">
        <img class="map" src="../assets/danger-page-8.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/danger.scss'; // 应急公共样式
import dangerHeader from '../components/danger-header.vue';
export default {
  components: {
    dangerHeader
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss"></style>
