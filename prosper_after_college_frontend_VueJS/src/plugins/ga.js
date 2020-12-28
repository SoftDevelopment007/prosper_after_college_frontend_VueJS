import Vue from 'vue';
import VueGtag from 'vue-gtag';

export default ({ app }) => {
  Vue.use(VueGtag, {
    config: { id: process.env.NUXT_ANALYTHICS },
    appName: 'ProsperAfterColleg',
    bootstrap: true,
    enabled: true,
    pageTrackerScreenviewEnabled: true
  }, app.router);
}
