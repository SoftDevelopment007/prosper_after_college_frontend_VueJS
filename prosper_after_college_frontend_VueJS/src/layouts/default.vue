<template>
  <div class="nuxt-wrapper">
    <app-header/>
    <nuxt/>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from "~/layouts/AppHeader.vue";
import AppFooter from "~/layouts/AppFooter.vue";
import _ from 'lodash'

export default {
  components: {
    AppHeader,
    AppFooter,
  }
};
</script>



