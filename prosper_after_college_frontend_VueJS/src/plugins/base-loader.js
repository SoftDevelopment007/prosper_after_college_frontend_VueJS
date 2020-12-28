export default async (context) => {
  const { store } = context
  const p1 = new Promise(async (resolve, reject) => {
    let { data } = await store.dispatch('local/formulas/getConstants').then(res => { return res })
    store.commit('local/formulas/SET_CONSTANTS', data)
    return resolve()
  })
  const p2 = new Promise(async (resolve, reject) => { await store.dispatch('server/states/getStates'); return resolve() })
  const p3 = new Promise(async (resolve, reject) => { await store.dispatch('server/majors/getMajors'); return resolve() })
  // const p4 = new Promise(async (resolve, reject) => { await store.dispatch('server/schools/getSchoolsByStates'); return resolve() })
  // const p5 = new Promise(async (resolve, reject) => { await store.dispatch('server/colleges/getCollegesByStates'); return resolve() })
  // const p6 = new Promise(async (resolve, reject) => { await store.dispatch('server/majors/getMajorsRoi'); return resolve() })

  return Promise.all([p1, p2, p3])
}
