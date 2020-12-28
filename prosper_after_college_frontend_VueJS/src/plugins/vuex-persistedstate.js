import createPersistedState from "vuex-persistedstate";

export default ({store}) => {
  createPersistedState({
    key: 'setting',
    paths: ['server.schools.items']
  })(store)
}
