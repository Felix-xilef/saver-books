<template>
	<!-- Navbar (menu) code -->
  <nav class="navbar navbar-light backgroundGradientLightGreen">
    <div class="container-fluid justify-content-around">
      <div class="col-md-2">
        <router-link :to="{ name: 'Search' }" class="navbar-brand">
          <img src="../shared/assets/logo.svg" alt="logo do site" class="logo" />
        </router-link>
      </div>

      <form class="col-md-9" @submit.prevent="submit">
        <div class="input-group me-2 bg-white searchInputGroup">
          <input
            class="form-control searchInput"
            type="text"
            v-model="searchParam"
            placeholder="pesquise pelo título do livro"
          />

          <button
            type="submit"
            class="input-group-text bg-transparent searchButton"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  </nav>
	<!-- End of navbar (menu) code -->

  <router-view></router-view>
</template>

<script>
import vuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
export default {
  setup() { return { v$: vuelidate() } },
  name: 'Home',
  data() {
    return {
      searchParam: "",
    }
  },
  validations() {
    return {
      searchParam: { required },
    }
  },
  methods: {
    submit() {
      if (!this.v$.searchParam.$invalid) this.searchByParameter(this.searchParam);
    },
    searchByParameter(searchParameter) {
      this.$router.push({ name: 'Search', params: { searchParameter } });
    },
  },
}
</script>

<style scoped>
.logo {
  max-height: 60px;
  border-radius: 50px;
}

.searchInputGroup {
  border-radius: 20px;
}

.searchInputGroup {
  transition: box-shadow var(--transition-duration) ease-in-out;
}

.searchInputGroup:hover {
  box-shadow: 0 0 0 .18rem rgba(41, 41, 41, 0.15);
}

.searchInputGroup:focus-within {
  box-shadow: 0 0 0 .25rem rgba(41, 41, 41, 0.25);
}

.searchInputGroup input:focus {
  box-shadow: none;
}

.searchInput {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;

  border: none;
}

.searchButton {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;

  border: none;

  color: rgb(70, 70, 70);
}

.searchButton:hover {
  color: rgb(161, 161, 161);
}
</style>
