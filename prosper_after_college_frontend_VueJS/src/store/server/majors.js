const GET_MAJORS = 'GET_MAJORS'
const GET_MAJORS_ROI = 'GET_MAJORS_ROI'
export const state = () => ({
  items: [],
  majorsRoi: []
})

export const getters = {
  items: state => state.items,
  majorsRoi: state => state.majorsRoi,
}

export const actions = {
  async getMajors ({ commit }) {
    let res = await this.$api.schools.majors()
    commit(GET_MAJORS, res.data || null ? res.data.map(item => { return { code: item, label: item } }): [])
    return res
  },
  async getMajorsRoi ({ commit }, openId) {
    return this.$api.schools.school['major-roi'][openId]().then(res => {
      commit(GET_MAJORS_ROI, res.data.Data || null ? res.data.Data.map(item => { return { code: item.Roi, label: item.Major, salary: item.StartingSalary } }): [])
    }).catch(err => {console.log(err)})
  }
}

export const mutations = {
  [GET_MAJORS] (state, payload) {
    state.items = payload
  },
  [GET_MAJORS_ROI] (state, payload) {
    state.majorsRoi = payload
  }
}
