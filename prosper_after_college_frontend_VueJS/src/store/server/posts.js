export const actions = {
  async index ({ commit }, payload) {
    return await this.$api.schools.autocomplete[payload.state]['Academy of Art University']()
  },
}
