<template>
  <footer class="footer">
    <img class="footer-bg" src="~/assets/img/footer.png" alt="">
    <div class="footer__wrapper default-container">
      <nav>
        <ul class="footer__menu">
          <li>
            <nuxt-link active-class="is-active" to="/states" exact>States</nuxt-link>
          </li>
          <li>
            <a v-b-modal.modal-contact active-class="is-active">Contact Us</a>
          </li>
          <li>
            <nuxt-link active-class="is-active" to="/terms" exact>Terms Of Use</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
    <no-ssr>
      <app-modal-contact-us />
    </no-ssr>
  </footer>

</template>
<script>
import AppModalContactUs from "~/components/modals/ModalContactUsComponent.vue";

export default {
  components: {
    AppModalContactUs,
  },
};
</script>

