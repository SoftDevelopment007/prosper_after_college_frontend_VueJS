<template>
  <div>
    <app-loader
      v-model="loading"
    >
      <div class="calculator__wrapper calculator__wrapper_mobile default-container">
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <form
            class="calculator__form"
            @submit.prevent="onSubmit"
          >
            <div role="tablist" class="accordion" id="accordion">
              <b-card no-body class="card">
                <b-card-header header-tag="header" role="tab">
                  <h2 class="mb-0">
                    <span>1</span>
                    <button class="btn btn-link" type="button" v-b-toggle.accordion-1>
                      College Cost And Future Lifestile Calculator
                    </button>
                  </h2>
                </b-card-header>
                <b-collapse
                  id="accordion-1"
                  class="collapse show"
                  visible
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <img class="circle-bg" src="~/assets/img/circle.png" alt="">
                  <img class="circle-bg-small" src="~/assets/img/elips.png" alt="">
                  <b-card-body class="card-body">
                    On this page you can customize the many parameters that go into estimating your post-graduation lifestile. 
              Select up to two universities, adjust your expected starting salary and select the kind of lifestyle you expect to have after graduation. 
              You can override each value with your own $$ amount.
                    <div class="calculator__form-top">
                    <app-field-select
                      v-model="form.state"
                      :reduce="item => item.code"
                      :options="states"
                      class="default-button select-arrow select-left"
                      name="state"
                      input-classes="custom-select"
                      placeholder="Select your state"
                      @input="onSearch('*', ['schoolsFirst', 'schoolsSecond'], $event)"
                    />
                    <app-field-select
                      v-model="form.major"
                      :reduce="item => item.code"
                      :options="majors"
                      class="default-button select-right"
                      name="major"
                      input-classes="custom-select"
                      placeholder="Select your major"
                    />
                    </div>
                  </b-card-body>
                </b-collapse>
              </b-card>
              <b-card no-body class="card">
                <b-card-header header-tag="header" role="tab">
                  <h2 class="mb-0">
                    <span>2</span>
                    <button
                      class="btn btn-link"
                      type="button"
                      v-b-toggle.accordion-2
                    >
                      Family Income Level:
                    </button>
                  </h2>
                </b-card-header>
                <b-collapse 
                  id="accordion-2"
                  class="collapse show"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <img class="circle-bg" src="~/assets/img/circle.png" alt="">
                  <img class="circle-bg-small" src="~/assets/img/elips.png" alt="">
                  <b-card-body class="card-body card-body-2">
                    <div class="calculator__form-personality">
                      <app-field-select
                        v-model="quantity"
                        :options="quantityOptions"
                        class="default-button select-arrow select-left"
                        name="level"
                        input-classes="custom-select"
                        :reduse="item => item.code"
                        @change="form.level = $event"
                      />
                      <h3 class="default-name">Salary after bachelor’s degree:</h3>
                      <div class="form-group">
                        <app-field-text
                          v-model="form.salary"
                          name="salary"
                          :mask="{ 'regex': '[0-9]*', 'autoGroup': true, showMaskOnHover: false }"
                        />
                        <label v-if="form.salary">estimated - ${{ form.salary }}</label>
                      </div>
                      <h3 class="default-name mt">Amount contributed by you or on
                        your behalf towards your undergraduate education:
                      </h3>
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <app-field-text
                        v-model="form.amount"
                        name="amount"
                        :mask="{ 'regex': '[0-9]*', 'autoGroup': true, showMaskOnHover: false }"
                        :state="errors.length || false"
                        :e="errors[0]"
                      />
                    </ValidationProvider>
                    </div>
                  </b-card-body>
                </b-collapse>
              </b-card>
              <b-card no-body class="card">
                <b-card-header header-tag="header" role="tab">
                  <h2 class="mb-0">
                    <span>3</span>
                    <button class="btn btn-link" type="button" v-b-toggle.accordion-3>
                      Universities:
                    </button>
                  </h2>
                </b-card-header>
                <b-collapse id="accordion-3"
                  class="collapse show"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <img class="circle-bg" src="~/assets/img/circle.png" alt="">
                  <img class="circle-bg-small" src="~/assets/img/elips.png" alt="">
                  <b-card-body class="card-body">
                    <div class="calculator__form-personality">
                      <div class="your-school">
                        <app-loader
                          v-model="loadingState"
                        >
                          <app-field-select
                            v-model="form.school"
                            :options="schoolsFirst"
                            labelName="Name"
                            :reduseKey="false"
                            @change="changeFirstSchool"
                            class="default-button"
                            name="state"
                            input-classes="custom-select"
                            label="First school"
                            placeholder="Search for your university"
                            :disabled="!form.state"
                          />
                        </app-loader>
                        <div class="total-form">
                          <app-field-select
                            v-model="schoolsFirstYears"
                            :options="schoolsYearsOptions"
                            class="default-button"
                            label="Number Of Years"
                            input-classes="custom-select"
                            :disabled="!form.state"
                            :reduse="item => item.code"
                            @change="changeFirstYears"
                            @input="inputFirstYears"
                          />
                        </div>
                        <ValidationProvider rules="required" v-slot="{ errors }">
                          <app-field-text
                            label="Total cost"
                            v-model="form.school_cost"
                            name="zip"
                            :mask="{ 'regex': '[0-9]*', 'autoGroup': true, showMaskOnHover: false }"
                            :state="errors.length || false"
                            :e="errors[0]"
                            @input="notInputSchoolFirstCost = true"
                          />
                        </ValidationProvider>
                        <p class="mt">In state tuition: ${{ form.school.InStateTuition || 'N/A' }}</p>
                        <p>Total cost: ${{ form.school.Cost || 'N/A' }}</p>
                        <p>Average payed for your
                            income bracket: ${{ form.school.Control > 1 ? form.school[`AvgPrivateTuition${form.level}`] : form.school[`AvgInStateTuition${form.level}`] || 'N/A' }}
                        </p>
                      </div>
                      <div class="your-school">
                      <app-loader
                        v-model="loadingState"
                      >
                        <app-field-select
                          v-model="form.school1"
                          :options="schoolsSecond"
                          labelName="Name"
                          :reduseKey="false"
                          @change="changeSecondSchool"
                          class="default-button"
                          name="state"
                          input-classes="custom-select"
                          label="Second school"
                          placeholder="Optional transfer university"
                          :disabled="!form.state"
                        />
                      </app-loader>
                      <app-field-select
                        v-model="schoolsSecondYears"
                        :options="schoolsYearsOptions"
                        class="default-button"
                        label="Number Of Years"
                        input-classes="custom-select"
                        :disabled="!form.state"
                        :reduse="item => item.code"
                        @change="changeSecondYears"
                        @input="inputSecondYears"
                      />
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <app-field-text
                          label="Total cost"
                          v-model="form.school1_cost"
                          name="zip"
                          :mask="{ 'regex': '[0-9]*', 'autoGroup': true, showMaskOnHover: false }"
                          :state="errors.length || false"
                          :e="errors[0]"
                          @change="changeSecondYears"
                          @input="inputSecondYears"
                        />
                      </ValidationProvider>
                        <p class="mt">In state tuition: ${{ form.school1.InStateTuition || 'N/A' }}</p>
                        <p>Total cost: ${{ form.school1.Cost || 'N/A' }}</p>
                        <p>Average Tuition Payed: ${{ form.school1.Control > 1 ? form.school1[`AvgPrivateTuition${form.level}`] : form.school1[`AvgInStateTuition${form.level}`] || 'N/A' }}</p>
                      </div>
                    </div>
                  </b-card-body>
                </b-collapse>
              </b-card>
              <b-card no-body class="card">
                <b-card-header header-tag="header" role="tab">
                  <h2 class="mb-0">
                    <span>4</span>
                    <button class="btn btn-link" type="button" v-b-toggle.accordion-4 >
                      Lets look at your life after graduation
                    </button>
                  </h2>
                </b-card-header>
                <b-collapse
                  id="accordion-4"
                  class="collapse show"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <img class="circle-bg" src="~/assets/img/circle.png" alt="">
                  <img class="circle-bg-small" src="~/assets/img/elips.png" alt="">
                  <b-card-body class="card-body">
                    <div class="calculator__form-personality">
                      <div class="form-group range">
                        <h3 class="default-name">Years in student loan debt after graduation</h3>
                        <app-field-range
                          v-model="form.years"
                          :min="1"
                          name="years"
                        />
                      </div>
                      <div class="items-select">
                        <h3 class="default-name">Where do you want to live?</h3>
                        <app-field-select
                          v-model="form.life"
                          class="select-arrow"
                          name="life"
                          input-classes="custom-select"
                          placeholder="Select"
                          :searchable="false"
                          :options="stateAveragesWhereDoYouWantToLive(form.state)"
                          @change="form.life_cost = $event"
                        />
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <app-field-text
                          v-model="form.life_cost"
                          name="life_cost"
                          label="Enter your own cost"
                          :mask="{ 'regex': '[0-9]*', 'autoGroup': true, showMaskOnHover: false }"
                          :state="errors.length || false"
                          :e="errors[0]"
                        />
                      </ValidationProvider>
                      </div>
                      <div class="items-select">
                        <h3 class="default-name">How much will you be paying for Utilities?</h3>
                        <app-field-select
                          v-model="form.utilities"
                          class="select-arrow"
                          name="utilities"
                          input-classes="custom-select"
                          placeholder="Select"
                          :searchable="false"
                          :options="stateAveragesHowMuchWillYouBePayingForUtilities(form.state)"
                          @change="form.utilities_cost = $event"
                        />
                        <div class="form-modal">
                          <ValidationProvider rules="required" v-slot="{ errors }">
                            <app-field-text
                              v-model="form.utilities_cost"
                              name="utilities_cost"
                              label="Enter your own cost"
                              :mask="{ 'regex': '[0-9]*', 'autoGroup': true, showMaskOnHover: false }"
                              :state="errors.length || false"
                              :e="errors[0]"
                            />
                          </ValidationProvider>
                          <button
                            type="button"
                            class="default-submit show-modal"
                            v-b-modal.modal-utilities
                          >
                            <img src="~/assets/img/calculator.png" alt="">
                          </button>
                        </div>
                      </div>
                      <div class="items-select">
                        <h3 class="default-name">Transportation</h3>
                        <app-field-select
                          v-model="form.transportation"
                          class="select-arrow"
                          name="transportation"
                          input-classes="custom-select"
                          placeholder="Select"
                          :searchable="false"
                          :options="constants.Transportation"
                          @change="form.transportation_cost = $event"
                        />
                        <div class="form-modal">
                          <ValidationProvider rules="required" v-slot="{ errors }">
                            <app-field-text
                              v-model="form.transportation_cost"
                              name="transportation_cost"
                              label="Enter your own cost"
                              :mask="{ 'regex': '[0-9]*', 'autoGroup': true, showMaskOnHover: false }"
                              :state="errors.length || false"
                              :e="errors[0]"
                            />
                          </ValidationProvider>
                          <button
                            type="button"
                            class="default-submit show-modal"
                            v-b-modal.modal-transportation
                          >
                            <img src="~/assets/img/calculator.png" alt="">
                          </button>
                        </div>
                      </div>
                      <div class="items-select">
                        <h3 class="default-name">How much do you want to spend on food</h3>
                        <app-field-select
                          v-model="form.food"
                          class="select-arrow"
                          name="food"
                          input-classes="custom-select"
                          placeholder="Select"
                          :searchable="false"
                          :options="stateAveragesHowMuchDoYouWantToSpendOnFood(form.state)"
                          @change="form.food_cost = $event"
                        />
                        <div class="form-modal">
                          <ValidationProvider rules="required" v-slot="{ errors }">
                            <app-field-text
                              v-model="form.food_cost"
                              name="food_cost"
                              label="Enter your own cost"
                              :mask="{ 'regex': '[0-9]*', 'autoGroup': true, showMaskOnHover: false }"
                              :state="errors.length || false"
                              :e="errors[0]"
                            />
                          </ValidationProvider>
                          <button
                            type="button"
                            class="default-submit show-modal"
                            v-b-modal.modal-food
                          >
                            <img src="~/assets/img/calculator.png" alt="">
                          </button>
                        </div>
                      </div>
                      <div class="items-select">
                        <h3 class="default-name">How much do you want to travel?</h3>
                        <app-field-select
                          v-model="form.travel"
                          class="select-arrow"
                          name="travel"
                          input-classes="custom-select"
                          placeholder="Select"
                          :searchable="false"
                          :options="constants.HowMuchDoYouWantToTravel"
                          @change="form.travel_cost = $event"
                        />
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <app-field-text
                          v-model="form.travel_cost"
                          name="travel_cost"
                          label="Enter your own cost"
                          :state="errors.length || false"
                          :e="errors[0]"
                          :mask="{ 'regex': '[0-9]*', 'autoGroup': true, showMaskOnHover: false }"
                        />
                      </ValidationProvider>
                      </div>
                      <div class="items-select">
                        <h3 class="default-name">Do you want to go out?</h3>
                        <app-field-select
                          v-model="form.out"
                          class="select-arrow"
                          name="out"
                          input-classes="custom-select"
                          placeholder="Select"
                          :searchable="false"
                          :options="constants.DoYouWantToGoOut"
                          @change="form.out_cost = $event"
                        />
                        <ValidationProvider rules="required" v-slot="{ errors }">
                          <app-field-text
                            v-model="form.out_cost"
                            name="out_cost"
                            label="Enter your own cost"
                            :state="errors.length || false"
                            :e="errors[0]"
                            :mask="{ 'regex': '[0-9]*', 'autoGroup': true, showMaskOnHover: false }"
                          />
                        </ValidationProvider>
                      </div>
                      <div class="items-select">
                        <h3 class="default-name">You should start saving for retirement</h3>
                        <app-field-select
                          v-model="form.retirement"
                          class="select-arrow"
                          name="retirement"
                          input-classes="custom-select"
                          placeholder="Select"
                          :searchable="false"
                          :options="constants.YouShouldStartSavingForRetirement"
                          @change="form.retirement_cost = (form.salary / 12 * $event)"
                        />
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <app-field-text
                          v-b-tooltip.hover title="Enter your percentage"
                          v-model="form.retirement_cost"
                          name="retirement_cost"
                          label="Enter your own cost"
                          :state="errors.length || false"
                          :e="errors[0]"
                          :mask="{ 'regex': '[0-9.]*', 'autoGroup': true, showMaskOnHover: false }"
                        />
                      </ValidationProvider>
                      </div>
                    </div>
                  </b-card-body>
                </b-collapse>
              </b-card>
              <b-card no-body class="card">
                <b-card-header header-tag="header" role="tab">
                  <h2 class="mb-0">
                    <span>5</span>
                    <button class="btn btn-link" type="button" dv-b-toggle.accordion-5>
                      Lets look at your life after graduation
                    </button>
                  </h2>
                </b-card-header>
              </b-card>
            </div>
            <button v-if="accordionId == 4" class="default-submit mod-sumbit" type="submit" :disabled="invalid" :class="{ disabled: invalid }">
              <span>Show Results</span>
            </button>
             <button class="default-submit mod-sumbit" type="button" v-else @click="changeCollapse">
              <span>Go To Next Section</span>
            </button>
          </form>
        </ValidationObserver>
      </div>
    </app-loader>
  </div>
