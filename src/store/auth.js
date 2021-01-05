const userId = localStorage.getItem('user')

export default {
  state: {
    userId: userId || null
  },

  mutations: {
    setUserId (state, id) {
      state.userId = id
      localStorage.setItem('user', id)
    }
  }
}
