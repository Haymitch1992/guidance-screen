<template>
  <div>
    <div class="danger-box">
      <danger-header :showtext="false"></danger-header>
      <div class="danger-content">
        <img class="danger-img" src="../assets/danger-page-7.png" alt="" />
        <div class="danger-text">
          <p>前方火灾</p>
          <p>请立即返回</p>
          <p class="danger-text-en">Fire ahead</p>
          <p class="danger-text-en">Please return immediately</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/danger.scss'; // 应急公共样式
import dangerHeader from '../components/danger-header.vue';
export default {
  name: '禁止出站',
  components: {
    dangerHeader
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss"></style>
