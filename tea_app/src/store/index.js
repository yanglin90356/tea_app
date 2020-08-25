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
    // updateGoosChecked(state, info) {
    //   state.cart.some(item => {
    //     if (item.Id == info.Id) {
    //       item.ssschecked = info.ssschecked
    //     }
    //   })
    //   // 把最新的所有购物车商品的状态保存到store状态中去
    //   localStorage.setItem('cart', JSON.stringify(state.cart))
    // },

  },
  // getters: {
  //   getGoodsSelect(state) {
  //     let selce = {}
  //     state.cart.forEach(item => {
  //       selce[item.Id] = item.ssschecked
  //     })
  //     return selce
  //   },
  //   getGoodsCountAndAmount(state) {
  //     let sum = {
  //       count: 0,
  //       amount: 0
  //     };
  //     state.cart.forEach(item => {
  //       if (item.ssschecked) {
  //         sum.count += item.count;
  //         sum.amount += item.count * item.Price
  //       }
  //     })
  //     return sum;
  //   }
  // },
  actions: {
  },
  modules: {
  }
})
