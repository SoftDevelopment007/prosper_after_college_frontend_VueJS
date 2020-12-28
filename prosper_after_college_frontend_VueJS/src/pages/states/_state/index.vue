<template>
  <div class="text">
    <div class="text__wrapper default-container">
      <h1 class="default-title">Colleges in {{ $route.params.state.charAt(0).toUpperCase() + $route.params.state.slice(1) }}</h1>
      <div class="states schools-by-state">
        <div class="advisor__content-result" v-for="(item, index) in schools" :key="index">
          <div class="result-name">
            <nuxt-link prefetch :to="`/schools/${ $route.params.state }/${ item.Name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'') }/`">
              {{ item.Name }}
            </nuxt-link>
          </div>
        </div>
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
      //schools : {}
    }
  },
  metaInfo() { 
    return {
      title: `Colleges in ${ this.$route.params.state.charAt(0).toUpperCase() + this.$route.params.state.slice(1)}`,
      meta: [
        { name: 'description', content: `Colleges in ${ this.$route.params.state.charAt(0).toUpperCase() + this.$route.params.state.slice(1)}`, vmid: 'description' },
        { name: 'keywords', content: `Colleges in ${ this.$route.params.state.charAt(0).toUpperCase() + this.$route.params.state.slice(1)},Universities in ${ this.$route.params.state.charAt(0).toUpperCase() + this.$route.params.state.slice(1)}`, vmid: 'keywords' }
      ]
    }
  },
  async fetch ({ store, params, error, payload, res }) {
    if(!process.server){
      // alert("PROC")
      console.log("_alias -> client side")
      // return
    }
    if (payload === undefined || res || null) {
      if (!store.state.server.schools.schoolsByStates.length) {
        try {
          await store.dispatch('server/schools/getSchoolsByStates')
        } catch (e) {
          console.log(e)
          error({ statusCode: 404, message: 'Page Not Found' })
        }
      }
      store.dispatch('server/schools/setSchoolsByState', store.getters['server/schools/schoolsByStates'](params.state))
    } else {
      store.dispatch('server/schools/setSchoolsByState', payload)
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
    console.log("process.static=" + process.static)
    console.log("process.client=" + process.client)
    // In production (process.static = true), fetch data from extracted payload
    if (process.static && process.client) {
      let res = await restApi.axios().get($payloadURL(route))
      console.log(res)
      let schools = res.data.page 
      store.dispatch("server/schools/setSchoolsByState", schools);
      return res
    }
  },
  head () {
    
    return {
      title: `Colleges in ${ this.$route.params.state.charAt(0).toUpperCase() + this.$route.params.state.slice(1) }`
    }
  },
  computed: {
    ...mapGetters({
      schools: 'server/schools/schoolsByState',
    })
  },
  mounted() {
    //this.$nextTick(function () {
    //  this.schools = this.$store.getters["server/schools/schoolsByState"]
    //})
  },
}
</script>
