<template>
  <navbar-return />
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
          data-bs-toggle="modal"
          data-bs-target="#loanModal"
        >
          Realizar Empréstimo
        </button>
        <button
          v-if="book.availCopies > 0"
          class="btn text-white backgroundGradientBlue ms-3"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#reservationModal"
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

  <div
    class="modal fade"
    id="reservationModal"
    tabindex="-1"
    aria-labelledby="reservationModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <form class="modal-content" @submit.prevent="postReservation">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationModalLabel">
            Cadastro de Reserva
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            Preencha as informações abaixo e clique em finalizar reserva para
            concluir o cadastro da sua reserva.
          </p>
          <div class="container-fluid">
            <div class="row">
              <div class="col-4">
                <label class="form-label" for="txtReservationIsbn">
                  ISBN do Livro
                </label>
                <input
                  class="form-control"
                  type="text"
                  name="txtReservationIsbn"
                  id="txtReservationIsbn"
                  :value="book.isbn"
                  disabled
                  required
                />
              </div>
              <div class="col" disabled>
                <label class="form-label" for="txtReservationTitle">
                  Título do Livro
                </label>
                <input
                  class="form-control"
                  type="text"
                  name="txtReservationTitle"
                  id="txtReservationTitle"
                  :value="book.title"
                  disabled
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <label class="form-label" for="txtReservationName">
                  Nome
                </label>
                <input
                  class="form-control"
                  type="name"
                  name="txtReservationName"
                  id="txtReservationName"
                  v-model="reservation.name"
                  placeholder="digite seu nome"
                  required
                />
              </div>
              <div class="col">
                <label class="form-label" for="txtReservationEmail">
                  E-mail
                </label>
                <input
                  class="form-control"
                  type="email"
                  name="txtReservationEmail"
                  id="txtReservationEmail"
                  v-model="reservation.email"
                  placeholder="digite um e-mail válido"
                  required
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <label class="form-label" for="txtReservationCpf"> CPF </label>
                <input
                  class="form-control"
                  type="text"
                  name="txtReservationCpf"
                  id="txtReservationCpf"
                  v-model="reservation.cpf"
                  placeholder="digite seu CPF"
                  required
                />
              </div>
              <div class="col">
                <label class="form-label" for="txtReservationPhone">
                  Telefone
                </label>
                <input
                  class="form-control"
                  type="tel"
                  name="txtReservationPhone"
                  id="txtReservationPhone"
                  v-model="reservation.phone"
                  placeholder="digite um telefone válido"
                  required
                />
              </div>
              <div class="col">
                <label class="form-label" for="txtReservationWithdrawal">
                  Data da Retirada
                </label>
                <input
                  class="form-control"
                  type="date"
                  name="txtReservationWithdrawal"
                  id="txtReservationWithdrawal"
                  v-model="reservation.withdrawalDate"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn text-white backgroundGradientBlue">
            Finalizar Reserva
          </button>
        </div>
      </form>
    </div>
  </div>

  <div
    class="modal fade"
    id="loanModal"
    tabindex="-1"
    aria-labelledby="loanModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <form class="modal-content" @submit.prevent="postLoan">
        <div class="modal-header">
          <h5 class="modal-title" id="loanModalLabel">
            Cadastro de Empréstimo
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            Preencha as informações abaixo e clique em finalizar empréstimo para
            concluir o cadastro do empréstimo. Ou selecione a opção visualizar
            reservas para reslizar um empréstimo a partir de uma reserva já
            existente.
          </p>
          <div class="container-fluid">
            <div class="row">
              <div class="col-4">
                <label class="form-label" for="txtLoanIsbn">
                  ISBN do Livro
                </label>
                <input
                  class="form-control"
                  type="text"
                  name="txtLoanIsbn"
                  id="txtLoanIsbn"
                  :value="book.isbn"
                  disabled
                  required
                />
              </div>
              <div class="col" disabled>
                <label class="form-label" for="txtLoanTitle">
                  Título do Livro
                </label>
                <input
                  class="form-control"
                  type="text"
                  name="txtLoanTitle"
                  id="txtLoanTitle"
                  :value="book.title"
                  disabled
                />
              </div>
              <div v-if="loan.reservationId" class="col-2" disabled>
                <label class="form-label" for="txtLoanReservationId">
                  ID da Reserva
                </label>
                <input
                  class="form-control"
                  type="number"
                  name="txtLoanReservationId"
                  id="txtLoanReservationId"
                  :value="loan.reservationId"
                  disabled
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <label class="form-label" for="txtLoanName"> Nome </label>
                <input
                  class="form-control"
                  type="name"
                  name="txtLoanName"
                  id="txtLoanName"
                  v-model="loan.name"
                  placeholder="digite seu nome"
                  required
                />
              </div>
              <div class="col">
                <label class="form-label" for="txtLoanEmail"> E-mail </label>
                <input
                  class="form-control"
                  type="email"
                  name="txtLoanEmail"
                  id="txtLoanEmail"
                  v-model="loan.email"
                  placeholder="digite um e-mail válido"
                  required
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <label class="form-label" for="txtLoanCpf"> CPF </label>
                <input
                  class="form-control"
                  type="text"
                  name="txtLoanCpf"
                  id="txtLoanCpf"
                  v-model="loan.cpf"
                  placeholder="digite seu CPF"
                  required
                />
              </div>
              <div class="col">
                <label class="form-label" for="txtLoanPhone"> Telefone </label>
                <input
                  class="form-control"
                  type="tel"
                  name="txtLoanPhone"
                  id="txtLoanPhone"
                  v-model="loan.phone"
                  placeholder="digite um telefone válido"
                  required
                />
              </div>
              <div class="col">
                <label class="form-label" for="txtLoanWithdrawal">
                  Data da Devolução
                </label>
                <input
                  class="form-control"
                  type="date"
                  name="txtLoanWithdrawal"
                  id="txtLoanWithdrawal"
                  v-model="loan.returnDate"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <div>
            <button
              type="button"
              class="btn text-white backgroundGradientGreen"
              data-bs-target="#reservationsModal"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              @click="getReservations"
            >
              Visualizar Reservas
            </button>
            <button
              v-if="book.availCopies > 0 || loan.reservationId"
              type="submit"
              class="btn text-white backgroundGradientBlue ms-2"
            >
              Finalizar Empréstimo
            </button>
          </div>
          <button type="button" class="btn p-0" @click="resetLoanForm">
            <img src="../shared/assets/clean.svg" alt="" />
          </button>
        </div>
      </form>
    </div>
  </div>

  <div
    class="modal fade"
    id="reservationsModal"
    tabindex="-1"
    aria-labelledby="reservationsModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header justify-content-between">
          <button
            type="button"
            class="btn p-0 me-auto return"
            data-bs-target="#loanModal"
            data-bs-toggle="modal"
            data-bs-dismiss="modal"
          >
            <img height="32" src="../shared/assets/arrow-left.svg" alt="back arrow" />
          </button>
          <h5 class="modal-title" id="reservationsModalLabel">
            Selecione uma Reserva
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="borderPurple rounded operationsView p-3">
            <div v-for="item in reservations" :key="item.id">
              <div class="p-3 registry" @click="selectReservation(item)">
                <div class="row">
                  <div class="col-1 me-2">
                    <img
                      height="100"
                      src="../shared/assets/picture.png"
                      alt="Book cover"
                    />
                  </div>
                  <div class="col d-flex flex-column justify-content-evenly m-2">
                    <div class="d-inline-flex">
                      <strong>CPF:</strong>
                      {{ item.cpf }}
                    </div>
                    <div class="d-inline-flex">
                      <div class="d-flex flex-column me-3">
                        <strong>Data da Reserva:</strong>
                        {{ item.reservedDate.slice(0, 10).split("-").reverse().join("/") }}
                      </div>
                      <div class="d-flex flex-column">
                        <strong>Data da Retirada:</strong>
                        {{ item.withdrawalDate.slice(0, 10).split("-").reverse().join("/") }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-1">
                  <h6>{{ item.isbn }}</h6>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookService from '../shared/services/BookService';
import ReservationService from '../shared/services/ReservationService';
import LoanService from '../shared/services/LoanService';
import NavbarReturn from "./NavbarReturn.vue";
export default {
  name: "BookDetails",
  components: { NavbarReturn },
  props: {
    isbn: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      book: false,
      loan: {},
      reservation: {},
			reservations: [],
    };
  },
  methods: {
    resetReservation() {
      this.reservation = {
        cpf: '',
        name: '',
        phone: '',
        email: '',
        bookIsbn: '',
        reservedDate: '',
        withdrawalDate: '',
        reservationStatus: {
          id: 1,
        },
      }
    },
    resetLoan() {
      this.loan = {
        cpf: '',
        name: '',
        phone: '',
        email: '',
        bookIsbn: '',
        withdrawalDate: '',
        returnDate: '',
        loanStatus: {
          id: 1,
        },
      }
    },
    resetLoanForm() {
      this.resetReservation()
      this.resetLoan()
    },
    closeModal(modalId) {
      document.querySelector(`#${modalId} button.btn-close`).click()
    },
    selectReservation(reservation) {
      this.reservation = reservation
      this.loan.reservationId = reservation.id
      this.loan.cpf = reservation.cpf
      this.loan.name = reservation.name
      this.loan.phone = reservation.phone
      this.loan.email = reservation.email
      this.loan.bookIsbn = reservation.bookIsbn
      document.querySelector(`#reservationsModal button.return`).click()
    },
    getBook(isbn) {
      BookService.getByIsbn(isbn).then(response => {
        this.book = response.data
      }).catch(err => {
        alert('Erro ao procurar livro')
        console.log(err)
      })
    },
    getReservations() {
      ReservationService.getAll({ isbn: this.book.isbn, isActive: true }).then(response => {
        this.reservations = response.data
      }).catch(err => {
        alert('Erro ao listar reservas')
        console.log(err)
      })
    },
    postReservation() {
      this.reservation.bookIsbn = this.book.isbn
      this.reservation.reservedDate = new Date().toISOString()
      ReservationService.postReservation(this.reservation).then(response => {
        console.log(response)
        this.resetReservation()
        this.getBook(this.isbn)
        this.closeModal('reservationModal')
        alert('Reserva cadastrada com sucesso!')
      }).catch(err => {
        alert('Erro ao cadastrar')
        console.log(err)
      })
    },
    postLoan() {
      this.loan.bookIsbn = this.book.isbn
      this.loan.withdrawalDate = new Date().toISOString()
      LoanService.postLoan(this.loan).then(response => {
        console.log(response)
        this.resetReservation()
        this.resetLoan()
        this.getBook(this.isbn)
        this.closeModal('loanModal')
        alert('Empréstimo cadastrado com sucesso!')
      }).catch(err => {
        alert('Erro ao cadastrar')
        console.log(err)
      })
    },
  },
  mounted() {
    this.getBook(this.isbn)
    this.resetReservation()
    this.resetLoan()
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

.operationsView {
  max-height: 350px;
  overflow-y: auto;

  font-size: 10pt;

  border-width: 1px;
}

.operationsView .registry {
  cursor: pointer;
}

.operationsView .registry:hover {
	background-color: rgba(219, 219, 219, 0.616);
}

.operationsView hr {
  background-color: rgb(81, 38, 200);
}
</style>
