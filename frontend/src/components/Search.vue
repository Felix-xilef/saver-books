<template>
  <div class="container my-md-4 bd-layout m-0">
    <aside class="bd-sidebar">
      <form class="backgroundLightPurple borderPurple p-4">
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
        <ul class="list-unstyled mb-0">
          <li v-for="(filter, filterKey) in filters" :key="filterKey" class="mb-1">
            <button
              type="button"
              class="btn d-inline-flex filterTitle align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              :data-bs-target="'#' + filterKey + 'Options'"
              aria-expanded="false"
            >
              {{ filter.name }}
            </button>

            <div :id="filterKey + 'Options'" class="collapse">
              <ul v-if="filter.type == 'checkbox'" class="list-unstyled fw-normal small">
                <li
                  v-for="(option, optionKey) in filter.content"
                  class="form-check"
                  :key="optionKey"
                >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="'checkbox' + optionKey"
                    @change="filters[filterKey].content[optionKey] = !filters[filterKey].content[optionKey]; filterBooks()"
                  />
                  <label class="form-check-label" :for="'checkbox' + optionKey">
                    {{ optionKey }}
                  </label>
                </li>
              </ul>
              <ul v-else-if="filter.type == 'date'" class="list-unstyled fw-normal small">
                <li
                  v-for="(option, optionKey) in filter.content"
                  class="pb-2"
                  :key="optionKey"
                >
                  <label class="form-label pe-2" :for="optionKey">
                    {{ optionKey == 'start' ? 'De' : 'Até' }}:
                  </label>
                  <input
                    class="form-control"
                    type="date"
                    :id="optionKey"
                    @change="filters[filterKey].content[optionKey] = $event.target.value; filterBooks()"
                  />
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </form>
    </aside>

    <div class="col">
      <div v-if="books.length > 0" class="row row-cols-lg-5 row-cols-md-4">
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
            <book-cover :fileName='book.cover' size='small'/>
            <h5>{{ book.title }}</h5>
            <h6>{{ book.author }}</h6>
            <p class="summary" li>{{ book.summary }}</p>
          </router-link>
        </div>
      </div>
      <div v-else-if="searchParameter" class="alert alert-warning text-center">
        <h4 class="m-0">Nenhum resultado encontrado para '{{ searchParameter }}'</h4>
      </div>
      <div v-else class="alert alert-info text-center">
        <h4 class="m-0">Digite o ISBN, título, autor ou a editora do livro para realizar uma busca</h4>
      </div>
    </div>
  </div>

  <alert :logMessage="log.message" :error="log.error" />
</template>

<script>
import Alert from '../shared/components/Alert.vue';
import BookCover from '../shared/components/BookCover.vue';
import BookService from "../shared/services/BookService";
import SearchFilters from '../shared/models/SearchFilters';
export default {
  components: { Alert, BookCover },
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
      booksReceived: [],
      books: [],
      filters: {},
    };
  },
  methods: {
    filterBooks() {
      this.books = this.filters.filterBooks(this.booksReceived);
    },
    getBooks(parameter) {
      BookService.searchByAny(parameter).then((response) => {
        this.booksReceived = response.data;
        this.books = response.data;

        this.filters = new SearchFilters(this.books);

      }).catch(error => {
        this.log.message = 'Erro ao buscar livros: ' + error;
				this.log.error = true;
      });
    },
  },
  watch: {
    searchParameter(newParam) {
      if (newParam) this.getBooks(newParam);
    },
  },
  mounted() {
    if (this.searchParameter) this.getBooks(this.searchParameter);
  },
};
</script>

<style scoped>
.filterTitle, .bookContainer {
  transition: var(--transition-duration);
}

.filterTitle {
  padding: .25rem .5rem;
}

.filterTitle:hover {
  background: var(--darker-purple);

  color: #000000;
}

.filterTitle:focus {
  background: var(--darker-purple);
  box-shadow: none;
  border: 1px solid var(--dark-purple);
  
  color: #000000;
}

.filterTitle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform 0.35s ease;
  transform-origin: .5em 50%;
}

.filterTitle[aria-expanded="true"]::before {
  transform: rotate(90deg);
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

  height: 300px;
  overflow: hidden;
}

.bookContainer:hover {
  background-color: rgba(221, 221, 221, 0.527);
}

.bookContainer h5, .bookContainer h6, .bookContainer p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.bookContainer h5 {
  font-size: 16px;

  -webkit-line-clamp: 2;
}

.bookContainer h6 {
  font-size: 14px;

  -webkit-line-clamp: 1;
}

.bookContainer p {
  font-size: 12px;

  -webkit-line-clamp: 4;
}

.summary {
  text-align: justify;
}
</style>
