<template>
  <div>
    <b-modal
      class="modal fade"
      modal-class="food"
      v-model="modalShow"
      id="modal-food"
      hide-header
      body-class="p-0"
      hide-footer
      centered
    >
      <app-loader
        v-model="loading"
      >
        <div class="modal-content food-content">
          <ValidationObserver ref="form" v-slot="{ invalid }">
            <form @submit.prevent="onSubmit">
            <h2 class="modal-title">Food Cost Estimator</h2>
            <button  type="button" class="modal-close" @click="modalShow=false">
              <img src="~/assets/img/close.png" alt="">
            </button>
            <div class="modal-body">
              <ValidationProvider rules="required" v-slot="{ errors }">
              <app-field-text
                v-model="form.breakfast"
                name="breakfast"
                label="Breakfast"
                :state="errors.length || false"
                :e="errors[0]"
                :mask="{ 'regex': '[0-9]*', 'autoGroup': true, showMaskOnHover: false }"
              />
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors }">
              <app-field-text
                v-model="form.lunch"
                name="lunch"
                label="Lunch"
                :state="errors.length || false"
                :e="errors[0]"
                :mask="{ 'regex': '[0-9]*', 'autoGroup': true, showMaskOnHover: false }"
              />
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors }">
              <app-field-text
                v-model="form.dinner"
                name="dinner"
                label="Dinner"
                :state="errors.length || false"
                :e="errors[0]"
                :mask="{ 'regex': '[0-9]*', 'autoGroup': true, showMaskOnHover: false }"
              />
              </ValidationProvider>
              <h5>Please specify your daily food expenses</h5>
              <div class="food-drink">
                <app-field-text
                  v-model="form.drink"
                  name="drink"
                  placeholder="Cost per drink"
                />
                <app-field-select
                  v-model="form.quantity"
                  :options="options"
                  class="select-arrow"
                  name="quantity"
                  input-classes="custom-select"
                  placeholder="N of drinks"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="default-submit" :disabled="invalid" :class="{ disabled: invalid }">
                <span>Ok</span>
              </button>
              <button type="button" class="cancel" @click="modalShow=false">
                <span>Cancel</span>
              </button>
            </div>
          </form>
          </ValidationObserver>
        </div>
      </app-loader>
    </b-modal>
  </div>
</template>
<script>
import AppFieldText from "~/components/field/FieldTextComponent.vue";
import AppFieldSelect from "~/components/field/FieldSelectComponent.vue";
import AppLoader from "~/components/wrappers/LoaderComponent.vue";

export default {
  components: {
    AppFieldText,
    AppFieldSelect,
    AppLoader
  },
  data() {
    return {
      modalShow: false,
      form :{
        breakfast: 8,
        lunch: 15,
        dinner: 15,
        drink: 0,
        quantity: 0
      },
      options: [1, 2, 3, 4, 5],
      loading: false
    }
  },
  methods: {
    async onSubmit () {
      const isValid = await this.$refs.form.validate()
      if (isValid) {
        let sum = (parseInt(this.form.breakfast)
          + parseInt(this.form.lunch)
          + parseInt(this.form.dinner)
          + parseInt(this.form.drink) * parseInt(this.form.drink))
          * 30
        this.$emit('change:food', sum)
        this.modalShow = false
        this.$refs.form.reset()
        /* this.form = {
          monthly: "",
          insurance: "",
          gas: ""
        } */
      }
    }
  },
  watch: {
    'form.drink': {
      handler (bef) {
        if (bef > 0) {
          this.form.quantity = 1
        } else {
          this.form.quantity = ''
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="scss">
  .food {
    .modal-dialog {
      height: auto;
    }
    .modal-body {
      margin-bottom: 0;
    }
  }
  @media screen and (max-width: 767px) {
    .transport {
      .modal-dialog {
        width: 90%;
        margin: 0.5rem auto;
        max-width: 90%;
      }
    }
    .food {
      .modal-dialog {
        width: 90%;
        margin: 0.5rem auto;
        max-width: 90%;
      }
      .food-content {
        height: auto;
      }
    }
  }
</style>

