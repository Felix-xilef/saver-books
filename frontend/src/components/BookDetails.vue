<template>
  <div v-if="book" class="container p-4">
    <div class="row">
      <div class="col">
        <div class="d-inline-flex">
          <img src="../shared/assets/picture.png" alt="Book cover" class="bookCover" />
          <div class="d-flex flex-column justify-content-evenly m-3">
            <h3>{{ book.title }}</h3>
            <h4>{{ book.author }}</h4>
            <p><strong>Gênero:</strong> {{ book.genre.description }}</p>
          </div>
        </div>
        <p><strong>ISBN:</strong> {{ book.isbn }}</p>
      </div>
      <div class="col d-flex justify-content-end align-items-end">
        <button
          class="btn text-white backgroundGradientGreen"
          type="button"
          @click="openLoanModal"
        >
          Realizar Empréstimo
        </button>
        <button
          v-if="book.availCopies > 0"
          class="btn text-white backgroundGradientBlue ms-3"
          type="button"
          @click="openReservationModal"
        >
          Reservar
        </button>
        <router-link :to="{ name: 'ManageBooks', params: { isbn: book.isbn } }"
          class="btn text-white backgroundGradientRed ms-3"
          type="button"
        >
          Editar
        </router-link>
      </div>
    </div>
    <div class="row p-4">
      <p class="p-2 border border-secondary rounded">{{ book.summary }}</p>
    </div>
    <div class="row">
      <strong>Mais Informações</strong>
      <div class="border border-secondary rounded backgrounLightGray">
        <div class="row row-cols-3">
          <div class="col p-3">
            <strong>Editora:</strong> {{ book.publisher }}
          </div>
          <div class="col p-3">
            <strong>Data de publicação:</strong> {{ book.publicDate }}
          </div>
          <div class="col p-3">
            <strong>Idioma:</strong> {{ book.language }}
          </div>
          <div class="col p-3">
            <strong>Número de cópias disponíveis:</strong>
            {{ book.availCopies }}
          </div>
          <div class="col p-3">
            <strong>Número de cópias indisponíveis:</strong>
            {{ book.unavailCopies }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <reservation-modal :book="book" @success="success" @error="error" />

  <loan-modal :book="book" @success="success" @error="error" />

  <alert :logMessage="log.message" :error="log.error" :success="log.success" />
</template>

<script>
import BookService from '../shared/services/BookService';
import Alert from '../shared/components/Alert.vue';
import ReservationModal from './reservationModal.vue';
import LoanModal from './loanModal.vue';
export default {
  components: { Alert, ReservationModal, LoanModal },
  name: "BookDetails",
  props: {
    isbn: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      log: {
        message: '',
        error: false,
        success: false,
      },
      book: false,
    };
  },
  methods: {
		success(message) {
			this.log.message = message;
			this.log.error = false;
			this.log.success = true;
		},
		error(message) {
			this.log.message = message;
			this.log.success = false;
			this.log.error = true;
		},
    openReservationModal() {
      ReservationModal.computed.modal().show();
    },
    openLoanModal() {
      LoanModal.methods.modal().show();
    },
    getBook(isbn) {
      BookService.getByIsbn(isbn).then(response => {
        this.book = response.data;

      }).catch(err => {
				this.error('Erro ao buscar livro: ' + err);
      })
    },
  },
  mounted() {
    this.getBook(this.isbn);
  },
};
</script>

<style scoped>
.container {
  max-width: 90%;
}

.bookCover {
  height: 250px;
  max-width: 200px;
}
</style>
