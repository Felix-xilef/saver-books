<template>
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
          <img src="../assets/logo.svg" alt="logo do site" class="logo" />
        </router-link>
      </div>
      <form class="col-md-9">
        <div class="input-group me-2 bg-white">
          <input
            class="form-control"
            type="search"
            :value="filter"
            placeholder="digite para pesquisar..."
          />
          <button
            type="button"
            class="input-group-text btn btn-outline-secondary"
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
          :to="{ name: 'ManageOperations', params: { operationName: 'reservation' } }"
        >
          Reserva
        </router-link>
        <router-link
          class="nav-link p-0 m-2"
          :to="{ name: 'ManageOperations', params: { operationName: 'loan' } }"
        >
          Empréstimo
        </router-link>
        <router-link
          class="nav-link p-0 m-2"
          :to="{ name: 'ManageBooks' }"
        >
          Livro
        </router-link>
        <router-link
          class="nav-link p-0 m-2"
          :to="{ name: 'ManageUsers' }"
        >
          Usuário
        </router-link>
        <router-link
          class="nav-link p-0 m-2"
          to=""
        >
          Relatório
        </router-link>
        <a
          href="#"
          class="nav-link p-0 m-2"
        >
          Sair
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    filter: {
      get() {
        return this.$store.filter
      },
      set(newValue) {
        this.$store.filter = newValue
      }
    }
  },
};
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

.input-group {
  border-radius: 20px;
}

input {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;

  border: none;
}

.btn {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;

  border: none;
}
</style>
