<template>
  <div style="overflow: hidden">
    <div class="home">
      <img class="home-bg" src="~/assets/img/home.png" alt="">
      <section class="home__wrapper default-container">
        <img class="home-modile" src="~/assets/img/home-mobile.png" alt="">
        <h1 class="default-title home-title">Start your college search here!</h1>
        <app-form-college-search
          form-classes="home__select"
        />
        <p class="home__text">
          When considering your future education, you must be aware how your choice of schools and
          major will affect your future lifestyle. I hope that you will be able to enter your adult life without
          the burden of excessive debt. I wish you the best of luck in reaching your dreams<br>
          and changing the world into a better place for all.
        </p>
      </section>
    </div>
  </div>
</template>

<script>
import AppFormCollegeSearch from "~/components/forms/FormCollegeSearchComponent.vue";

export default {
  components: {
    AppFormCollegeSearch
  }
};
</script>
