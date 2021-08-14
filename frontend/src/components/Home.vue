<template>
	<!-- Navbar (menu) code -->
  <nav class="navbar navbar-light backgroundGradientPurple">
    <div class="container-fluid justify-content-around">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarToggleExternalContent"
        aria-controls="navbarToggleExternalContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="col-md-2">
        <router-link :to="{ name: 'Search' }" class="navbar-brand">
          <img src="../shared/assets/logo.svg" alt="logo do site" class="logo" />
        </router-link>
      </div>
      <form class="col-md-9" @submit.prevent="searchByParameter">
        <div class="input-group me-2 bg-white searchInputGroup">
          <input
            class="form-control searchInput"
            type="search"
            v-model="filter"
            placeholder="pesquise pelo título do livro"
            required
          />
          <button
            type="submit"
            class="input-group-text btn btn-outline-secondary searchButton"
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
  
  <div class="collapse" id="navbarToggleExternalContent">
    <div class="backgroundGradientPurple p-4 d-flex">
      <div>
        <router-link
          class="nav-link p-0 m-2"
          :to="{ name: 'ManageOperations', params: { operationName: 'reservation' }, }"
        >
          Reserva
        </router-link>
        <router-link
          class="nav-link p-0 m-2"
          :to="{ name: 'ManageOperations', params: { operationName: 'loan' } }"
        >
          Empréstimo
        </router-link>
        <router-link class="nav-link p-0 m-2" :to="{ name: 'ManageBooks' }">
          Livro
        </router-link>
        <router-link v-if="isManager" class="nav-link p-0 m-2" :to="{ name: 'ManageUsers' }">
          Usuário
        </router-link>
        <router-link class="nav-link p-0 m-2" :to="{ name: 'Reports' }">
          Relatório
        </router-link>
        <a href="" class="nav-link p-0 m-2" @click="logout">
          Sair
        </a>
      </div>
    </div>
  </div>
	<!-- End of navbar (menu) code -->

  <router-view></router-view>
</template>

<script>
import AuthService from '../shared/services/AuthService';
export default {
  name: 'Home',
  data() {
    return {
      filter: "",
    }
  },
  computed: {
    isManager() {
      return this.$store.state.user.userType.id == '1';
    }
  },
  methods: {
    searchByParameter() {
    },
    logout() {
      AuthService.logout()
      this.$router.replace({ name: 'Login' })
    },
  },
}
</script>

<style scoped>
.navbar-toggler-icon {
  height: 36px;
  width: 36px;
}

.nav-link {
  color: inherit;
}

.nav-link:hover {
  color: rgb(230, 230, 230);
}

.logo {
  max-height: 60px;
  border-radius: 50px;
}

.searchInputGroup {
  border-radius: 20px;
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
}
</style>