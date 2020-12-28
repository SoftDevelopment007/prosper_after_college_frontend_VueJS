<template>
<no-ssr>
  <app-loader v-model="loading">
    <div class="advisor">
      <div class="advisor__wrapper default-container">
        <div class="advisor__aside">
          <div class="advisor__aside-filter">
            <h6>Filters</h6>
            <div class="advisor__content-option">
              <div class="option-price">
                <app-field-range v-model="years" :min="1" name="years" @input="setResults" />
                <div class="choice-price">
                  <app-field-text
                    v-model="monthly"
                    name="monthly"
                    label="Estimated starting salary after graduation:"
                    :mask="{ 'alias': 'decimal', 'groupSeparator': '', 'autoGroup': true, rightAlign: false, showMaskOnHover: false }"
                    @input="setResults"
                  />
                  <app-field-text
                    v-model="amountCollage"
                    name="monthly"
                    label="Amount you can put towards college:"
                    :mask="{ 'alias': 'decimal', 'groupSeparator': '', 'autoGroup': true, rightAlign: false, showMaskOnHover: false }"
                    @input="setResults"
                  />
                  <no-ssr>
                  <app-field-select
                    v-model="quantity"
                    class="select-arrow"
                    name="quantity"
                    input-classes="custom-select"
                    label="Household annual income:"
                    :options="quantityOptions"
                    :reduse="item => item.code"
                    @input="setResults"
                    @change="form.incomeLevel = $event"
                  />
                  </no-ssr>
                </div>
              </div>
            </div>
          </div>
          
          <div class="advisor__aside-filter advisor__aside-second">
            <form @submit.prevent>
              <h6>Filter schools</h6>
              <app-field-select
                v-model="admRate"
                name="admRate"
                class="select-arrow"
                label="Admission Rate"
                input-classes="custom-select"
                :options="admissionRates"
                :reduse="item => item.code"
                @input="setResults"
                @change="form.admRate = $event"
              />
              <app-field-check
                v-model="form.includeCommunity"
                name="includeCommunity"
                label="Include Community Colleges"
              />
              <app-field-check
                v-model="form.includeState"
                name="includeState"
                label="Include State Universities"
              />
              <app-field-check
                v-model="form.includePrivate"
                name="includePrivate"
                label="Include Private Universities"
              />
              <app-field-text
                v-model="form.name"
                name="name"
                label="School Name"
                type="text"
                @input="setResults"
              />
            </form>
          </div>
          
          <div class="advisor__aside-filter advisor__aside-second">
            <form @submit.prevent>
              <h6 class="no-lower-margin">Filter schools by test scores</h6>
              <h5>Enter your test scores</h5>
              <app-field-text
                v-model="form.satMScore"
                name="satMScore"
                label="Math SAT"
                type="number"
                :mask="{ 'alias': 'decimal', 'autoGroup': true, showMaskOnHover: false }"
                @input="setResults"
              />
              <app-field-text
                v-model="form.satRScore"
                name="satRScore"
                label="Reading SAT"
                type="number"
                :mask="{ 'alias': 'decimal', 'autoGroup': true, showMaskOnHover: false }"
                @input="setResults"
              />
              <app-field-text
                v-model="form.actMScore"
                name="actMScore"
                label="Math ACT"
                type="number"
                :mask="{ 'alias': 'decimal', 'autoGroup': true, showMaskOnHover: false }"
                @input="setResults"
              />
              <app-field-text
                v-model="form.actRScore"
                name="actRScore"
                label="English ACT"
                type="number"
                :mask="{ 'alias': 'decimal', 'autoGroup': true, showMaskOnHover: false }"
                @input="setResults"
              />
              
            </form>
          </div>
          
          <app-block-banner />
          <app-block-search-tips />
        </div>
        <div class="advisor__content">
          <div class="advisor__content-bg"></div>
          <app-form-college-search
            form-classes="home__select advisor__content-form"
            @search="search"
          />
          <app-mobile-advisor
            :active="isActive"
            @toggleMenu="isActive = $event"
          >
            <template slot="filter-center">
              <app-form-college-search
                form-classes="home__select advisor__content-form  advisor__content-form_mobile"
                @search="search"
                @hideMenu="isActive = false"
              />
            </template>
            <template slot="range">
              <app-field-range v-model="years" :min="1" name="years" @input="setResults" />
            </template>
            <template slot="filter-down">
              <app-field-text
                v-model="monthly"
                name="monthly"
                label="Estimated starting salary after graduation:"
                :mask="{ 'alias': 'decimal', 'groupSeparator': '', 'autoGroup': true, rightAlign: false, showMaskOnHover: false }"
                @input="setResults"
              />
              <app-field-text
                v-model="amountCollage"
                name="monthly"
                label="Amount you can put towards college:"
                :mask="{ 'alias': 'decimal', 'groupSeparator': '', 'autoGroup': true, rightAlign: false, showMaskOnHover: false }"
                @input="setResults"
              />
              <no-ssr>
              <app-field-select
                v-model="quantity"
                class="select-arrow"
                name="quantity"
                input-classes="custom-select"
                label="Household annual income:"
                :options="quantityOptions"
                :reduse="item => item.code"
                @input="setResults"
                @change="form.incomeLevel = $event"
              />
              </no-ssr>
            </template>
            <template slot="filter-top">
              <div class="advisor__mobile-check">
                <app-field-select
                  v-model="admRate"
                  name="admRate"
                  class="select-arrow"
                  label="Admission Rate"
                  input-classes="custom-select"
                  :options="admissionRates"
                  :reduse="item => item.code"
                  @input="setResults"
                  @change="form.admRate = $event"
                />
                <app-field-check
                  v-model="form.includeCommunity"
                  name="includeCommunity"
                  label="Include Community Colleges"
                />
                <app-field-check
                  v-model="form.includeState"
                  name="includeState"
                  label="Include State Universities"
                />
                <app-field-check
                  v-model="form.includePrivate"
                  name="includePrivate"
                  label="Include Private Universities"
                />
              </div>
              <app-field-text
                v-model="form.name"
                name="name"
                label="School Name"
                type="text"
                @input="setResults"
              />
              <app-field-text
                v-model="form.satMScore"
                name="satMScore"
                label="Your Math SAT"
                type="number"
                :mask="{ 'alias': 'decimal', 'autoGroup': true, showMaskOnHover: false }"
                @input="setResults"
              />
              <app-field-text
                v-model="form.satRScore"
                name="satRScore"
                label="Your Reading SAT"
                type="number"
                :mask="{ 'alias': 'decimal', 'autoGroup': true, showMaskOnHover: false }"
                @input="setResults"
              />
              <app-field-text
                v-model="form.actMScore"
                name="actMScore"
                label="Your Math ACT"
                type="number"
                :mask="{ 'alias': 'decimal', 'autoGroup': true, showMaskOnHover: false }"
                @input="setResults"
              />
              <app-field-text
                v-model="form.actRScore"
                name="actRScore"
                label="Your English ACT"
                type="number"
                :mask="{ 'alias': 'decimal', 'autoGroup': true, showMaskOnHover: false }"
                @input="setResults"
              />
              
            </template>
          </app-mobile-advisor>
          <div class="item-result" v-if="results || null">
            <app-block-advisor-result v-for="(result, index) in results" :item="result" :key="index" @goto="goToResult" />
          </div>
          <button v-if="total - form.PageNumber * form.PageSize > form.PageSize" @click.prevent="loadMore" :disabled="loading" class="advisor__content-moore" :class="{ disabled: loading }" type="button">
            <span>Load more choices</span>
          </button>
          <div class="advisor__content-option">
            <button v-if="results && results.length !== 0"
              @keyup.enter.prevent
              @keydown.enter.prevent
              @keypress.enter.prevent
              @click.prevent="$router.push('/calculator')"
              class="default-submit advisor-select"
            >
              <span>Customize Schools and lifestyle options</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </app-loader>
