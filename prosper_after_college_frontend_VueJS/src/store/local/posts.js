import axiosRestClient from 'axios-rest-client'
const SET_POSTS = 'SET_POSTS'
const SET_RESULT = 'SET_RESULT'
const api = axiosRestClient({
  baseUrl: '/',
})


let headers = {
  'Accept': 'application/jso/defn',
  'Content-Type': 'application/json'
}



api.axios().defaults.headers.common = headers

export const state = () => ({
  items: null
})

export const actions = {
  async index ({ commit }) {
    return await api['data']['posts.json']().then(res => { commit(SET_POSTS, res )})
  }
}

export const getters = {
  postById: state => (alias) => { return state.items ? state.items.find(item => item.alias === alias) : null }
}

export const mutations = {
  [SET_POSTS] (state, payload) {
    state.items = payload.data
  }
}
