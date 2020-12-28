import { restApi } from '~/plugins/axios-rest-client'
const SET_STATES = 'SET_STATES'
export const state = () => ({
  items: []
})

export const getters = {
  items: state => state.items.map(item => { return { code: item.code, label: item.name } }),
}

export const actions = {
  async getStates ({ commit }) {
    let res = await restApi.schools.states()
    commit(SET_STATES, res.data)
    return res
  },
  setStates ({ commit }, payload) {
    commit(SET_STATES, payload)
  }
}

export const mutations = {
  [SET_STATES] (state, payload) {
    state.items = payload
  }
}
