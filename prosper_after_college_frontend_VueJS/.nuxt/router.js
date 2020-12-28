import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _24ffb8ff = () => interopDefault(import('..\\src\\pages\\advisor.vue' /* webpackChunkName: "pages_advisor" */))
const _79317093 = () => interopDefault(import('..\\src\\pages\\calculator.vue' /* webpackChunkName: "pages_calculator" */))
const _12e813fb = () => interopDefault(import('..\\src\\pages\\guide.vue' /* webpackChunkName: "pages_guide" */))
const _26bcacae = () => interopDefault(import('..\\src\\pages\\result.vue' /* webpackChunkName: "pages_result" */))
const _4318bc85 = () => interopDefault(import('..\\src\\pages\\school.vue' /* webpackChunkName: "pages_school" */))
const _86271de2 = () => interopDefault(import('..\\src\\pages\\states\\index.vue' /* webpackChunkName: "pages_states_index" */))
const _0887e506 = () => interopDefault(import('..\\src\\pages\\terms.vue' /* webpackChunkName: "pages_terms" */))
const _1309ebfe = () => interopDefault(import('..\\src\\pages\\text.vue' /* webpackChunkName: "pages_text" */))
const _7b134ba3 = () => interopDefault(import('..\\src\\pages\\posts\\_alias.vue' /* webpackChunkName: "pages_posts__alias" */))
const _de2cac86 = () => interopDefault(import('..\\src\\pages\\states\\_state\\index.vue' /* webpackChunkName: "pages_states__state_index" */))
const _0664f4be = () => interopDefault(import('..\\src\\pages\\schools\\_state\\_alias.vue' /* webpackChunkName: "pages_schools__state__alias" */))
const _5e8a26d1 = () => interopDefault(import('..\\src\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/advisor",
    component: _24ffb8ff,
    name: "advisor"
  }, {
    path: "/calculator",
    component: _79317093,
    name: "calculator"
  }, {
    path: "/guide",
    component: _12e813fb,
    name: "guide"
  }, {
    path: "/result",
    component: _26bcacae,
    name: "result"
  }, {
    path: "/school",
    component: _4318bc85,
    name: "school"
  }, {
    path: "/states",
    component: _86271de2,
    name: "states"
  }, {
    path: "/terms",
    component: _0887e506,
    name: "terms"
  }, {
    path: "/text",
    component: _1309ebfe,
    name: "text"
  }, {
    path: "/posts/:alias?",
    component: _7b134ba3,
    name: "posts-alias"
  }, {
    path: "/states/:state",
    component: _de2cac86,
    name: "states-state"
  }, {
    path: "/schools/:state?/:alias?",
    component: _0664f4be,
    name: "schools-state-alias"
  }, {
    path: "/",
    component: _5e8a26d1,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
