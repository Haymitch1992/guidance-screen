<template>
  <div>
    <div class="danger-box">
      <danger-header :showtext="false"></danger-header>
      <div class="danger-content">
        <img class="danger-img" src="../assets/danger-page-1.png" alt="" />
        <div class="danger-text">
          <p>禁止入内</p>
          <p>请尽快出站</p>
          <p class="danger-text-en">No entry</p>
          <p class="danger-text-en">Please leave the station immediately</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/danger.scss';
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
