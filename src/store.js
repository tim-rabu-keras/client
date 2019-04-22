import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    worlds: [
      {
        sky: '',
        plain: '',
      },
      {
        sky: '',
        plain: '',
      },
      {
        sky: '',
        plain: '',
      },
    ],
  },
  mutations: {},
  actions: {},
});
