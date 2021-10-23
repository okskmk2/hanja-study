import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDimCoverOpen: false,
    isModalCoverOpen: false,
    isShowScrollUp: true,
  },
  mutations: {
    setDimCoverState(state, isOpen) {
      state.isDimCoverOpen = isOpen;
    },
    setModalCoverState(state, isOpen) {
      state.isModalCoverOpen = isOpen;
    },
    setScrollUpState(state, isShow) {
      state.isShowScrollUp = isShow;
    },
  },
  actions: {},
  modules: {},
});
