import Vue from 'vue'
import Inputmask from 'inputmask'

const VueInputMask = {
  install: function(Vue) {
    Vue.directive('mask', {
        bind: function(el, binding) {
          Inputmask(binding.value).mask(el)
        }
    })
  }
}
Vue.use(VueInputMask)