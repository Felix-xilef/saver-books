<template>
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
                src="../shared/assets/picture.png"
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

  <alert :logMessage="log.message" :error="log.error" />
</template>

<script>
import Alert from '../shared/components/Alert.vue';
import BookService from "../shared/services/BookService";
export default {
  components: { Alert },
  name: "Search",
  props: {
    searchParameter: {
      type: String,
      required: false,
    }
  },
  data() {
    return {
      log: {
        message: '',
        error: '',
      },
      checkboxFilters: [],
      books: [],
      booksReceived: [],
      filters: {
        language: { name: 'Idioma', content: [] },
        author: { name: 'Autor', content: [] },
        publisher: { name: 'Editora', content: [] },
        genre: { name: 'Gênero', content: [] },
      },
    };
  },
  methods: {
    filterBooks(/*filters*/) {
      // this.booksReceived.forEach(book => {

      // });
    },
    getBooks(title) {
      BookService.searchByTitle(title).then((response) => {
        this.booksReceived = response.data;
        this.books = response.data;

        this.filterBooks(this.filters);

      }).catch(error => {
        this.log.message = 'Erro ao buscar livros: ' + error;
				this.log.error = true;
      });
    },
  },
  watch: {
    searchParameter(newParam) {
      this.getBooks(newParam);
    },
  },
  mounted() {
    console.log(this.searchParameter);
    if (this.searchParameter) this.getBooks(this.searchParameter);
  },
};
</script>

<style scoped>
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
