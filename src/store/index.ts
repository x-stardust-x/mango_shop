import { createStore } from "vuex";

export interface CartItem {
  name: string
  count: number
  price: number
  quantity: number
}

export default createStore({
  state: {
    cart: [] as CartItem[]
  },
  mutations: {
    ADD_TO_CART(state, item: CartItem) {
      const existing = state.cart.find(p => p.name === item.name && p.count === item.count)
      if (existing) {
        existing.quantity += item.quantity
      } else {
        state.cart.push({ ...item })
      }
    },
    REMOVE_ITEM(state, index: number) {
      state.cart.splice(index, 1)
    },
    CLEAR_CART(state) {
      state.cart = []
    }
  },
  actions: {
    addToCart({ commit }, item: CartItem) {
      commit('ADD_TO_CART', item)
    }
  },
  getters: {
    cartItems: state => state.cart,
    cartTotal: state => state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  modules: {}
})

