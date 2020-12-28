<template>
<client-only>
  <div class="form-group" :class="{ error: state }">
    <label ref="input" v-if="label">{{ label }}</label>
    <v-select
      v-model="selected"
      :class="inputClasses"
      :selectOnTab="true"
      :label="label"
      :filterable="true"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
      :max-height="maxHeight"
      :searchable="searchable"
      :multiple="multiple"
      :clear-search-on-select="clearSearchOnSelect"
      :close-on-select="closeOnSelect"
      :get-option-label="getOptionLabel"
      :options="items"
      :reduce="reduce"
      @search="onSearch"
      @input="changeValue"
      :map-keydown=" mapKeydownOn ? handlers : keydownDefault"
    ></v-select>
    <div v-if="state && (e || null)" class="error-message">{{ e }}</div>
  </div>
</client-only>
</template>
<script>
import _ from 'lodash'
export default {
  props: {
    label: {
      type: String,
      required: false
    },
    inputClasses: {
      type: String,
      required: false
    },
    reduseKey: {
      type: [String, Boolean],
      default: "code",
      required: false
    },
    value: {
      type: [Number, String, Array, Boolean, Object],
      default: null
    },
    updateValue: {
      type: [Number],
      default: null
    },
    state: {
      type: [Number, Boolean],
      default: false
    },
    e: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: String,
      default: "400px"
    },
    searchable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    clearSearchOnSelect: {
      type: Boolean,
      default: true
    },
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    labelName: {
      type: String,
      default: "label"
    },
    reduce: {
      type: Function,
      default: option => option
    },
    options: {
      type: [Array, Object],
      required: false,
      default() {
        return [];
      }
    },
    action: {
      type: String,
      default: ""
    },
    mapKeydownOn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: this.value,
      items: this.options || []
    };
  },
  methods: {
    keydownDefault: (map, vm) => ({
      ...map, 13: e => {
        e.preventDefault();
        vm.typeAheadSelect();
      },
    }),
    handlers: (map, vm) => ({
      ...map, 13: e => {
        if (process.BROWSER_BUILD) {
          let button = document.querySelector('.advisor__content-form .default-submit')
          e.preventDefault();
          vm.typeAheadSelect();
          button.focus()
        }
      },
    }),
    changeValue(payload, loading) {
      this.$emit(
        "change",
        this.reduseKey || null ? this.selected[this.reduseKey] : this.selected
      );
      this.$emit("input", this.selected);
    },
    onSearch(payload, loading) {
      this.$emit('search', payload)
      if (this.action !== "") {
        loading(true);
        this.search(loading, payload, this);
      }
    },
    search: _.debounce(async (loading, payload, vm) => {
      try {
        let response = await vm.$store.dispatch(vm.action, payload);
        vm.items = response.data;
      } catch (e) {
        console.log(e)
      } finally {
        loading(false);
      }
    }, 350),
    getOptionLabel(option) {
      if (typeof option === "object") {
        if (!option.hasOwnProperty(this.labelName)) {
          return console.warn(
            `[vue-select warn]: Label key "option.${this.labelName}" does not` +
              ` exist in options object ${JSON.stringify(option)}.\n` +
              "http://sagalbot.github.io/vue-select/#ex-labels"
          );
        }
        return option[this.labelName];
      }
      return option;
    }
  },
  watch: {
    value: {
      handler (bef) {
        this.selected = bef
      },
      deep: true
    },
    options: {
      handler (bef) {
        this.items = bef
      },
      deep: true
    }
  }
};
</script>
<style lang="scss">
.v-select {
  &.vs--open {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    .vs__dropdown-toggle {
      box-shadow: 0 !important;
      border: none !important;
      outline: none !important;
      border-bottom-left-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
      &::after {
        transform: rotate(180deg) translateY(50%);
      }
    }
  }
  .vs__selected {
    padding: 0;
  }
}
.vs__dropdown-toggle {
  border: none !important;
  border-radius: 25px !important;
  padding: 0 !important;
  width: 100%;
  position: relative;
  &::after {
    content: "";
    border: none;
    width: 32px;
    height: 32px;
    background-color: #01a0f0;
    border-radius: 50%;
    margin: 0;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(0, -50%);
    background-image: url("~assets/img/arrow-down.png");
    background-repeat: no-repeat;
    background-position: center 13px;
    pointer-events: none;
  }
  .vs__actions {
    display: none;
  }
  .vs__selected-options {
    padding-left: 24px;
    padding-right: 15px;
    position: relative;
  }
  input {
    margin: 0;
    box-shadow: none;
    padding: 0;
  }
  .vs__search {
    &:focus {
      padding: 0;
      margin-top: 0;
    }
  }
  .vs__selected {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 24px;
    margin: 0;
  }
}
.vs__dropdown-menu {
    overflow-x: hidden;
    z-index: 999;
    border-bottom-left-radius: 25px !important;
    border-bottom-right-radius: 25px !important;
  li {
    white-space: normal;
    &:hover {
      background-color: #01a0f0;
    }
  }
}
@media screen and (max-width: 767px) {
  .v-select {
    height: 40px !important;
  }
  .vs__dropdown-toggle {
    &::after {
      background-position: center 9px;
      right: 8px;
      width: 26px;
      height: 26px;
    }
    .vs__selected-options {
      padding-left: 20px;
      padding-right: 35px;
      position: relative;
      font-size: 14px;
    }
    input {
      margin: 0;
      box-shadow: none;
      padding: 0;
    }
    .vs__search {
      &:focus {
        padding: 0;
        margin-top: 0;
      }
    }
    .vs__selected {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 20px;
      margin: 0;
      padding: 0;
    }
  }
}
</style>

