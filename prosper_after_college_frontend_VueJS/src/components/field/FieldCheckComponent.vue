<template>
  <div
    class="form-group form-group_check"
    :class="{ error: state, 'active': seen}"
    @click="seen = !seen"
  >
    <label
      ref="input"
      v-if="label"
    >
      {{ label }}
    </label>
    <input
      v-model="input"
      :class="inputClasses"
      :placeholder="placeholder"
      v-mask="mask"
      type="checkbox"
      :checked="value"
      @change="$emit('input', $event.target.checked)"
    />
     <!-- <label>
      <span ref="input" v-if="label"> 
        {{ label }}
      </span>
      <input
        v-model="input"
        :class="inputClasses"
        :placeholder="placeholder"
        v-mask="mask"
        type="checkbox"
        :checked="value"
        @change="$emit('input', $event.target.checked)"
      />
      <span class="checkbox-custom"></span>
    </label> -->
    <div
      v-if="state && (e || null)"
      class="error-message">
      {{ e }}
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: ""
      },
      label: {
        type: String,
        default: ""
      },
      inputClasses: {
        type: [String, Object, Array],
        default: ""
      },
      mask: {
        type: [String, Object, Array],
        default: ""
      },
      state: {
        type: [Number, Boolean],
        default: false
      },
      e: {
        type: String,
        default: ""
      },
      value: {
        type: [String, Number, Boolean],
        default: ""
      },
    },
    data() {
      return {
        input: this.value,
        focused: false,
        seen: true
      }
    },
    watch: {
      value: {
        handler(bef) {
          this.input = bef
        },
        deep: true
      }
    }
  };
</script>
