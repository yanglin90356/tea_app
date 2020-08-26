import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('isLogin') || false,
    phone: localStorage.getItem('phone') || 0,
    uid: localStorage.getItem('uid') || 0,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  },
  mutations: {
    login_mutation(state, payload) {
      state.isLogin = true;
      state.phone = payload.phone
      state.uid = payload.uid
    },
    login_out(state) {
      state.isLogin = false;
      localStorage.clear();
    },
    updateCart(state, detail) {
      state.cart.push(detail)
    },
  },
  actions: {
  },
  modules: {
  }
})
