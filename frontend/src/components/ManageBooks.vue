<template>
  <form class="container p-3" @submit.prevent="submit">
    <div class="row">
      <div class="col-3">
        <label for="bookCover">
          <img src="" alt="" id="bookCoverImage" class="borderPurple backgroundLightPurple">

          <input type="file" name="bookCover" id="bookCover" class="form-control" accept="image/jpeg" @change="changeCover">
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
              :disabled="Boolean(isbn)"
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
        class="btn p-0 m-2 roundFloat"
        :class="{ 'backgroundGradientDisabled': !bookIsValid, 'backgroundGradientGreen': bookIsValid }"
        type="submit"
        :disabled="!bookIsValid"
      >
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.9687 0H3.28125C1.47197 0 0 1.47197 0 3.28125V24.7188C0 26.528 1.47197 28 3.28125 28H24.7188C26.528 28 28 26.528 28 24.7188V4.03134L23.9687 0ZM6.5625 2.1875H19.1406V8.64062H6.5625V2.1875ZM21.4375 25.8125H6.5625V17.1719H21.4375V25.8125ZM25.8125 24.7188C25.8125 25.3218 25.3218 25.8125 24.7188 25.8125H23.625V14.9844H4.375V25.8125H3.28125C2.67816 25.8125 2.1875 25.3218 2.1875 24.7188V3.28125C2.1875 2.67816 2.67816 2.1875 3.28125 2.1875H4.375V10.8281H21.3281V2.1875H23.0626L25.8125 4.93741V24.7188Z" fill="currentColor"/>
          <path d="M23.9687 0H3.28125C1.47197 0 0 1.47197 0 3.28125V24.7188C0 26.528 1.47197 28 3.28125 28H24.7188C26.528 28 28 26.528 28 24.7188V4.03134L23.9687 0ZM6.5625 2.1875H19.1406V8.64062H6.5625V2.1875ZM21.4375 25.8125H6.5625V17.1719H21.4375V25.8125ZM25.8125 24.7188C25.8125 25.3218 25.3218 25.8125 24.7188 25.8125H23.625V14.9844H4.375V25.8125H3.28125C2.67816 25.8125 2.1875 25.3218 2.1875 24.7188V3.28125C2.1875 2.67816 2.67816 2.1875 3.28125 2.1875H4.375V10.8281H21.3281V2.1875H23.0626L25.8125 4.93741V24.7188Z" fill="currentColor"/>
          <path d="M17.1719 3.22656H14.9844V7.54688H17.1719V3.22656Z" fill="currentColor"/>
        </svg>
			</button>

			<button
        v-if="isbn"
        class="btn p-0 m-2 roundFloat"
        :class="{ 'backgroundGradientDisabled': !bookIsValid, 'backgroundGradientRed': bookIsValid }"
        type="button"
        @click="removeBook"
        :disabled="!bookIsValid"
      >
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
			</button>
    </div>
  </form>

  <alert
    :logMessage="log.message"
    :error="log.status.error"
    :success="log.status.success"
    @closed="alert(null, null)"
  />
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
        status: {
          error: false,
          success: false,
        },
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
    alert(message, type) {
      this.log.message = message;
      Object.keys(this.log.status).forEach(key => this.log.status[key] = key == type);
    },
    resetBookForm() {
      this.book.isbn = '';
      this.book.language = '';
      this.book.title = '';
      this.book.author = '';
      this.book.publicDate = '';
      this.book.publisher = '';
      this.book.summary = '';
      this.book.availCopies = '';
      this.book.genre.id = 1;
      this.book.genre.description = '';
      this.book.cover = '';
      this.bookCoverInput.src = '';
      this.bookCoverImage.src = '';

      this.v$.book.$reset();
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
        this.alert('Erro ao listar gêneros: ' + err, 'error');
      });
    },
    getBook(isbn) {
      BookService.getByIsbn(isbn).then(response => {
        this.book = response.data;

        if (this.book.cover) {
          this.bookCoverImage.src = ImageService.getImageURL(this.book.cover);
        } else {
          this.bookCoverImage.src = '';
        }

      }).catch(err => {
        this.alert('Erro ao buscar livro: ' + err, 'error');
      });
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
      if (this.bookCoverInput.value != '') {
        this.book.cover = this.book.isbn + this.bookCoverInput.value.slice(this.bookCoverInput.value.lastIndexOf('.'));
      }

      if (this.isbn) {
        BookService.updateBook(this.book).then(() => {
          if (this.book.cover != '') this.saveBookCover();
          
          this.alert('Livro editado com sucesso!', 'success');

        }).catch(err => {
          this.alert('Erro ao editar livro: ' + err, 'error');
        });

      } else {
        BookService.postBook(this.book).then(() => {
          if (this.book.cover != '') this.saveBookCover();
          
          this.alert('Livro salvo com sucesso!', 'success');
          this.resetBookForm();

        }).catch(err => {
          this.alert('Erro ao salvar livro: ' + err, 'error');
        });
      }
    },
    removeBook() {
      BookService.removeBook(this.isbn).then(() => {
        this.alert('Livro removido com sucesso!', 'success');

        this.resetBookForm()

      }).catch(err => {
        this.alert('Erro ao remover livro: ' + err, 'error');
      });
    },
    saveBookCover() {
      ImageService.postImage(this.bookCoverInput.files[0], this.book.cover).catch(err => {
        this.alert('Erro ao salvar capa do livro: ' + err, 'error');
      });
    },
  },
  mounted() {
    this.getGenres();

    if (this.isbn) this.getBook(this.isbn);
    
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
  bottom: 10px;
  right: 20px;
}
</style>
