<template>
  <nav class="navbar navbar-light backgroundGradientPurple">
    <div class="container-fluid justify-content-start">
      <div class="col-md-1">
        <a href="#">
          <img height="38" src="../assets/returnIcon.svg" alt="" />
        </a>
      </div>
      <div class="col-md-2">
        <a class="navbar-brand" href="#">
          <img src="../assets/logo.svg" alt="logo do site" class="logo" />
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarReturn",
};
</script>

<style scoped>
.logo {
  max-height: 60px;
}
</style>