</no-ssr>
</template>
<script>
import AppFormCollegeSearch from "~/components/forms/FormCollegeSearchComponent.vue";
import AppMobileAdvisor from "~/components/wrappers/MobileAdvisorComponent.vue";
import AppFieldText from "~/components/field/FieldTextComponent.vue";
import AppFieldSelect from "~/components/field/FieldSelectComponent.vue";
import AppFieldRange from "~/components/field/FieldRangeComponent.vue";
import AppFieldCheck from "~/components/field/FieldCheckComponent.vue";
import AppBlockAdvisorResult from "~/components/blocks/BlockAdvisorResultComponent.vue";
import AppBlockBanner from "~/components/blocks/BlockBannerComponent.vue";
import AppLoader from "~/components/wrappers/LoaderComponent.vue";
import AppBlockSearchTips from "~/components/blocks/BlockAdvisorSearchTipsComponent.vue";
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  scrollToTop: false,
  components: {
    AppFormCollegeSearch,
    AppFieldText,
    AppFieldSelect,
    AppFieldRange,
    AppFieldCheck,
    AppBlockAdvisorResult,
    AppBlockBanner,
    AppBlockSearchTips,
    AppLoader,
    AppMobileAdvisor
  },
  data() {
    return {
      loading: false,
      isActive: false,
      page: 1,
      form: {
        includeCommunity: true,
        includeState: true,
        includePrivate: true,
        admRate: 10,
        satRScore: 0,
        satMScore: 0,
        actRScore: 0,
        actMScore: 0,
        zip: '',
        state: '',
        salary: 0,
        major: '',
        name: '',
        incomeLevel: 3,
        PageNumber: 0,
        PageSize: 10
      },
      senglishACTat: 36,
      monthly: 70000,
      years: 5,
      amountCollage: 8000,
      quantityOptions: [
        {
          code: 1,
          label: "$0-$30,000"
        },
        {
          code: 2,
          label: "$30,001-$48,000"
        },
        {
          code: 3,
          label: "$48,001- $75,000"
        },
        {
          code: 4,
          label: "$75,001-$110,000"
        },
        {
          code: 5,
          label: "$110,000+"
        }
      ],
      admissionRates: [
        {
          code: 0,
          label: "Any"
        },
        {
          code: 10,
          label: "Above 10%"
        },
        {
          code: 20,
          label: "Above 20%"
        },
        {
          code: 30,
          label: "Above 30%"
        },
        {
          code: 40,
          label: "Above 40%"
        },
        {
          code: 50,
          label: "Above 50%"
        },
      ],
      slider: 1,
      quantity: {
        code: 3,
        label: "$48,001- $75,000"
      },
      admRate: {
        code: 10,
        label: "Above 10%"
      },
      // items: undefined,
      results: undefined,
      // total: 0
    };
  },
  computed: {
    ...mapGetters({
      defaultSearch: 'local/base/defaultSearch',
      constants: 'local/formulas/constants',
      items: 'server/schools/items',
      total: 'server/schools/total',
      scrollTop: 'server/schools/scrollTop',
    })
  },
  async mounted() {
    this.form.zip = this.defaultSearch.zip
    this.form.state = this.defaultSearch.state
    this.form.salary = this.defaultSearch.salary
    this.form.major = this.defaultSearch.major
    this.monthly = this.defaultSearch.salary
    if (this.form.state && this.form.major && this.form.salary) {
      if (window.screen.width <= 1200) {
        setTimeout(() => {
          window.scrollTo({ top: 330, behavior: 'smooth' });
        }, 1500);
      }
      if (this.items === undefined) {
        this.search()
      } else if (this.items !== undefined) {
        this.setResults()
      }
    }
  },
  methods: {
    goToResult(e) {
      let item = e.item
      let re = {
        status: item.status,
        schools: item.schools,
        totalCost: item.totalCost,
        afterCost: item.afterCost,
        totalPayed: item.totalPayed,
        contribution: item.contribution,
        monthly: item.monthly,
        income: item.income,
        expenses_summ: item.expenses_sumSummary,
        expenses: item.expensesAll,//pass all expenses instead of just those displayed in the results view
        balance: item.balance,
        salary: item.salary,
        incomeTax: item.incomeTax,
        yearsLoan: item.yearsLoan,
      }
      this.$router.push({ path: '/result', query: { params: JSON.stringify(re)} })
    },
    setResults () {
      this.renderResult(this)
    },
    renderResult: _.debounce(async (vm) => {
      vm.results = []
      if (vm.items || null) {
        Object.keys(vm.items).forEach(async (item, index) => {
          let years = vm.items[index].YearsInSchool1
          let Cost = vm.items[index].School1.Cost
          let costNameField = vm.items[index].School1.Control === 1 ? 'AvgInStateTuition' : 'AvgPrivateTuition'
          let costYears = vm.items[index].School1.Highdeg == 2 ?
            vm.items[index].School1.InStateTuition * years
             : vm.form.incomeLevel === 0 ? (
              vm.items[index].School1[costNameField] > 0 ?
                vm.items[index].School1[costNameField] * years : Cost * years)
              : (vm.items[index].School1[costNameField+vm.form.incomeLevel] > 0 ?
                  vm.items[index].School1[costNameField+vm.form.incomeLevel] * years :
                  Cost * years)

          let schools = [{
            name: vm.items[index].School1.Name,
            state: vm.items[index].School1.State,
            years: years,
            cost: costYears,
            admissionRate: vm.items[index].School1.AdmissionRate
          }]

          let DebtAmount = costYears
          let NumberOfYears = years

          if (vm.items[index].School2 || null) {
            costNameField = vm.items[index].School2.Control === 1 ? 'AvgInStateTuition' : 'AvgPrivateTuition'
            years = vm.items[index].YearsInSchool2
            costYears = vm.form.incomeLevel === 0 ? (vm.items[index].School2[costNameField] > 0 ? vm.items[index].School2[costNameField] * years : Cost * years) : (vm.items[index].School2[costNameField+vm.form.incomeLevel] > 0 ? vm.items[index].School2[costNameField+vm.form.incomeLevel] * years : Cost * years)

            schools.push({
              name: vm.items[index].School2.Name,
              state: vm.items[index].School2.State,
              years: years,
              cost: costYears,
              admissionRate: vm.items[index].School2.AdmissionRate
            })

            DebtAmount += costYears
            NumberOfYears += years
          }


          let afterCost = Math.max(DebtAmount - parseInt(vm.amountCollage || 0),0)
          //let totalPayed = DebtAmount - afterCost

          //let payload = {
          //  salary: parseInt(vm.form.salary),
          //  DebtAmount: DebtAmount - totalPayed,
          //  NumberOfYears: NumberOfYears
          //}

          let payloadMon = {
            DebtAmount: afterCost,
            NumberOfYears: vm.years
          }

          let payloadTotal = {
            DebtAmount: afterCost,
            NumberOfYears: vm.years
          }

          await vm.$store.dispatch('local/formulas/calcOtherTax', { salary: parseInt(vm.monthly) }).then(async income => {
            await vm.$store.dispatch('local/formulas/calcDebtPayment', payloadMon).then(async loan => {
              await vm.$store.dispatch('local/formulas/calcLoanRepayment', payloadTotal).then(async totalPayed => {
                await vm.$store.dispatch('local/formulas/calcMonthlyExpenses', {income: income / 12, loan: loan, state: vm.form.state }).then(async expenses => {
                  await vm.$store.dispatch('local/formulas/calcLifestyleIndex', {
                    IncomeAfterDeductions: income,
                    DebtPayment: loan,
                    state: vm.form.state
                  }).then(async status => {
                    vm.results.push({
                      status: status,
                      schools: schools,
                      totalCost: DebtAmount,
                      afterCost: afterCost,
                      totalPayed: totalPayed,
                      contribution: parseInt(vm.amountCollage || 0),
                      monthly: loan,
                      income: income / 12,
                      expenses_summ: expenses.sum,
                      expenses_sumSummary: expenses.sumSummary,
                      expenses: expenses.items,
                      expensesAll: expenses.itemsAll,
                      balance: income / 12 - loan - expenses.sum,
                      salary: vm.form.salary,
                      incomeTax: vm.form.salary - income,
                      yearsLoan: vm.years,
                    })
                  })
                })
              })
            })
          })
        })
      }
    }, 100),
    changeSearch(e) {
      this.form.zip = e.zip
      this.form.state = e.state
      this.form.salary = e.salary
      this.form.major = e.major
      this.monthly = e.salary
    },
    search () {
      this.form.PageNumber = 0
      this.send(this, false)
    },
    send: _.debounce(async (vm, loadMore) => {
    vm.loading = true
      try {
        if(!loadMore)
          vm.form.PageNumber = 0
        let res = await vm.$store.dispatch("server/schools/search", vm.form)
        if (!loadMore) {
          vm.$store.dispatch("server/schools/setSchools", res.data.Data)
          // vm.items = res.data.Data.Items
        } else {
          vm.$store.dispatch("server/schools/loadMoreSchools", res.data.Data)
          // vm.items.push(...res.data.Data.Items)
        }
        // vm.total = res.data.Data.TotalResults
        vm.setResults()
      } catch (e) {
        console.dir(e);
      } finally {
        vm.loading = false
      }
    }, 500),
    loadMore () {
      this.form.PageNumber++
    }
  },
  watch: {
    'form.PageNumber': {
      handler (bef) {
        this.send(this, true)
      },
      deep: true
    },
    'form.includeCommunity': {
      handler (bef) {
        if(this.form.state && this.form.major) {
          this.send(this, false)
        }
      },
      deep: true
    },
    'form.includeState': {
      handler (bef) {
        if(this.form.state && this.form.major) {
          this.send(this, false)
        }
      },
      deep: true
    },
    'form.includePrivate': {
      handler (bef) {
        if(this.form.state && this.form.major) {
          this.send(this, false)
        }
      },
      deep: true
    },
    'form.name': {
      handler (bef) {
        if(this.form.state && this.form.major) {
          this.send(this, false)
        }
      },
      deep: true
    },
    'form.satMScore': {
      handler (bef) {
        if(this.form.state && this.form.major) {
          this.send(this, false)
        }
      },
      deep: true
    },
    'form.satRScore': {
      handler (bef) {
        if(this.form.state && this.form.major) {
          this.send(this, false)
        }
      },
      deep: true
    },
    'form.actMScore': {
      handler (bef) {
        if(this.form.state && this.form.major) {
          this.send(this, false)
        }
      },
      deep: true
    },
    'form.actRScore': {
      handler (bef) {
        if(this.form.state && this.form.major) {
          this.send(this, false)
        }
      },
      deep: true
    },
    'quantity': {
      handler (bef) {
        if(this.form.state && this.form.major) {
          this.send(this, false)
        }
      },
      deep: true
    },
    'admRate': {
      handler (bef) {
        if(this.form.state && this.form.major) {
          this.send(this, false)
        }
      },
      deep: true
    },
    defaultSearch: {
      handler (bef) {
        this.changeSearch(bef)
      },
      deep: true
    }
  }
};
</script>
<style lang="scss">
.item-result {
  cursor: pointer;
}
.advisor__content-form {
  margin-left: 72px;
  .form-group {
    margin-right: 20px;
    margin-bottom: 0 !important;
  }
  .home-select1 {
    width: 234px;
  }
  .home-select2 {
    width: 121px;
  }
  .home-select3 {
    width: 268px;
    margin-right: 23px;
  }
  .default-submit {
    z-index: 1;
  }
  &.home__select {
    width: auto;
  }
}
</style>
