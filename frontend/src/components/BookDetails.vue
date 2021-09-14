<template>
  <div v-if="book" class="container p-4">
    <div class="row row-cols-md-1 row-cols-lg-2">
      <div class="col ps-0">
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
      <div class="col-auto pe-0 d-flex justify-content-end align-items-end">
        <button
          class="btn text-white outlinedOnHover backgroundGradientGreen"
          type="button"
          @click="openLoanModal"
        >
          <p>Realizar Empréstimo</p>
        </button>
        <button
          v-if="book.availCopies > 0"
          class="btn text-white ms-3 outlinedOnHover backgroundGradientBlue"
          type="button"
          @click="openReservationModal"
        >
          <p>Reservar</p>
        </button>
        <router-link :to="{ name: 'ManageBooks', params: { isbn: book.isbn } }"
          class="btn text-white ms-3 outlinedOnHover backgroundGradientRed"
          type="button"
        >
          <p>Editar</p>
        </router-link>
      </div>
    </div>
    <div class="row p-3">
      <p class="p-2 border border-secondary rounded">{{ book.summary }}</p>
    </div>
    <div class="row">
      <strong>Mais Informações</strong>
      <div class="border border-secondary rounded backgrounLightGray">
        <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3">
          <div class="col p-3">
            <strong>Editora:</strong> {{ book.publisher }}
          </div>
          <div class="col p-3">
            <strong>Data de publicação:</strong> {{ book.publicDate.split('-').reverse().join('/') }}
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

  <reservation-modal :book="book" @success="modalSuccess" @error="modalError" />

  <loan-modal :book="book" @success="modalSuccess" @error="modalError" />

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
      loanModal: false,
      reservationModal: false,
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
    modalSuccess(message) {
      this.getBook(this.isbn);

      if (this.reservationModal) this.reservationModal.hide();
      if (this.loanModal) this.loanModal.hide();

      this.success(message);
    },
    modalError(message) {
      if (this.reservationModal) this.reservationModal.hide();
      if (this.loanModal) this.loanModal.hide();

      this.error(message);
    },
    openReservationModal() {
      if (!this.reservationModal) this.reservationModal = ReservationModal.computed.modal();

      this.reservationModal.show();
    },
    openLoanModal() {
      if (!this.loanModal) this.loanModal = LoanModal.computed.modal();

      this.loanModal.show();
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

/* .bookAction {
  position: relative;
  background-clip: padding-box;
  border: solid 3px transparent;
}

.bookAction:first-child::before {
  background: var(--gradient-green);
}

.bookAction:nth-child(2)::before {
  background: var(--gradient-blue);
}

.bookAction:last-child::before {
  background: var(--gradient-red);
}

.bookAction::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  margin: -3px;
  border-radius: inherit;
}

.bookAction:hover {
  background-color: white;
}

.bookAction:first-child:hover p {
  background: var(--gradient-green);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bookAction:nth-child(2):hover p {
  background: var(--gradient-blue);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bookAction:last-child:hover p {
  background: var(--gradient-red);
  background-clip: text;
  -webkit-text-fill-color: transparent;
} */
</style>
