<template>
  <form class="container p-3" @submit.prevent="salveBook">
    <div class="row">
      <div class="col-3">
        <!-- <input type="image" src="../shared/assets/picture.png" alt="" /> -->
        <img src="../shared/assets/picture.png" alt="" />
        <div class="mt-2">
          <label class="form-label" for="txtAvailCopies">
            Número de cópias disponíveis
          </label>
          <input
            class="form-control numberInput"
            type="number"
            name="txtAvailCopies"
            id="txtAvailCopies"
            v-model="book.availCopies"
            placeholder="0"
            required
          />
        </div>
        <div v-if="isbn" class="mt-2">
          <label class="form-label" for="txtUnavailCopies">
            Número de cópias indisponíveis
          </label>
          <input
            class="form-control numberInput"
            type="number"
            name="txtUnavailCopies"
            id="txtUnavailCopies"
            :value="book.unavailCopies"
            placeholder="0"
            disabled
          />
        </div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col">
            <label class="form-label" for="txtIsbn">ISBN</label>
            <input
              class="form-control"
              type="text"
              name="txtIsbn"
              id="txtIsbn"
              placeholder="código ISBN"
              v-model="book.isbn"
              :disabled="isbn"
              required
            />
          </div>
          <div class="col">
            <label class="form-label" for="selectGenre">Gênero</label>
            <select class="form-select" name="selectGenre" id="selectGenre" v-model="book.genre.id">
              <option :key="genre.id" v-for="genre in genres" :value="genre.id">
                {{ genre.description }}
              </option>
            </select>
          </div>
          <div class="col">
            <label class="form-label" for="txtLanguage">Idioma</label>
            <input
              class="form-control"
              type="text"
              name="txtLanguage"
              id="txtLanguage"
              placeholder="idioma do livro"
              v-model="book.language"
              required
            />
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <label class="form-label" for="txtTitle">Título</label>
            <input
              class="form-control"
              type="text"
              name="txtTitle"
              id="txtTitle"
              placeholder="título da obra"
              v-model="book.title"
              required
            />
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <div class="row">
              <div class="col">
                <label class="form-label" for="txtAuthor">Autor</label>
                <input
                  class="form-control"
                  type="text"
                  name="txtAuthor"
                  id="txtAuthor"
                  placeholder="autor da obra"
                  v-model="book.author"
                  required
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label class="form-label" for="txtPublisher">Editora</label>
                <input
                  class="form-control"
                  type="text"
                  name="txtPublisher"
                  id="txtPublisher"
                  placeholder="editora do livro"
                  v-model="book.publisher"
                  required
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label class="form-label" for="txtPublicDate"
                  >Data de Publicação</label
                >
                <input
                  class="form-control"
                  type="date"
                  name="txtPublicDate"
                  id="txtPublicDate"
                  v-model="book.publicDate"
                  required
                />
              </div>
            </div>
          </div>
          <div class="col">
            <label class="form-label" for="txtSummary">Síntese</label>
            <textarea
              class="form-control rounded"
              placeholder="síntese da obra..."
              name="txtSummary"
              id="txtSummary"
              required
              v-model="book.summary"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="position-fixed">
      <button class="btn p-0 m-2" type="submit">
        <img height="40" src="../shared/assets/saveButton.svg" alt="" />
      </button>
      <button v-if="isbn" class="btn p-0 m-2" type="button" @click="removeBook">
        <img height="40" src="../shared/assets/removeButton.svg" alt="" />
      </button>
    </div>
  </form>

  <alert :logMessage="log.message" :error="log.error" :success="log.success" />
</template>

<script>
import Alert from '../shared/components/Alert.vue';
import BookService from '../shared/services/BookService';
import SubTypesService from '../shared/services/SubTypesService';
export default {
  components: { Alert },
  name: "ManageBooks",
  props: {
    isbn: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      log: {
        message: '',
        error: false,
        success: false,
      },
      book: {
        isbn: '',
        language: '',
        title: '',
        author: '',
        publicDate: '',
        publisher: '',
        summary: '',
        availCopies: '',
        genre: {
          id: 1,
          description: '',
        }
      },
      genres: [],
    };
  },
  methods: {
    error(message) {
      this.log.message = message;
      this.log.success = false;
      this.log.error = true;
    },
    success(message) {
      this.log.message = message;
      this.log.error = false;
      this.log.success = true;
    },
    resetBook() {
      this.book = {
        isbn: '',
        language: '',
        title: '',
        author: '',
        publicDate: '',
        publisher: '',
        summary: '',
        availCopies: '',
        genre: {
          id: '',
          description: '',
        }
      }
    },
    getGenres() {
      SubTypesService.getGenres().then(response => {
        this.genres = response.data;
        
      }).catch(err => {
        this.error('Erro ao listar gêneros: ' + err);
      });
    },
    getBook(isbn) {
      BookService.getByIsbn(isbn).then(response => {
        this.book = response.data;

      }).catch(err => {
        this.error('Erro ao buscar livro: ' + err);
      });
    },
    salveBook() {
      if (this.isbn) {
        BookService.updateBook(this.book).then(() => {
          this.success('Livro salvo com sucesso!');

        }).catch(err => {
          this.error('Erro ao salvar livro: ' + err);
        });

      } else {
        BookService.postBook(this.book).then(() => {
          this.success('Livro salvo com sucesso!');

        }).catch(err => {
          this.error('Erro ao salvar livro: ' + err);
        });
      }

      if (!this.isbn) this.resetBook();
    },
    removeBook() {
      BookService.removeBook(this.isbn).then(() => {
        this.success('Livro removido com sucesso!');

      }).catch(err => {
        this.error('Erro ao remover livro: ' + err);
      });

      this.resetBook()
    },
  },
  mounted() {
    this.getGenres()
    if (this.isbn) this.getBook(this.isbn)
  },
};
</script>

<style scoped>
.container {
  width: 95%;
}

.form-control,
.form-select {
  border-radius: 20px;
}

textarea {
  height: 100%;
}

.numberInput {
  max-width: 80px;
}

.position-fixed {
  bottom: 0px;
  right: 20px;
}
</style>
