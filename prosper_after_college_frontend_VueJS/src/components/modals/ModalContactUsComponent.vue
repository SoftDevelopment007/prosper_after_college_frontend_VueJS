<template>
  <div>
    <b-modal
      class="modal fade"
      modal-class="transport transport_contact"
      v-model="modalShow"
      id="modal-contact"
      hide-header
      body-class="p-0"
      hide-footer
      centered
      @show="resetModal"
    >
      <app-loader
        v-model="loading"
      >
        <div class="modal-content transport-content">
          <ValidationObserver v-if="modalShowTextError === false && modalShowText === false" ref="form" v-slot="{ invalid }">
            <form @submit.prevent="onSubmit">
              <h2 class="modal-title">Contact Us</h2>
              <button  type="button" class="modal-close" @click="modalShow=false">
                <img src="~/assets/img/close.png" alt="">
              </button>
              <div class="modal-body">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <app-field-text
                    v-model="form.Name"
                    name="name"
                    label="Name"
                    :state="errors.length || false"
                    :maxlength="100"
                    :e="errors[0]"
                  />
                </ValidationProvider>
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <app-field-text
                    v-model="form.Email"
                    name="email"
                    label="Email"
                    :state="errors.length || false"
                    :maxlength="100"
                    :e="errors[0]"
                  />
                </ValidationProvider>
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <app-field-select
                    v-model="form.Reason"
                    :options="options"
                    class="select-arrow"
                    name="reason"
                    input-classes="custom-select"
                    label="Reason"
                    :state="errors.length || false"
                    :e="errors[0]"
                  />
                </ValidationProvider>
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <app-field-textarea
                    v-model="form.Message"
                    name="message"
                    label="Message"
                    :state="errors.length || false"
                    :maxlength="500"
                    :e="errors[0]"
                  />
                </ValidationProvider>
              </div>
              <div class="modal-footer">
                <button type="submit" class="default-submit" :disabled="invalid" :class="{ disabled: invalid }">
                  <span>Send</span>
                </button>
                <button type="button" class="cancel" @click="modalShow=false">
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </ValidationObserver>
          <div v-if="modalShowText === true" class="modal__success-text">
            <img src="~/assets/img/done.png" alt="">
            <p>Your message has been sent. Thank you for contacting us! We will try to respond as soon as possible.</p>
          </div>
          <div v-if="modalShowTextError === true" class="modal__success-text">
            <img src="~/assets/img/not-done.png" alt="">
            <p>Error</p>
          </div>
        </div>
      </app-loader>
    </b-modal>
  </div>
</template>
<script>
import AppFieldText from "~/components/field/FieldTextComponent.vue";
import AppFieldTextarea from "~/components/field/FieldTextareaComponent.vue";
import AppFieldSelect from "~/components/field/FieldSelectComponent.vue";
import AppLoader from "~/components/wrappers/LoaderComponent.vue";

export default {
  components: {
    AppFieldText,
    AppFieldTextarea,
    AppFieldSelect,
    AppLoader
  },
  data() {
    return {
      modalShow: false,
      modalShowText: false,
      modalShowTextError: false,
      form :{
        Name: '',
        Email: '',
        Message: '',
        Reason: ''
      },
      options: ['General Feedback', 'Advertising On Your Site', 'Data Correction'],
      loading: false
    }
  },
  async mounted() {
    await this.$recaptcha.init()
  },
  methods: {
    async onSubmit () {
      const isValid = await this.$refs.form.validate()
        if (isValid) {
          try {
            const token = await this.$recaptcha.execute('login')
            this.onCaptchaVerified(token)
          } catch (error) {
            this.onCaptchaExpired()
          }
        }
    },
    onCaptchaVerified (recaptchaToken) {
      this.loading = true
      try {
        let payload = this.form
        payload.recaptchaToken = recaptchaToken
        let response =  this.$store.dispatch("server/forms/sendContactUs", payload)
        this.modalShowText = true
      } catch (e) {
        this.modalShowTextError = true
      } finally {
        this.loading = false
      }
    },
    onCaptchaExpired () {
      this.modalShowTextError = true
    },
    resetModal() {
      this.modalShowText = false,
      this.modalShowTextError = false,
      this.form = {
        Name: '',
        Email: '',
        Message: '',
        Reason: ''
      }
    }
  }
}
</script>

