<template>
  <form class="container p-3" @submit.prevent="submit">
    <div class="row">
      <div class="col-3">
        <label for="bookCover">
          <img src="" alt="" id="bookCoverImage" class="borderPurple backgroundLightPurple">

          <input type="file" name="bookCover" id="bookCover" class="form-control" accept="image/jpeg, image/png" @change="changeCover">
        </label>

        <div class="mt-2">
          <label class="form-label" for="txtAvailCopies">
            Número de cópias disponíveis
          </label>
          <input
            class="form-control numberInput"
            :class="{ 'is-valid': controlIsValid('availCopies'), 'is-invalid': controlHasError('availCopies') }"
            type="number"
            name="txtAvailCopies"
            id="txtAvailCopies"
            v-model="book.availCopies"
            placeholder="0"
            min="0"
          />
          <div class="invalid-feedback">
            <span v-if="book.availCopies == ''">
              O número de cópias disponíveis é obrigatório
            </span>
            <span v-else>
              O número de cópias disponíveis deve ser maior ou igual a zero
            </span>
          </div>
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
              :class="{ 'is-valid': controlIsValid('isbn'), 'is-invalid': controlHasError('isbn') }"
              type="text"
              name="txtIsbn"
              id="txtIsbn"
              placeholder="código ISBN"
              v-model="book.isbn"
              :disabled="isbn"
            />
            <div class="invalid-feedback">
              O ISBN é obrigatório
            </div>
          </div>

          <div class="col">
            <label class="form-label" for="selectGenre">Gênero</label>
            <select
              class="form-select"
              :class="{ 'is-valid': controlIsValid('genre'), 'is-invalid': controlHasError('genre') }"
              name="selectGenre"
              id="selectGenre"
              v-model="book.genre.id"
            >
              <option :key="genre.id" v-for="genre in genres" :value="genre.id">
                {{ genre.description }}
              </option>
            </select>
            <div class="invalid-feedback">
              O gênero é obrigatório
            </div>
          </div>

          <div class="col">
            <label class="form-label" for="txtLanguage">Idioma</label>
            <input
              class="form-control"
              :class="{ 'is-valid': controlIsValid('language'), 'is-invalid': controlHasError('language') }"
              type="text"
              name="txtLanguage"
              id="txtLanguage"
              placeholder="idioma do livro"
              v-model="book.language"
            />
            <div class="invalid-feedback">
              O idioma é obrigatório
            </div>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col">
            <label class="form-label" for="txtTitle">Título</label>
            <input
              class="form-control"
              :class="{ 'is-valid': controlIsValid('title'), 'is-invalid': controlHasError('title') }"
              type="text"
              name="txtTitle"
              id="txtTitle"
              placeholder="título da obra"
              v-model="book.title"
            />
            <div class="invalid-feedback">
              O título é obrigatório
            </div>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col">
            <div class="row">
              <div class="col">
                <label class="form-label" for="txtAuthor">Autor</label>
                <input
                  class="form-control"
                  :class="{ 'is-valid': controlIsValid('author'), 'is-invalid': controlHasError('author') }"
                  type="text"
                  name="txtAuthor"
                  id="txtAuthor"
                  placeholder="autor da obra"
                  v-model="book.author"
                />
                <div class="invalid-feedback">
                  O Autor é obrigatório
                </div>
              </div>
            </div>

            <div class="row mt-2">
              <div class="col">
                <label class="form-label" for="txtPublisher">Editora</label>
                <input
                  class="form-control"
                  :class="{ 'is-valid': controlIsValid('publisher'), 'is-invalid': controlHasError('publisher') }"
                  type="text"
                  name="txtPublisher"
                  id="txtPublisher"
                  placeholder="editora do livro"
                  v-model="book.publisher"
                />
                <div class="invalid-feedback">
                  A editora é obrigatória
                </div>
              </div>
            </div>

            <div class="row mt-2">
              <div class="col">
                <label class="form-label" for="txtPublicDate">
                  Data de Publicação
                </label>
                <input
                  class="form-control"
                  :class="{ 'is-valid': controlIsValid('publicDate'), 'is-invalid': controlHasError('publicDate') }"
                  type="date"
                  name="txtPublicDate"
                  id="txtPublicDate"
                  v-model="book.publicDate"
                />
                <div class="invalid-feedback">
                  A data de publicação é obrigatória
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <label class="form-label" for="txtSummary">Síntese</label>
            <textarea
              class="form-control rounded"
              :class="{ 'is-valid': controlIsValid('summary'), 'is-invalid': controlHasError('summary') }"
              placeholder="síntese da obra..."
              name="txtSummary"
              id="txtSummary"
              v-model="book.summary"
            ></textarea>
            <div class="invalid-feedback">
              A síntese é obrigatória
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="position-fixed">
      <button
        class="btn p-0 m-2"
        :class="{ 'disabled': !bookIsValid }"
        type="submit"
        :disabled="!bookIsValid"
      >
        <img height="40" src="../shared/assets/saveButton.svg" alt="" />
      </button>

      <button
        v-if="isbn"
        class="btn p-0 m-2"
        type="button"
        @click="removeBook"
      >
        <img height="40" src="../shared/assets/removeButton.svg" alt="" />
      </button>
    </div>
  </form>

  <alert :logMessage="log.message" :error="log.error" :success="log.success" />
