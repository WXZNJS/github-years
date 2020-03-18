import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    userInfo: {},
    repoInfo: {},
    commitInfo: {},
    commitMap: {}
  },

  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },

    getRepoInfo(state) {
      return state.repoInfo;
    },

    getCommitInfo(state) {
      return state.commitInfo;
    },

    getCommitMap(state) {
      return state.commitMap;
    }
  },

  actions: {
    setUser({ commit }, obj) {
      commit("setUserInfo", obj);
    },

    setRepo({ commit }, obj) {
      commit("setRepoInfo", obj);
    },

    setCommit({ commit }, obj) {
      commit("setCommitInfo", obj);
    },

    setCommitMap({ commit }, obj) {
      commit("setCommitMap", obj);
    }
  },

  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },

    setRepoInfo(state, repoInfo) {
      state.repoInfo = repoInfo;
    },

    setCommitInfo(state, commitInfo) {
      state.commitInfo = commitInfo;
    },

    setCommitMap(state, commitMap) {
      state.commitMap = commitMap;
    }
  }
});

export default store;
