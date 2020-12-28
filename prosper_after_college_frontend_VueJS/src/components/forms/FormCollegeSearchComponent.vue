<template>
  <div>
    <form
      :class="formClasses"
    >
      <app-field-select
        v-model="form.state"
        :reduce="item => item.code"
        :options="states"
        class="select-arrow home-select1"
        name="state"
        input-classes="custom-select custom-select1"
        placeholder="Select your state"
        @input="change"
      />
      <app-field-text
        v-model="form.zip"
        class="home-select2"
        name="zip"
        placeholder="Zip Code"
        @input="change"
      />
      <app-field-select
        v-model="form.major"
        :reduce="item => item.code"
        :options="majors"
        class="select-arrow home-select3"
        name="major"
        input-classes="custom-select custom-select1"
        placeholder="Select your major"
        @input="change"
        :mapKeydownOn="true"
      />
      <button
        class="home__search default-submit"
        type="button"
        :class="{ disabled: loading }"
        @click="hideFilter, onSubmit()"
      >
        <img src="~/assets/img/search.png" alt="">
        <span>Search</span>
      </button>
    </form>
  </div>
</template>

<script>
import AppFieldText from "~/components/field/FieldTextComponent.vue";
import AppFieldSelect from "~/components/field/FieldSelectComponent.vue";
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  components: {
    AppFieldText,
    AppFieldSelect,
  },
  props: {
    formClasses: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      loading: false,
      form: {
        state: "",
        zip: "",
        major: "",
        salary: 0,
      }
    }
  },
  computed: {
    ...mapGetters({
      states: 'server/states/items',
      majors: 'server/majors/items',
      defaultSearch: 'local/base/defaultSearch'
    })
  },
  mounted () {
    if (this.defaultSearch || null) {
      this.form = Object.assign({}, JSON.parse(JSON.stringify(this.defaultSearch)))
    }
  },
  methods: {
    hideFilter() {
      this.$emit('hideMenu');
    },
    async change () {
      if (this.form.state !== '' && this.form.major !== '') {
        await this.send({
          state: this.form.state,
          major: this.form.major,
        }, this)
      }
      this.$emit('input', this.form)
    },
    onSubmit() {
      this.$store.dispatch('local/base/setDefaultSearch', {
        zip: this.form.zip,
        state: this.form.state,
        major: this.form.major,
        salary: this.form.salary
      })
      this.$emit('search')
      if (this.$route.name === 'index') {
        this.$router.push('/advisor')
      }
    },
    send: _.debounce(async (payload, vm) => {
      vm.loading = true
      try {
        let res = await vm.$store.dispatch("server/salaries/getSalaries", payload)
        vm.form.salary = res.data.Data[0] || null ? res.data.Data[0].Salary : 0
      } catch (e) {
        console.dir(e);
      } finally {
        vm.loading = false
      }
    }, 100)
  }
};
</script>

<style lang="scss" scoped>
  .default-submit {
    &:focus {
      background-image: linear-gradient(90deg,#9c271f 0,#b33d35);
    }
    &.disabled {
      pointer-events: none;
    }
  }
</style>
