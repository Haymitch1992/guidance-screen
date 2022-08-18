import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    broadcast: {
      en: 'Welcome To Beijing subway Line 11, Please wait inline, while passengers exit from the train.',
      cn: '欢迎乘坐北京地铁11号线，请按车站提示标志排队候车。'
    },
    countNum: {
      get_in: 23,
      get_out: 21,
      sum:8245
    },
    station: '11101',
    direction: '1',
    recommend:1, // 商业推荐
    arrival_time: 3,
    emergencyState:1, // 1正常状态 2应急状态 3普通暴雨 4严重暴雨 5开关站准备
  },
  mutations: {
    setBroadcast(state, info) {
      state.broadcast = info
    },
    setStation(state, obj) {
      state.station= obj.station
      state.direction= obj.direction
    },
    setArrivalTime(state, val) {
      state.arrival_time = val
    },
    setEmergencyState(state, val) {
      state.emergencyState = val
    },
     setRecommendState(state, val) {
      state.recommend = val
    },
    setCountNum(state, val) {
      state.countNum = val
    }
  },
  actions: {
  },
  modules: {
  },
});
