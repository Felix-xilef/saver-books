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
          :to="{
            name: 'ManageOperations',
            params: { operationName: 'reservation' },
          }"
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
        <router-link class="nav-link p-0 m-2" :to="{ name: 'ManageUsers' }">
          Usuário
        </router-link>
        <router-link class="nav-link p-0 m-2" to=""> Relatório </router-link>
        <a href="#" class="nav-link p-0 m-2" @click="logout"> Sair </a>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row p-3">
      <form class="col-3 backgroundLightPurple borderPurple p-4">
        <div class="d-inline-flex align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            class="bi bi-sliders"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
            />
          </svg>
          <h5 class="ms-2 mb-0">Filtros</h5>
        </div>
        <div class="p-4">
          <div v-for="filter in checkboxFilters" :key="filter.id" class="pb-3">
            <h6>{{ filter.name }}</h6>
            <div
              v-for="option in filter.content"
              class="form-check"
              :key="option.id"
            >
              <input
                class="form-check-input"
                type="checkbox"
                :id="'checkbox' + option"
              />
              <label class="form-check-label" :for="'checkbox' + option">
                {{ option }}
              </label>
            </div>
          </div>
          <div>
            <h6>Data de publicação</h6>
            <div>
              <div class="pb-2">
                <label class="form-label pe-2" for="dateFrom">De:</label>
                <input class="form-control" type="date" id="dateFrom" />
              </div>
              <div>
                <label class="form-label pe-2" for="dateFrom">Até:</label>
                <input class="form-control" type="date" id="dateFrom" />
              </div>
            </div>
          </div>
        </div>
      </form>
      <div class="col">
        <div class="row row-cols-4">
          <div v-for="book in books" class="col p-3" :key="book.isbn">
            <router-link
              class="
                d-flex
                flex-column
                align-items-center
                text-decoration-none
                rounded
                bookContainer
              "
              :to="{ name: 'BookDetails', params: { isbn: book.isbn } }"
            >
              <img
                src="../assets/picture.png"
                alt="Book cover"
                class="bookCover"
              />
              <h5>{{ book.title }}</h5>
              <h6>{{ book.author }}</h6>
              <p class="summary">{{ book.summary }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookService from "../services/BookService";
import LoginService from '../services/LoginService';
export default {
  name: "Search",
  data() {
    return {
      checkboxFilters: [],
      books: [],
      booksReceived: [],
      filter: "",
    };
  },
  methods: {
    getBooks(filter) {
      let filterObj = {}
      if (filter) filterObj.title = filter
      BookService.getAll(filterObj).then((response) => {
        this.booksReceived = response.data;
        this.books = response.data;

        let localFilters = [
          { name: 'Idioma', content: [] },
          { name: 'Autor', content: [] },
          { name: 'Editora', content: [] },
          { name: 'Gênero', content: [] },
        ]

        this.books.map(item => {
          [
            item.language,
            item.author,
            item.publisher,
            item.genre.description
          ].map((value, index) => {
            if (!localFilters[index].content.find(filterValue => filterValue == value)) {
              localFilters[index].content.push(value)
            }
          })
        })

        localFilters.map(item => {
          if (item.content.length > 1) this.checkboxFilters.push(item)
        })
      });
    },
    searchByParameter() {
      this.getBooks(this.filter);
    },
    logout() {
      LoginService.logout()
      this.$router.replace({ name: 'Login' })
    },
  },
  mounted() {
    this.getBooks();
  },
  watch: {
    filter(newFilter) {
      this.getBooks(newFilter);
    },
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

.container {
  max-width: 100%;
}

.form-check-input,
.form-check-label {
  cursor: pointer;
}

.form-control {
  border-radius: 20px;
}

.bookContainer {
  color: inherit;
}

.bookContainer:hover {
  background-color: rgba(221, 221, 221, 0.527);
}

.bookCover {
  height: 150px;
  max-width: 200px;
}

.summary {
  text-align: justify;
}
</style>
