<template>
  <div class="hello">
    <ul>
      <li>
        <router-link class="link-tag" to="/entranceGate">
          1#（首钢站）
        </router-link>
      </li>
      <li>
        <router-link class="link-tag" to="/entranceGate">
          2#（首钢站）
        </router-link>
      </li>
      <li>
        <router-link class="link-tag" to="/exitGate">
          3#（首钢站）
        </router-link>
      </li>
      <li>
        <router-link class="link-tag" to="/screen4">
          4#（首钢站）
        </router-link>
      </li>
      <li>
        <router-link class="link-tag" to="/entranceGate">
          1#（金顶街）
        </router-link>
      </li>
      <li>
        <router-link class="link-tag" to="/entranceGate">
          2#（金顶街）
        </router-link>
      </li>
      <li>
        <router-link class="link-tag" to="/exitGate">
          3#（金顶街）
        </router-link>
      </li>
      <li>
        <router-link class="link-tag" to="/screen4">
          4#（金顶街）
        </router-link>
      </li>
      <li>
        <router-link class="link-tag" to="/entranceGate">
          1#（北新桥）
        </router-link>
      </li>
      <li>
        <router-link class="link-tag" to="/entranceGate">
          2#（北新桥）
        </router-link>
      </li>
      <li>
        <router-link class="link-tag" to="/exitGate">
          3#（北新桥）
        </router-link>
      </li>
      <li>
        <router-link class="link-tag" to="/screen4-3">
          4#（北新桥）
        </router-link>
      </li>
      <li>
        <router-link class="link-tag" to="/entranceGate">
          1#（金安桥）
        </router-link>
      </li>
      <li>
        <router-link class="link-tag" to="/entranceGate">
          2#（金安桥）
        </router-link>
      </li>
      <li>
        <router-link class="link-tag" to="/exitGate">
          3#（金安桥）
        </router-link>
      </li>
      <li>
        <router-link class="link-tag" to="/screen4">
          4#（金安桥）
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { screenSetting } from '../service/user';
export default {
  mounted() {
    // this.decidePageNum();
  },
  methods: {
    decidePageNum() {
      screenSetting().then(res => {
        let currentPage = '';
        // 判断是否有
        if (localStorage.getItem('currentPage')) {
          currentPage = localStorage.getItem('currentPage');
        } else {
          currentPage = res.data.currentPage;
        }
        this.$router.push(res.data.screenSetting[currentPage].router_url);
        localStorage.setItem(
          'device_id',
          res.data.screenSetting[currentPage].device_id
        );
        localStorage.setItem(
          'current',
          JSON.stringify(res.data.screenSetting[currentPage])
        );
        localStorage.setItem(
          'allRouter',
          JSON.stringify(res.data.screenSetting)
        );
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.lint-tag {
  display: block !important;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 50px 0 0 0;
  width: 1700px;
  margin: 0 auto;
}
li {
  display: inline-block;
  margin: 10px;
  font-size: 40px;
  text-align: center;
  width: 400px;
  border: 1px solid #ddd;
  height: 100px;
  line-height: 100px;
  vertical-align: top;
}
a {
  color: #42b983;
}
</style>
