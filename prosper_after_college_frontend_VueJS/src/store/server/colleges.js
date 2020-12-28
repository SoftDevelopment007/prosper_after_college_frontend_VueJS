import { restApi2 } from '~/plugins/axios-rest-client'

const SET_COLLAGES_BY_STATES = 'SET_COLLAGES_BY_STATES'
const SET_COLLEGE = 'SET_COLLEGE'


export const state = () => ({
  collagesByStates: [],
  college: null
})

export const getters = {
  collagesByStates: state => state.collagesByStates,
  collageByStateAndAlias: state => (schoolAlias) => {
    return state.collagesByStates.find(item => item.Institution.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'') === schoolAlias)
  },
  college: state => state.college
}

export const actions = {
  async getCollegesByStates ({ commit }) {
    let res = await restApi2.colleges()
    commit(SET_COLLAGES_BY_STATES, res.data)
    return res
  },
  setCollagesByStates ({ commit }, payload) {
    commit('SET_COLLAGES_BY_STATES', payload)
  },
  setCollage ({ commit }, payload) {
    commit('SET_COLLEGE', payload)
  }
}

export const mutations = {
  [SET_COLLAGES_BY_STATES] (state, payload) {
    state.collagesByStates = payload
  },
  [SET_COLLEGE] (state, payload) {
    state.college = payload
  }
}
