import { authService } from "@/services/auth/AuthService";
import { router } from "@/router";

const user = authService.getUserId();
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

const actions = {
  login({ commit }) {
    commit("loginRequest", user);
    authService.login();
  },
  async handleAuthenticationResponse({ dispatch, commit }) {
    try {
      const userInfo = await authService.handleAuthentication();
      commit("loginSuccess", userInfo);
      router.push({ path: authService.getReturnUrl() });
    } catch (e) {
      authService.logout();
      commit("loginFailure", e);
      router.push({ path: "/" });
      dispatch("alert/error", error, { root: true });
    }
  },
  logout({ commit }) {
    authService.logout();
    commit("logout");
    router.push("/");
  }
};

const mutations = {
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  }
};

const getters = {
  getUser(state) {
    return state.user && authService.getUserId();
  },
  getReturnUrl(state, getters) {
    return getters["getUser"] && authService.getReturnUrl();
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
