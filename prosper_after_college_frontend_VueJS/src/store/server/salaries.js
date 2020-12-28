export const state = () => ({
})

export const getters = {
}

export const actions = {
  async getSalaries ({ commit }, payload) {
    return await this.$api.schools.salary[payload.major][payload.state]()
  }
}

export const mutations = {
}