</template>

<script>
import Alert from '../shared/components/Alert.vue';
import ImageService from '../shared/services/ImageService';
import BookService from '../shared/services/BookService';
import SubTypesService from '../shared/services/SubTypesService';
import vuelidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
export default {
  setup() { return { v$: vuelidate() } },
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
        },
        cover: '',
      },
      genres: [],
      reader: new FileReader(),
    };
  },
  validations() {
    return {
      book: {
        isbn: { required, $autoDirty: true },
        language: { required, $autoDirty: true },
        title: { required, $autoDirty: true },
        author: { required, $autoDirty: true },
        publicDate: { required, $autoDirty: true },
        publisher: { required, $autoDirty: true },
        summary: { required, $autoDirty: true },
        availCopies: { required, minValue: minValue(0), $autoDirty: true },
        genre: {
          id: { required, $autoDirty: true }
        },
      },
    }
  },
  computed: {
    bookIsValid() {
      return !this.v$.book.$invalid;
    },
    bookCoverInput() {
      return document.getElementById('bookCover');
    },
    bookCoverImage() {
      return document.getElementById('bookCoverImage');
    },
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
      this.book.isbn = '';
      this.book.language = '';
      this.book.title = '';
      this.book.author = '';
      this.book.publicDate = '';
      this.book.publisher = '';
      this.book.summary = '';
      this.book.availCopies = '';
      this.book.genre.id = '';
      this.book.genre.description = '';

      this.v$.book.reset();
    },
    controlIsValid(attributeName) {
      return !this.v$.book[attributeName].$invalid && this.v$.book[attributeName].$dirty;
    },
    controlHasError(attributeName) {
      return this.v$.book[attributeName].$error;
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

        this.getBookCover(this.book.cover);

      }).catch(err => {
        this.error('Erro ao buscar livro: ' + err);
      });
    },
    getBookCover(fileName) {
      ImageService.getImage(fileName).then(response => {
        console.log(response);
        // this.bookCoverImage.src = URL.createObjectURL(new Blob([response.data]));

      }).catch(err => this.error('Erro ao recuperar a imagem: ' + err));
    },
    changeCover() {
      if (this.bookCoverInput.files && this.bookCoverInput.files[0]) {
        this.reader.readAsDataURL(this.bookCoverInput.files[0]);
      }
    },
    submit() {
      if (this.bookIsValid) this.salveBook();
    },
    salveBook() {
      if (this.bookCoverInput.src != '') this.book.cover = this.book.isbn + this.bookCoverInput.src.slice(this.bookCoverInput.src.lastIndexOf('.'));

      if (this.isbn) {
        BookService.updateBook(this.book).then(() => {
          if (this.bookCoverInput.src != '') this.saveBookCover();
          
          this.success('Livro editado com sucesso!');

        }).catch(err => {
          this.error('Erro ao editar livro: ' + err);
        });

      } else {
        BookService.postBook(this.book).then(() => {
          if (this.bookCoverInput.src != '') this.saveBookCover();
          
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
    saveBookCover() {
      ImageService.postImage(this.bookCoverInput.files[0], this.book.cover).catch(err => {
        this.error('Erro ao salvar capa do livro: ' + err);
      });
    },
  },
  mounted() {
    this.getGenres()
    if (this.isbn) this.getBook(this.isbn)
    
    this.reader.onload = (event) => this.bookCoverImage.src = event.target.result;
  },
};
</script>

<style scoped>
label[for="bookCover"] {
  position: relative;
  transition-duration: var(--transition-duration);
  border-radius: 5px;
}

label[for="bookCover"]:hover {
  background-color: var(--on-hover-gray);
  opacity: 0.85;
}

label[for="bookCover"] img {
  max-width: 100%;
  max-height: 300px;

  border-radius: inherit;
}

label[for="bookCover"] img[src=""] {
  border-radius: 5px;
  background-image: url('../shared/assets/pictureIcon.svg');
  background-repeat: no-repeat;
  background-position: center;

  min-width: 180px;
  min-height: 260px;
  
  max-width: 100%;
}

input#bookCover {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  border-radius: inherit;
  opacity: 0;
}

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
