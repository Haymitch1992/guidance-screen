import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    broadcast: {
      en: 'Welcome To Beijing subway Line 11, Please wait inline, while passengers exit from the train.',
      cn: '欢迎乘坐北京地铁11号线，请按车站提示标志排队候车。'
    },
    station: '11101',
    direction: '1',
    arrival_time: 3,
    emergencyState:true
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
    }
  },
  actions: {
  },
  modules: {
  },
});