</template>
<script>
import AppFieldText from "~/components/field/FieldTextComponent.vue";
import AppFieldSelect from "~/components/field/FieldSelectComponent.vue";
import AppModalFood from "~/components/modals/ModalFoodComponent.vue";
import AppModalTransportation from "~/components/modals/ModalTransportationComponent.vue";
import AppModalUtilities from "~/components/modals/ModalUtilitiesComponent.vue";
import AppFieldRange from "~/components/field/FieldRangeComponent.vue";
import AppLoader from "~/components/wrappers/LoaderComponent.vue";
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  components: {
    AppFieldText,
    AppFieldSelect,
    AppFieldRange,
    AppLoader
  },
  props: {
    value: {
      type: Object,
      default () {
        return null
      }
    },
    formModalUtilities: {
      type: [Number, String],
      default: null
    },
    formModalTransportation: {
      type: [Number, String],
      default: null
    },
    formModalFood: {
      type: [Number, String],
      default: null
    },
  },
  data() {
    return {
      loading: false,
      loadingState: false,
      tabIndex: 1,
      accordionId: null,
      form: this.value || {
        state: "",
        major: "",
        level: 1,
        salary: "",
        school: "",
        school_cost: 0,
        school_years: 0,
        school1: "",
        school1_cost: 0,
        school1_years: 0,
        amount: 0,
        life: "",
        life_cost: 0,
        utilities: "",
        utilities_cost: this.formModalUtilities || 0,
        transportation: "",
        transportation_cost: this.formModalTransportation || 0,
        food: "",
        food_cost: this.formModalFood || 0,
        travel: "",
        travel_cost: 0,
        out: "",
        out_cost: 0,
        retirement: "",
        retirement_cost: 0,
        years: 5,
        tabIndex: 1
      },
      slider: 0,
      quantity: {
        code: 1,
        label: "$0-$30,000"
      },
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
      schoolsFirst: [],
      schoolsSecond: [],
      schoolsFirstYears: {
        code: 1,
        label: "1"
      },
      schoolsSecondYears: {
        code: 1,
        label: "1"
      },
      schoolsYearsOptions: [
        {
          code: 1,
          label: "1"
        },
        {
          code: 2,
          label: "2"
        },
        {
          code: 3,
          label: "3"
        },
        {
          code: 4,
          label: "4"
        }
      ],
      selectedSchoolFirst: null,
      selectedSchoolSecond: null,
      notInputSchoolFirstCost: false,
      notInputSchoolSecondCost: false,
      selectedFirstYears: null,
      selectedSecondYears: null
    }
  },
  computed: {
    ...mapGetters({
      states: 'server/states/items',
      majors: 'server/majors/items',
      constants: 'local/formulas/constants',
      stateAveragesWhereDoYouWantToLive: 'local/formulas/stateAveragesWhereDoYouWantToLive',
      stateAveragesHowMuchWillYouBePayingForUtilities: 'local/formulas/stateAveragesHowMuchWillYouBePayingForUtilities',
      stateAveragesHowMuchDoYouWantToSpendOnFood: 'local/formulas/stateAveragesHowMuchDoYouWantToSpendOnFood',
      defaultSearch: 'local/base/defaultSearch'
    })
  },
  methods: {
    changeCollapse() {
      setTimeout(() => {
        this.$root.$emit('bv::toggle::collapse', 'accordion-' + ++this.accordionId)
      }, 10);
    },
    onSearch(q, optionsName, changeState) {
      this.search({
        search: q,
        state: changeState
      }, this, optionsName);
    },
    search: _.debounce(async (payload, vm, optionsName) => {
      if (!payload.search || !payload.state) return
      try {
        let response = await vm.$store.dispatch('server/schools/autocomplete', payload);
        if (typeof optionsName === 'object' ) {
          optionsName.forEach(element => {
            vm[element] = response.data.Data;
          });
        } else {
          vm[optionsName] = response.data.Data;
        }
      } catch (e) {
        console.log(e)
      }
    }, 100),
    async onSubmit () {
      const isValid = await this.$refs.form.validate()
      if (isValid) {
        this.modalShow = false
        this.$refs.form.reset()
        this.$emit('input', this.form)
        this.$emit('goto')
      }
    },
    getSalary: _.debounce(async (vm) => {
      try {
        let res = await vm.$store.dispatch('server/salaries/getSalaries', {
          state: vm.form.state,
          major: vm.form.major,
        });
        vm.form.salary = res.data.Data.length || null ? res.data.Data[0].Salary : ''
      } catch (e) {
        console.log(e)
      }
    }, 100),
    changeFirstSchool(e) {
      this.selectedSchoolFirst = e
      if (this.selectedSchoolSecond === null) {
        this.schoolsFirstYears = this.schoolsYearsOptions[3]
      }
      this.calcSchoolCost('First', 'school_cost', 'school_years')
    },
    changeSecondSchool(e) {
      this.selectedSchoolSecond = e
      if (this.selectedSchoolFirst === null) {
        this.schoolsFirstYears = this.schoolsYearsOptions[1]
        this.schoolsSecondYears = this.schoolsYearsOptions[1]
      }
      this.calcSchool1Cost('Second', 'school1_cost', 'school1_years')
    },
    asyncCalcSchoolCost: _.debounce((num, costName, yearsName, vm) => {
      vm.calcCost(num, costName, yearsName)
    }, 100),
    asyncCalcSchool1Cost: _.debounce((num, costName, yearsName, vm) => {
      vm.calcCost(num, costName, yearsName)
    }, 100),
    calcSchoolCost (num, costName, yearsName) {
      this.asyncCalcSchoolCost(num, costName, yearsName, this)
    },
    calcSchool1Cost (num, costName, yearsName) {
      this.asyncCalcSchool1Cost(num, costName, yearsName, this)
    },
    changeFirstYears (e) {
      this.schoolsSecondYears = {
        code: 4 - e,
        label: 4 - e
      }
      this.calcSchoolCost('First', 'school_cost', 'school_years')
    },
    inputFirstYears () {
      this.calcSchool1Cost('Second', 'school1_cost', 'school1_years')
    },
    changeSecondYears (e) {
      this.schoolsFirstYears = {
        code: 4 - e,
        label: 4 - e
      }
      this.calcSchool1Cost('Second', 'school1_cost', 'school1_years')
    },
    inputSecondYears () {
      this.calcSchoolCost('First', 'school_cost', 'school_years')
    },
    calcCost(num, costName, yearsName) {
      if (this[`selectedSchool${num}`] || null && !this[`notInputSchool${num}Cost`]) {
        let cost = this[`selectedSchool${num}`].Control > 1 
          ? (this[`selectedSchool${num}`]['AvgPrivateTuition' + this.form.level] !== -1 
            ? this[`selectedSchool${num}`]['AvgPrivateTuition' + this.form.level]
            : this[`selectedSchool${num}`]['Cost'])
          : (this[`selectedSchool${num}`]['AvgInStateTuition' + this.form.level]
            ? this[`selectedSchool${num}`]['AvgInStateTuition' + this.form.level]
            : this[`selectedSchool${num}`]['Cost'])
        this.form[costName] = this[`schools${num}Years`]['code'] * cost
        this.form[yearsName] = this[`schools${num}Years`]['code']
      }
    }
  },
  mounted () {
    this.form.state = this.defaultSearch.state
    this.form.major = this.defaultSearch.major
    this.form.salary = this.defaultSearch.salary
    if(this.defaultSearch.state) {
      this.onSearch('*', ['schoolsFirst', 'schoolsSecond'], this.form.state)
    }
    this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      if (isJustShown) {
        let id = collapseId.split('-')
        this.accordionId = +id[1]
      }
    })
  },
  watch: {
    'form.level': {
      handler (bef) {
        this.calcSchoolCost('First', 'school_cost', 'school_years')
        this.calcSchool1Cost('Second', 'school1_cost', 'school1_years')
      },
      deep: true
    },
    value: {
      handler (bef) {
        this.form = bef
      },
      deep: true
    },
    formModalUtilities: {
      handler (bef) {
        this.form.utilities_cost = bef
      },
      deep: true
    },
    formModalTransportation: {
      handler (bef) {
        this.form.transportation_cost = bef
      },
      deep: true
    },
    formModalFood: {
      handler (bef) {
        this.form.food_cost = bef
      },
      deep: true
    },
    'form.state': {
      handler (bef) {
        if (bef && this.form.major) {
          this.getSalary(this)
        }
      },
      deep: true
    },
    'form.major': {
      handler (bef) {
        if (bef && this.form.state) {
          this.getSalary(this)
        }
      },
      deep: true
    },
    'form.retirement_cost': {
      handler (bef) {
        this.form.retirement_cost = Math.round(bef)
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
  .calculator__form {
    .vue-slider-rail  {
        background-color: white;
      }
    }
  @media screen and (max-width: 767px) {

    .circle-bg {
      pointer-events: none;
    }
    .circle-bg-small {
      pointer-events: none;
    }
    .calculator__wrapper_mobile {
      .form-group {
        height: auto;
        label {
          text-align: left;
        }
      }
    }
    .vs__dropdown-menu {
      z-index: 100000000;
    }
  }
</style>
