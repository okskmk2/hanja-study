import Vue from "vue";
import Vuex from "vuex";
import { 시험기관 } from '../common/constant';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isModalOpen: false,
    modalBody: null,
    org: 시험기관.대한검정회,
    tier: 8,
    sub_tier: 1,
    searchingInclude: false
  },
  mutations: {
    openModal(state, payload) {
      state.isModalOpen = true;
      state.modalBody = payload;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.modalBody = null;
    },
    setSearchingOrg(state, payload) {
      state.org = payload;
    },
    setTier(state, payload) {
      state.tier = payload.tier;
      state.sub_tier = payload.sub_tier;
    },
    setSearchInclude(state, payload) {
      state.searchingInclude = payload;
    },
    setOrgTier(state, payload) {
      console.log(payload);
      state.org = payload.org_id;
      state.tier = payload.tier;
      state.sub_tier = payload.sub_tier;
    }
  },
  actions: {},
  modules: {},
});
