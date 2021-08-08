<template>
  <nav class="navbar navbar-light backgroundGradientPurple">
    <div class="container-fluid justify-content-start">
      <div class="col-md-1">
        <button class="btn" @click="goBack">
          <img height="38" src="../shared/assets/returnIcon.svg" alt="" />
        </button>
      </div>
      <div class="col-md-2">
        <router-link :to="{ name: 'Search' }" class="navbar-brand">
          <img src="../shared/assets/logo.svg" alt="logo do site" class="logo" />
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarReturn",
  methods: {
    goBack() {
      this.$router.back()
    }
  }
};
</script>

<style scoped>
.logo {
  max-height: 60px;
}
</style>
