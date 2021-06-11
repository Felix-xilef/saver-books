<template>
  <!-- <Login/> -->
  <Search/>
</template>

<script>
  // import Login from './components/Login.vue'
  import Search from './components/Search.vue'

  export default {
    name: 'App',
    components: {
      // Login,
      Search,
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

  #app {
    font-family: 'Roboto', sans-serif;
    /* -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px; */
  }

  html, body {
    padding: 0;
    margin: 0;
  }

  .backgroundGradientPurple {
    background: linear-gradient(90deg, rgba(40, 75, 255, 0.75) 0%, rgba(153, 73, 255, 0.75) 100%);
  }

  .backgroundGradientBlue {
    background: linear-gradient(90deg, #0063D8 0%, #5EA8FF 100%);
  }

  .backgroundGradientRed {
    background: linear-gradient(90deg, rgba(105, 211, 22, 0.927083) 0.01%, #5EC20F 0.02%, #FF0000 0.03%, #FF574D 100%);
  }

  .backgroundGradientGreen {
    background: linear-gradient(90deg, #10C200 0%, #6AE667 100%);
  }

  .backgroundLightPurple {
    background: rgba(80, 38, 200, 0.05);
  }

  .borderPurple {
    border: 3px solid rgba(80, 38, 200, 0.5);
  }
</style>
