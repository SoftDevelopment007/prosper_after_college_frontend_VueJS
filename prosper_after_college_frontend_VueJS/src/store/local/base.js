const SET_DEFAULT_SEARCH = 'SET_DEFAULT_SEARCH'

export const state = () => ({
  defaultSearch: {
    state: "",
    zip: "",
    major: "",
    salary: 0
  }
})

export const getters = {
  defaultSearch: state => state.defaultSearch
}

export const actions = {
  setDefaultSearch ({ commit }, payload) {
    commit('SET_DEFAULT_SEARCH', payload)
  }
}

export const mutations = {
  [SET_DEFAULT_SEARCH] (state, payload) {
    state.defaultSearch = payload
  }
}
