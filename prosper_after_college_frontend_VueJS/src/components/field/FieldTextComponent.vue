<template>
  <div
    class="form-group"
    :class="{ error: state }">
    <label
      ref="input"
      v-if="label"
    >
      {{ label }}
    </label>
    <input
      v-model="input"
      @input="$emit('input', $event.target.value)"
      :class="inputClasses"
      :placeholder="placeholder"
      v-mask="mask"
      :type="type"
      :maxlength="maxlength"
    />
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
      maxlength: {
        type: Number,
        default: null
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
        type: [String, Number],
        default: ""
      },
      type: {
        type: [String],
        default: "text"
      }
    },
    data() {
      return {
        input: this.value,
        focused: false,
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
