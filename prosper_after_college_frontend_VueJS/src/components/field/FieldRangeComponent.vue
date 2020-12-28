<template>
<no-ssr>
  <div>
    <div class="range-block form-group">
      <vue-slider
        ref="slider"
        v-model="slider"
        v-bind="options"
        @change="$emit('input', slider)"
      />
      <div class="range-years">
        <span class="start">{{ options.min }} years</span>
        <span>{{ slider }} years in debt</span>
        <span class="end">{{ options.max }} years</span>
      </div>
    </div>
  </div>
</no-ssr>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 10
    }
  },
  data(){
    return {
      slider: this.value || 0,
      options: {
        dotSize: 31,
        height: 9,
        min: this.min,
        max: this.max,
        interval: 1,
        clickable: true,
        duration: 0.5,
        tooltip: "none",
      }
    }
  }
}
</script>
<style lang="scss">
.vue-slider {
  padding: 0 !important;
  width: 308px !important;
  &-rail {
    background-color: #01a0f0;
    height: 9px;
    border-radius: 5px;
  }
  &-dot-handle {
    width: 31px;
    height: 31px;
    border-radius: 50%;
    background-image: linear-gradient(to right, #9c271f 0%, #ed7778 100%);
    z-index: 0;
    &::after {
        content: '';
        position: absolute;
        top: 30%;
        left: 29%;
        border-radius: 50%;
        width: 13px;
        height: 13px;
        background-color: #ffffff;
    }
  }
  &-process {
    background-color: white !important;
  }
}
  @media screen and (max-width: 767px) {
  .vue-slider {
      width: 265px !important;
    }
  }
</style>

