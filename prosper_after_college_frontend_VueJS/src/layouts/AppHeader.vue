<template>
  <header class="header">
    <div class="header__wrapper default-container">
    <div class="header__logo">
      <nuxt-link to="/" class="navbar-item">
        Prosper After College
      </nuxt-link>
      <button
        type="button"
        @click="isActive=!isActive"
        class="mobile-btn"
        :class="{ 'mobile-btn_active': isActive }"
      >
        <span></span>
      </button>
    </div>
    <div
      class="header__menu"
      :class="{ active: isActive }"
    >
      <nav>
        <ul>
          <li @click="isActive=!isActive">
            <nuxt-link active-class="is-active" to="/advisor" exact>College Advisor</nuxt-link>
          </li>
          <li @click="isActive=!isActive">
            <nuxt-link active-class="is-active" to="/calculator" class="navbar-item is-tab" exact>
              <img src="~/assets/img/calculator.png" alt="">
              Calculator
            </nuxt-link>
          </li>
          <li @click="isActive=!isActive">
            <nuxt-link active-class="is-active" to="/guide" class="navbar-item is-tab" exact>Decision Guide</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    }
  }
}
</script>


