<template>
    <div class="text">
        <div class="text__wrapper default-container">
            <h1 class="default-title">States</h1>
            <div class="states">
              <nuxt-link
                prefetch
                :to="`/states/${state.label.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')}/`"
                class="states__link"
                v-for="(state, index) in states" :key="index"
              >
                {{ state.label }}
              </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { restApi } from '~/plugins/axios-rest-client'
export default {
  data(){
    return {
      //states: []
    };
  },
  metaInfo: {
    title: 'Browse colleges by state',
    htmlAttrs: {
      lang: 'en',
      amp: true
    },
    meta: [
      { name: 'description', content: 'Browse colleges and universities by state. Compare colleges by cost, roi and other attributes', vmid: 'description' },
      { name: 'keywords', content: 'Colleges by state,universities by state', vmid: 'keywords' }
    ],
  },
  async fetch ({ store, params, error, payload, res }) {
    if(!process.server){
      console.log("states -> client side")
      return
    }
    if (payload === undefined || res || null) {
      if (!store.getters['server/states/items'].length) {
        try {
          await store.dispatch('server/states/getStates')
          console.log('fetch getStates')
        } catch (e) {
          error({ statusCode: 404, message: 'Page Not Found' })
        }
      }
    } else {
      store.dispatch('server/states/setStates', payload)
      //console.log('fetch set states')
      //console.log(payload)
      //this.states = store.getters["server/states/items"]
      //console.log(this.states)
    }
  },
  async asyncData({ $payloadURL, route, params, payload, store }) {
    if (payload) {
      console.log('asyncData')
      console.log(payload)
      return {
        page: payload,
      }
    }

    // In production (process.static = true), fetch data from extracted payload
    if (process.static && process.client) {
      let res = await restApi.axios().get($payloadURL(route))
      console.log(res)
      let states = res.data.page
      store.dispatch("server/states/setStates", states);
      return res
    }
  },
  computed: { // --> can't use computed with asyncData well
    ...mapGetters({
      states: 'server/states/items',
    })
  },
  mounted() {
    //this.$nextTick(function () {
      //this.states = this.$store.getters["server/states/items"]
      //console.log(this.states)
    //})
  },
}
</script>
