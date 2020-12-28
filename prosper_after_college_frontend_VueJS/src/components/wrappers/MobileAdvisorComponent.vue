<template>
  <div>
    <div class="advisor__content-option mobile">
      <div class="filter-center">
        <slot name="filter-center"></slot>
      </div>
      <div class="option-price">
        <slot name="range"></slot>
      </div>
    </div>
    <div class="mobile__filter active">
      <div class="mobile__filter-block">
        <div class="filter-down">
          <slot name="filter-down"></slot>
        </div>
      </div>
    </div>
    <br />
    <div class="mobile__filter" :class="{ active: isActive }">
      <div
        class="mobile__filter-btn"
        @click="isActive=!isActive, $emit('toggleMenu', isActive);">
        <p>Additional Filters</p>
        <img src="~/assets/img/arrow-down.png" alt="">
      </div>
      <div class="mobile__filter-block">
        <div class="filter-top">
          <slot name="filter-top"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: this.active
    }
  },
  watch: {
    active: {
      handler(bef) {
        this.isActive = bef
      }
    }
  }
}
</script>
<style lang="scss">
  @media screen and (max-width: 767px) {
     .home__search  {
      z-index: 0 !important;
    }
    .advisor__content-form {
      .home-select1 {
        z-index: 3;
      }
    }
  }
</style>
