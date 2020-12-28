<template>
  <no-ssr>
    <div class="calculator">
        <div class="calculator__wrapper calculator__wrapper_desk default-container">
            <h1 class="default-title">College Cost And Future Lifestile Calculator</h1>
            <p class="top-text">On this page you can customize the many parameters that go into estimating your post-graduation lifestile. 
              Select up to two universities, adjust your expected starting salary and select the kind of lifestyle you expect to have after graduation. 
              You can override each value with your own $$ amount.
            </p>
            <app-form-calculator-dekstop
              v-model="calc"
              :form-modal-utilities="utilities"
              :form-modal-transportation="transportation"
              :form-modal-food="food"
              @goto="goCalc"
            />
        </div>
        <app-form-calculator-mobile
          v-model="calc"
          :form-modal-utilities="utilities"
          :form-modal-transportation="transportation"
          :form-modal-food="food"
          @goto="goCalc"
        />
        <app-modal-transportation @change:car="transportation = $event" />
        <app-modal-utilities @change:utilities="utilities = $event" />
        <app-modal-food @change:food="food = $event" />
    </div>
  </no-ssr>
</template>

<script>
import AppModalFood from "~/components/modals/ModalFoodComponent.vue";
import AppModalTransportation from "~/components/modals/ModalTransportationComponent.vue";
import AppModalUtilities from "~/components/modals/ModalUtilitiesComponent.vue";
import AppFormCalculatorDekstop from "~/components/forms/FormCalculatorDekstopComponent.vue";
import AppFormCalculatorMobile from "~/components/forms/FormCalculatorMobileComponent.vue";

export default {
  components: {
    AppFormCalculatorDekstop,
    AppFormCalculatorMobile,
    AppModalTransportation,
    AppModalUtilities,
    AppModalFood,
  },
  data() {
    return {
      calc: null,
      transportation: '',
      food: '',
      utilities: '',
    }
  },
  methods: {
    async goCalc () {
      let years = this.calc.school_years
      let Cost = this.calc.school.Cost
      let costNameField = this.calc.school.Control === 1 ? 'AvgInStateTuition' : 'AvgPrivateTuition'
      let costYears = this.calc.level === 0 ? (this.calc.school[costNameField] > 0 ? this.calc.school[costNameField] * years : Cost * years) : (this.calc.school[costNameField+this.calc.level] > 0 ? this.calc.school[costNameField+this.calc.level] * years : Cost * years)

      let schools = [{
        name: this.calc.school.Name,
        years: years,
        cost: costYears
      }]

      let DebtAmount = costYears
      let NumberOfYears = years

      if (this.calc.school1 || null) {
        costNameField = this.calc.school1.Control === 1 ? 'AvgInStateTuition' : 'AvgPrivateTuition'
        years = this.calc.school1_years
        costYears = this.calc.level === 0 ? (this.calc.school1[costNameField] > 0 ? this.calc.school1[costNameField] * years : Cost * years) : (this.calc.school1[costNameField+this.calc.level] > 0 ? this.calc.school1[costNameField+this.calc.level] * years : Cost * years)

        schools.push({
          name: this.calc.school1.Name,
          years: years,
          cost: costYears
        })

        DebtAmount += costYears
        NumberOfYears += years
      }

      let afterCost = Math.max(DebtAmount - parseInt(this.calc.amount || 0), 0)
      //let totalPayed = DebtAmount - afterCost

     let payloadMon = {
        DebtAmount: afterCost,
        NumberOfYears: this.calc.years
      }

      let expenses = {
        summ: 0,
        items: []
      }
      if (this.calc.food_cost || null) {
        expenses.items.push({
          name: 'Food',
          value: this.calc.food_cost
        })
        expenses.summ += this.calc.food_cost
      }
      if (this.calc.life_cost || null) {
        expenses.items.push({
          name: 'Living Arrangements (' + this.calc.life?.label + ')',
          value: this.calc.life_cost
        })
        expenses.summ += this.calc.life_cost
      }
      if (this.calc.out_cost || null) {
        expenses.items.push({
          name: 'Going Out',
          value: this.calc.out_cost
        })
        expenses.summ += this.calc.out_cost
      }
      if (this.calc.utilities_cost || null) {
        expenses.items.push({
          name: 'Utilities',
          value: this.calc.utilities_cost
        })
        expenses.summ += this.calc.utilities_cost
      }
      if (this.calc.retirement_cost || null) {
        expenses.items.push({
          name: 'Retirement Investment',
          value: this.calc.retirement_cost
        })
        expenses.summ += this.calc.retirement_cost
      }
      if (this.calc.transportation_cost || null) {
        expenses.items.push({
          name: 'Transportation',
          value: this.calc.transportation_cost
        })
        expenses.summ += this.calc.transportation_cost
      }
      if (this.calc.travel_cost || null) {
        expenses.items.push({
          name: 'Travel',
          value: this.calc.travel_cost
        })
        expenses.summ += this.calc.travel_cost
      }


      await this.$store.dispatch('local/formulas/calcOtherTax', { salary: parseInt(this.calc.salary) }).then(async income => {
        await this.$store.dispatch('local/formulas/calcDebtPayment', payloadMon).then(async loan => {
          let q = {
            schools: schools,
            totalCost: DebtAmount,
            afterCost: afterCost,
            contribution: this.calc.amount || 0,
            monthly: loan,
            income: income / 12,
            expenses_summ: expenses.summ,
            expenses: expenses.items,
            balance: income / 12 - loan - expenses.summ,
            salary: this.calc.salary,
            incomeTax: this.calc.salary - income,
            yearsLoan: this.calc.years,
          }
          this.$router.push({ path: '/result', query: { params: JSON.stringify(q)} })
        })
      })

    }
  }
};
</script>


