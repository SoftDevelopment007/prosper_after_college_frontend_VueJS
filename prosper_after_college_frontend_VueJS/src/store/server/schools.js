import _ from 'lodash'
import { restApi } from '~/plugins/axios-rest-client'
const SET_SCHOOLS = 'SET_SCHOOLS'
const SET_MORE_SCHOOLS = 'SET_MORE_SCHOOLS'
const SET_SCHOOLS_BY_STATES = 'SET_SCHOOLS_BY_STATES'
const SET_SCHOOLS_BY_STATE = 'SET_SCHOOLS_BY_STATE'

export const state = () => ({
  items: undefined,
  total: 0,
  schoolsByStates: [],
  schoolsByState: null,
})

export const getters = {
  items: state => state.items,
  total: state => state.total,
  schoolsByState: state => state.schoolsByState,
  schoolsByStates: state => (alias) => {
    return state.schoolsByStates || null
    ?
      Object.keys(state.schoolsByStates)
      .filter(key => key.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'') === alias )
      .reduce((obj, key) => {
        obj = state.schoolsByStates[key];
        return obj;
      }, {})
    : null
  },
  schoolByStateAndAlias: state => (stateAlias, schoolAlias) => {
    const key = Object.keys(state.schoolsByStates).find(key => key.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'') === stateAlias)
    return state.schoolsByStates || null
    ?
      state.schoolsByStates[key].find(item => item.Name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'') === schoolAlias)
    : null
  },
}

export const actions = {
  async autocomplete ({ commit }, payload) {
    return await this.$api.schools.autocomplete[payload.state][payload.search]()
  },
  async search ({ commit }, payload) {
    return await this.$api.schools.search.post(payload)
  },
  setSchools ({ commit }, payload) {
    commit('SET_SCHOOLS', payload)
  },
  loadMoreSchools ({ commit }, payload) {
    commit('SET_MORE_SCHOOLS', payload)
  },
  async getSchoolsByStates ({ commit }) {
    let res = await restApi.schools.generate.bystate()
    commit(SET_SCHOOLS_BY_STATES, res.data)
    return res
  },
  setSchoolsByStates ({ commit }, payload) {
    commit('SET_SCHOOLS_BY_STATES', payload)
  },
  setSchoolsByState ({ commit }, payload) {
    commit('SET_SCHOOLS_BY_STATE', payload)
  }
}

export const mutations = {
  [SET_SCHOOLS] (state, payload) {
    state.items = payload.Items
    state.total = payload.TotalResults
  },
  [SET_MORE_SCHOOLS] (state, payload) {
    state.items.push(...payload.Items)
  },
  [SET_SCHOOLS_BY_STATES] (state, payload) {
    state.schoolsByStates = payload.Data
  },
  [SET_SCHOOLS_BY_STATE] (state, payload) {
    state.schoolsByState = _.orderBy(_.map(payload, item => { return { Name: item.Name } } ), ['Name'], ['asc'])
  }
}
