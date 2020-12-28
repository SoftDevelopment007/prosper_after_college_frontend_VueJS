<template>
  <div>
    <b-modal
      class="modal fade"
      modal-class="transport"
      v-model="modalShow"
      id="modal-transportation"
      hide-header
      body-class="p-0"
      hide-footer
      centered
    >
      <app-loader
        v-model="loading"
      >
        <div class="modal-content transport-content">
          <ValidationObserver ref="form" v-slot="{ invalid }">
            <form @submit.prevent="onSubmit">
              <h2 class="modal-title">Car Payment Cost Estimator</h2>
              <button type="button" class="modal-close" @click="modalShow=false">
                <img src="~/assets/img/close.png" alt="">
              </button>
              <div class="modal-body">
                <ValidationProvider rules="required" v-slot="{ errors }">
                <app-field-text
                  v-model="form.monthly"
                  name="monthly"
                  label="Monthly lease/loan payment"
                  :state="errors.length || false"
                  :e="errors[0]"
                  :mask="{ 'regex': '[0-9]*', 'autoGroup': true, showMaskOnHover: false }"
                />
                </ValidationProvider>
                <ValidationProvider rules="required" v-slot="{ errors }">
                <app-field-text
                  v-model="form.insurance"
                  name="insurance"
                  label="Insurance monthly payment"
                  :state="errors.length || false"
                  :e="errors[0]"
                  :mask="{ 'regex': '[0-9]*', 'autoGroup': true, showMaskOnHover: false }"
                />
                </ValidationProvider>
                <ValidationProvider rules="required" v-slot="{ errors }">
                <app-field-text
                  v-model="form.gas"
                  name="gas"
                  label="Gas montly cost"
                  :state="errors.length || false"
                  :e="errors[0]"
                  :mask="{ 'regex': '[0-9]*', 'autoGroup': true, showMaskOnHover: false }"
                />
                </ValidationProvider>
              </div>
              <div class="modal-footer">
                <button type="submit" class="default-submit" :disabled="invalid" :class="{ disabled: invalid }">
                  <span>Ok</span></button>
                <button type="button" class="cancel" @click="modalShow = false">
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
      loading: false,
      form :{
        monthly: "",
        insurance: "",
        gas: ""
      }
    }
  },
  methods: {
    async onSubmit () {
      const isValid = await this.$refs.form.validate()
      if (isValid) {
        let sum = parseInt(this.form.monthly) + parseInt(this.form.insurance) + parseInt(this.form.gas)
        this.$emit('change:car', sum)
        this.modalShow = false
        this.$refs.form.reset()
        /* this.form = {
          monthly: "",
          insurance: "",
          gas: ""
        } */
      }
    }
  }
}
</script>
