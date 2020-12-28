import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_recaptcha_38e25b54 from 'nuxt_plugin_recaptcha_38e25b54' // Source: .\\recaptcha.js (mode: 'all')
import nuxt_plugin_googleanalytics_ff999b42 from 'nuxt_plugin_googleanalytics_ff999b42' // Source: .\\google-analytics.js (mode: 'client')
import nuxt_plugin_axiosrestclient_21170a16 from 'nuxt_plugin_axiosrestclient_21170a16' // Source: ..\\src\\plugins\\axios-rest-client (mode: 'client')
import nuxt_plugin_directives_543e091b from 'nuxt_plugin_directives_543e091b' // Source: ..\\src\\plugins\\directives (mode: 'client')
import nuxt_plugin_baseloader_74735b50 from 'nuxt_plugin_baseloader_74735b50' // Source: ..\\src\\plugins\\base-loader (mode: 'client')
import nuxt_plugin_vueselect_93678b8c from 'nuxt_plugin_vueselect_93678b8c' // Source: ..\\src\\plugins\\vue-select (mode: 'client')
import nuxt_plugin_vuebootstrap_201ad870 from 'nuxt_plugin_vuebootstrap_201ad870' // Source: ..\\src\\plugins\\vue-bootstrap (mode: 'client')
import nuxt_plugin_veevalidate_6a1e9ac4 from 'nuxt_plugin_veevalidate_6a1e9ac4' // Source: ..\\src\\plugins\\vee-validate (mode: 'client')
import nuxt_plugin_vueslidercomponent_3791a2cf from 'nuxt_plugin_vueslidercomponent_3791a2cf' // Source: ..\\src\\plugins\\vue-slider-component (mode: 'client')
import nuxt_plugin_inputmask_2798b882 from 'nuxt_plugin_inputmask_2798b882' // Source: ..\\src\\plugins\\inputmask (mode: 'client')
import nuxt_plugin_vuexpersistedstate_83c87d7c from 'nuxt_plugin_vuexpersistedstate_83c87d7c' // Source: ..\\src\\plugins\\vuex-persistedstate (mode: 'client')
import nuxt_plugin_vuemeta_9c475a7a from 'nuxt_plugin_vuemeta_9c475a7a' // Source: ..\\src\\plugins\\vue-meta (mode: 'client')
import nuxt_plugin_ga_a8b5ca1e from 'nuxt_plugin_ga_a8b5ca1e' // Source: ..\\src\\plugins\\ga (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp (ssrContext) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  const registerModule = store.registerModule
  store.registerModule = (path, rawModule, options) => registerModule.call(store, path, rawModule, Object.assign({ preserveState: process.client }, options))

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"titleTemplate":function (titleChunk) {
      return titleChunk ? `Prosper After College - ${titleChunk}` : 'Prosper After College, plan your adult life early'
    },"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Use this site to plan your post graduation future, estimate your salary and living expenses and decide how much education debt you can take on"},{"name":"keywords","content":"College cost calculator, College tuition and living expenses and ROI"},{"hid":"og-title","name":"og:title","content":"Prosper After College, plan your adult life early"}],"link":[{"rel":"apple-touch-icon","sizes":"180x180","href":"\u002Fapple-touch-icon.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"32x32","href":"\u002Ffavicon-32x32.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"16x16","href":"\u002Ffavicon-16x16.png "},{"rel":"manifest","href":"\u002Fsite.webmanifest "}],"style":[],"script":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  const inject = function (key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Plugin execution

  if (typeof nuxt_plugin_recaptcha_38e25b54 === 'function') {
    await nuxt_plugin_recaptcha_38e25b54(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googleanalytics_ff999b42 === 'function') {
    await nuxt_plugin_googleanalytics_ff999b42(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_axiosrestclient_21170a16 === 'function') {
    await nuxt_plugin_axiosrestclient_21170a16(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_directives_543e091b === 'function') {
    await nuxt_plugin_directives_543e091b(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_baseloader_74735b50 === 'function') {
    await nuxt_plugin_baseloader_74735b50(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueselect_93678b8c === 'function') {
    await nuxt_plugin_vueselect_93678b8c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuebootstrap_201ad870 === 'function') {
    await nuxt_plugin_vuebootstrap_201ad870(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_veevalidate_6a1e9ac4 === 'function') {
    await nuxt_plugin_veevalidate_6a1e9ac4(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueslidercomponent_3791a2cf === 'function') {
    await nuxt_plugin_vueslidercomponent_3791a2cf(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_inputmask_2798b882 === 'function') {
    await nuxt_plugin_inputmask_2798b882(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuexpersistedstate_83c87d7c === 'function') {
    await nuxt_plugin_vuexpersistedstate_83c87d7c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuemeta_9c475a7a === 'function') {
    await nuxt_plugin_vuemeta_9c475a7a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_ga_a8b5ca1e === 'function') {
    await nuxt_plugin_ga_a8b5ca1e(app.context, inject)
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
