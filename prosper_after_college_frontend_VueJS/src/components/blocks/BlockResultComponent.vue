<template>
  <div class="result__block-salary">
    <div class="result__block-title">
      <h5>{{ result.title }}</h5>
      <span>Subtotal</span>
    </div>
    <div
      class="result__block-content"
    >
      <div class="content-name">
        <span
          v-for="result in result.result"
          :key="result.title"
        >
          {{result.title}}
        </span>
      </div>
      <div class="content-price">
        <span class="cash"
          v-for="result in result.result"
          :key="result.title"
        >
          {{ result.result | money }}
        </span>
      </div>
       <div class="total-expenses">
        <span class="cash"
          v-for="expenses in result.expenses"
          :key="expenses.result"
        >
        <span>{{ expenses.result | money }}</span>
        </span>
      </div>
    </div>
    <div class="result__block-total"
      v-for="total in result.total"
      :key="total.title"
    >
    <div class="result__block-group">
      <p>{{ total.title }}</p>
       <span>{{ total.result | money }}</span>
    </div>
      <span class="total">{{ total.result_all | money }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    result: {
      type: [Array, Object],
      default () {
        return null
      }
    },
  },
  filters: {
    money: (value) => {
      value = parseFloat(value)
      let n = 0
      let re = '\\d(?=(\\d{' + (3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
      if (!value) return ''
      return (value < 0 ? '-' : '') + '$'+ Math.abs(value).toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,')
    }
  }
}
</script>

