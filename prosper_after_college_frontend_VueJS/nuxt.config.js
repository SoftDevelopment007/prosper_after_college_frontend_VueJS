import axios from 'axios'
import _ from 'lodash'

require('dotenv').config()

module.exports = {
  // mode: 'spa',
  target: 'static',
  //ssr: false,
  srcDir: 'src',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate(titleChunk) {
      return titleChunk ? `Prosper After College - ${titleChunk}` : 'Prosper After College, plan your adult life early'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Use this site to plan your post graduation future, estimate your salary and living expenses and decide how much education debt you can take on' },
      { name: 'keywords', content: 'College cost calculator, College tuition and living expenses and ROI'},
      { hid: 'og-title', name: 'og:title', content: 'Prosper After College, plan your adult life early' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png ' },
      { rel: 'manifest', href: '/site.webmanifest ' },

    ]
  },
  css: [
    '~assets/sass/style.scss'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#01a0f0' },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: {
      allChunks: true
    },
    /*
    ** Run ESLint on save
    */
    transpile: [
      "vee-validate/dist/rules"
    ],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['vue-select','vue-bootstrap','vee-validate','inputmask', 'lodash', 'axios-rest-client', 'vue-slider-component', 'vue-meta', 'ga' ]
  },
  plugins: [
    { src: '~plugins/axios-rest-client', ssr: false },
    { src: '~plugins/directives', ssr: false },
    { src: '~plugins/base-loader', ssr: false, defer: true },
    { src: '~plugins/vue-select', ssr: false },
    { src: '~plugins/vue-bootstrap', ssr: false },
    { src: '~plugins/vee-validate', ssr: false },
    { src: '~plugins/vue-slider-component', ssr: false },
    { src: '~plugins/inputmask', ssr: false },
    { src: '~plugins/vuex-persistedstate', ssr: false },
    { src: '~plugins/vue-meta', ssr: false },
    { src: '~plugins/ga', ssr: false, mode: 'client' }
  ],
  buildModules: [
    ['@nuxtjs/dotenv', { path: '', systemvars: true }],
    ['@bchteam/sentry-nuxt', {
      dsn: process.env.NUXT_ENV_SENTRY_DNS || ''
    }],
    ['@nuxtjs/google-analytics', {
      id:'UA-156064713-1',
      // id: process.env.NUXT_ANALYTHICS,
      debug: {
        enabled: process.env.NODE_ENV === 'development' ? true : false,
        sendHitTask: true
      }
    }],
    ['@nuxtjs/recaptcha', {
      hideBadge: false,
      siteKey: '6LeqwdEUAAAAAG-Nk9EAMc8wuRyHMmia5nYp0ip_',
      // siteKey: process.env.NUXT_SITE_KEY_RECAPTCHA || false,
      version: 3
    }],
    //['nuxt-payload-extractor'],
    [
      '@nuxtjs/sitemap', {
        hostname: 'http://localhost:3000',
        //hostname: 'https://prosperaftercollege.com',

        async routes() {
          const host = 'https://h5rey2wka4.execute-api.us-east-1.amazonaws.com/prod/v1.1/'
          const hostColleges = 'https://jzdulunu9c.execute-api.us-east-1.amazonaws.com/prod/'
          let routes = [
            '/advisor',
            '/calculator',
            ]
          let states = await axios.get(`${ host }schools/states`)

          routes.push('/states')

          //let schools = await axios.get(`${ host }schools/generate/bystate`)

          let routesStates = _.map(states.data, (item) => {
            return `/states/${_.toLower(item.name).replace(/ /g,'-').replace(/[^\w-]+/g,'')}`
          })

          // console.log(routesStates)

          routes = _.concat(routes, routesStates)

          let colleges = await axios.get(`${ hostColleges }colleges`)

          let routesColleges = _.map(colleges.data, (item) => {
            let state = states.data.find(ind => ind.code === item.state)
            return `/schools/${_.toLower(state.name).replace(/ /g,'-').replace(/[^\w-]+/g,'')}/${_.toLower(item.Institution).replace(/ /g,'-').replace(/[^\w-]+/g,'')}`
          })

          // console.log(routesColleges)

          routes = _.concat(routes, routesColleges)

          return routes
        },
        path: '/sitemap.xml',
        gzip: true
    }]
  ],
  sentry: {
    disabled: process.env.NUXT_ENV_SENTRY_DNS ? true : false,
    config: {
        // Additional Sentry config
    },
  },
  generate: {
    fallback: false,
    minify: false,
    // subFolders: false,
    async routes () {
      const host = 'https://h5rey2wka4.execute-api.us-east-1.amazonaws.com/prod/v1.1/'
      const hostColleges = 'https://jzdulunu9c.execute-api.us-east-1.amazonaws.com/prod/'
      let routes = [
        {
          route: '/advisor'
        },
        {
          route: '/calculator'
        },
        {
          route: '/guide'
        }
      ]
      let states = await axios.get(`${ host }schools/states`)

      routes.push({
        route: '/states',
        payload: states.data
      })

      let schools = await axios.get(`${ host }schools/generate/bystate`)

      let routesStates = _.map(states.data, (item) => {
        return {
          route: `/states/${_.toLower(item.name).replace(/ /g,'-').replace(/[^\w-]+/g,'')}`,
          payload: schools.data.Data[item.name]
        }
      })

      // console.log(routesStates)

      routes = _.concat(routes, routesStates)

      let colleges = await axios.get(`${ hostColleges }colleges`)

      let routesColleges = _.map(colleges.data, (item) => {
        let state = states.data.find(ind => ind.code === item.state)
        return {
          route: `/schools/${_.toLower(state.name).replace(/ /g,'-').replace(/[^\w-]+/g,'')}/${_.toLower(item.Institution).replace(/ /g,'-').replace(/[^\w-]+/g,'')}`,
          payload: item
        }
      })

      // console.log(routesCollages)

      routes = _.concat(routes, routesColleges)

      return routes
    }
  },
  /*
  ** Router configuration
  */
 router: {
    prefetchLinks: true,
    scrollBehavior: async (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }

      const findEl = async (hash, x) => {
        return document.querySelector(hash) ||
          new Promise((resolve, reject) => {
            if (x > 50) {
              return resolve()
            }
            setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
          })
      }

      if (to.hash) {
        let el = await findEl(to.hash)
        if ('scrollBehavior' in document.documentElement.style) {
          return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
        } else {
          return window.scrollTo(0, el.offsetTop)
        }
      }

      return { x: 0, y: 0 }
    }
  }
}

