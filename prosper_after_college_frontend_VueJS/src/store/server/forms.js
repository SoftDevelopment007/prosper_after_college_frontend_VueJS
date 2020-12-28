export const actions = {
  async sendContactUs ({ commit }, payload) {
    return await this.$api.schools.ContactUs.post(payload)
  }
}
