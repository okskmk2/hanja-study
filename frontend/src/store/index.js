import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isModalOpen: false,
    modalBody: null
  },
  mutations: {
    openModal(state, payload) {
      state.isModalOpen = true;
      state.modalBody = payload;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.modalBody = null;
    }
  },
  actions: {},
  modules: {},
});
