<template>
  <no-ssr>
  <div class="result">
    <div class="result__wrapper default-container">
      <h1 class="default-title">Your results and detailed explanation</h1>
      <div class="result__block">
        <div class="result__block-salary">
          <div class="result__block-title">
            <h5>Your salary:</h5>
            <span>Subtotal</span>
          </div>
          <div class="result__block-content">
            <div class="content-name">
              <span>Your starting salary:</span>
              <span>Income taxes:</span>
              <span>Total:</span>
            </div>
            <div class="content-price">
              <span class="cash valid">{{ q.salary | money }}</span>
              <span class="cash negative">{{ -q.incomeTax | money }}</span>
              <span class="cash valid">{{ totalSalaryIncome | money }}</span>
            </div>
          </div>
          <div class="result__block-total">
              <div class="result__block-group">
                <p>Your monthly salary after deductions is:</p>
                <span></span>
              </div>
              <span class="total valid">{{ (totalSalaryIncome / 12) | money }}</span>
          </div>
        </div>
        <div class="result__block-salary">
          <div class="result__block-title">
            <h5>School cost:</h5>
            <span class="mobile">Subtotal</span>
          </div>
          <div class="result__block-content">
            <div class="content-name">
              <span v-for="(school, index) in q.schools" :key="index">{{ school.name }}, {{ school.years }} years:</span>
              <span>Your contribution:</span>
              <span>Total:</span>
            </div>
            <div class="content-price">
              <span class="cash" v-for="(school, index) in q.schools" :key="index">{{ school.cost | money }}</span>
              <span class="cash">{{ -q.contribution | money }}</span>
              <span class="cash negative">{{ q.afterCost | money }}</span>
            </div>
          </div>
            <div class="result__block-total">
              <div class="result__block-group">
                <p>To pay off in {{ q.yearsLoan || '' }} years, your monthly payment is:</p>
                <span class="negative">{{ q.monthly | money }}</span>
              </div>
              <span class="total">{{ (totalSalaryIncome / 12 - q.monthly) | money }}</span>
            </div>
        </div>
        <div class="result__block-salary">
          <div class="result__block-title">
            <h5>Your monthly expenses:</h5>
            <span class="mobile">Subtotal</span>
          </div>
            <div class="result__block-content">
              <div class="content-name">
                <span v-for="(expense, index) in q.expenses" :key="index">{{ expense.name }}:</span>
              </div>
              <div class="content-price">
                <span class="negative" v-for="(expense, index) in q.expenses" :key="index">{{ -expense.value | money }}</span>
              </div>
              <div class="total-expenses">
                <span v-for="(expense, index) in expensesLess" :key="index">{{ expense | money }}</span>
            </div>
          </div>
          <div class="result__block-total">
            <div class="result__block-group">
              <p>Total:</p>
              <span class="negative">- {{ q.expenses_summ | money }}</span>
            </div>
            <span class="total">{{ q.balance | money }}</span>
          </div>
        </div>
        <div class="result__block-summary">
          <span v-if="q.balance >= 0" class="bold">
            Based on your lifestyle choices you should have <span class="valid">{{ q.balance | money }}</span> surplus at the end of each month.
          </span>
          <span v-else class="bold">
            Summary: you are lacking
            <span class="negative">{{ q.balance | money }}</span> in your monthly budget.
          </span>
          <p v-if="q.balance < 0">
            <span class="bold">Advice:</span> reduce your standard of living or pick cheaper schools
          </p>
          <h5 v-if="q.contribution >= 8000">A note about your educational contribution</h5>
          <p v-if="q.contribution >= 8000">
            If your educational contribution of {{ q.contribution | money }} were invested today at the average rate of return
            <br />of {{ constants.InvestmentRateOfReturn * 100 }}%, then in {{ constants.InvestmentNumberOfYears }} years it would become
            <span class="valid">{{ inv | money }}</span> that could potentially go towards yours or your parent's retirment.
          </p>
        </div>
        <p
          class="result-mobile-text"
        >Information provided on this page is meant to give you a sense of how much you need to be earning and how much you can afford to spend on education in order to achieve your life goals.
        It is not meant to deter you from applying to universities. In fact I recommend that you do apply to schools of your dream and wait till you receive your financial aid and scholarship letters.
        But at the end of the day, do your math and decide if your expected salary after graduation is sufficient to cover your educational loans and support your independent and comfortable living.</p>
      </div>
    </div>
  </div>
  </no-ssr>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    result: {
      type: [Array, Object],
      default() {
        return null;
      }
    }
  },
  data() {
    let q = this.$route.query.params ? JSON.parse(this.$route.query.params) : ''
    return {
      q: q,
      totalSalaryIncome: q.salary || (null && q.incomeTax) || null
                  ? q.salary - q.incomeTax
                  : "",
      inv: 0
    }
  },
  computed: {
    ...mapGetters({
      constants: 'local/formulas/constants',
    }),
    expensesLess() {
      let result = []
      let summ = this.totalSalaryIncome / 12 - this.q.monthly
      if (this.q.expenses || null) {
        result = this.q.expenses.map(item => {
          summ = summ - item.value
          return summ
        })
      }
      return result
    }
  },
  mounted () {
    this.invest()
  },
  methods: {
    async invest () {
      let res = await this.$store.dispatch('local/formulas/calcInvestment', this.q.contribution).then( res => res )
      this.inv = res
    },
  },
  filters: {
    money: (value) => {
      value = parseFloat(value)
      let n = 0
      let re = '\\d(?=(\\d{' + (3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
      if (!value) return '0'
      return (value < 0 ? '-' : '') + '$'+Math.abs(value).toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,')
    }
  }
};
</script>
