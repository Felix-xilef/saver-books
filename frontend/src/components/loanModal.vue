p<template>
  <!-- Loan Modal -->
  <div
    class="modal fade"
    id="loanModal"
    tabindex="-1"
    aria-labelledby="loanModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <form class="modal-content" @submit.prevent="submit">
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
                <label class="form-label" for="txtLoanName">
                  Nome
                </label>
                <input
                  class="form-control"
                  :class="{ 'is-valid': controlIsValid('name'), 'is-invalid': controlHasError('name') }"
                  type="name"
                  name="txtLoanName"
                  id="txtLoanName"
                  v-model="loan.name"
                  placeholder="digite seu nome"
                />
                <div class="invalid-feedback">
                  O nome é obrigatório
                </div>
              </div>

              <div class="col">
                <label class="form-label" for="txtLoanEmail">
                  E-mail
                </label>
                <input
                  class="form-control"
                  :class="{ 'is-valid': controlIsValid('email'), 'is-invalid': controlHasError('email') }"
                  type="email"
                  name="txtLoanEmail"
                  id="txtLoanEmail"
                  v-model="loan.email"
                  placeholder="digite um e-mail válido"
                />
                <div class="invalid-feedback">
                  <span v-if="loan.email == ''">
                    O e-mail é obrigatório
                  </span>
                  <span v-else>
                    E-mail inválido
                  </span>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col">
                <label class="form-label" for="txtLoanCpf">
                  CPF
                </label>
                <input
                  class="form-control"
                  :class="{ 'is-valid': controlIsValid('cpf'), 'is-invalid': controlHasError('cpf') }"
                  type="text"
                  name="txtLoanCpf"
                  id="txtLoanCpf"
                  v-model="loan.cpf"
                  placeholder="digite seu CPF"
                />
                <div class="invalid-feedback">
                  <span v-if="loan.cpf == ''">
                    O CPF é obrigatório
                  </span>
                  <span v-else>
                    CPF inválido
                  </span>
                </div>
              </div>

              <div class="col">
                <label class="form-label" for="txtLoanPhone">
                  Telefone
                </label>
                <input
                  class="form-control"
                  :class="{ 'is-valid': controlIsValid('phone'), 'is-invalid': controlHasError('phone') }"
                  type="tel"
                  name="txtLoanPhone"
                  id="txtLoanPhone"
                  v-model="loan.phone"
                  placeholder="digite um telefone válido"
                />
                <div class="invalid-feedback">
                  O Telefone é obrigatório
                </div>
              </div>

              <div class="col">
                <label class="form-label" for="txtLoanWithdrawal">
                  Data da Devolução
                </label>
                <input
                  class="form-control"
                  :class="{ 'is-valid': controlIsValid('returnDate'), 'is-invalid': controlHasError('returnDate') }"
                  type="date"
                  name="txtLoanWithdrawal"
                  id="txtLoanWithdrawal"
                  v-model="loan.returnDate"
                  :min="today.toISOString().slice(0, 10)"
                />
                <div class="invalid-feedback">
                  <span v-if="loan.returnDate == ''">
                    A data de devolução é obrigatória
                  </span>
                  <span v-else>
                    A data de devolução deve ser a partir de hoje
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <div class="d-flex
          ">
            <button
              type="button"
              class="btn text-white outlinedOnHover backgroundGradientGreen"
              data-bs-target="#reservationsModal"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              @click="getReservations"
            >
              <span><p>Visualizar Reservas</p></span>
            </button>

            <button
              v-if="book.availCopies > 0 || loan.reservationId"
              type="submit"
              class="btn text-white ms-2 outlinedOnHover"
              :class="{ 'backgroundGradientBlue': loanIsValid, 'backgroundGradientDisabled': !loanIsValid }"
              :disabled="!loanIsValid"
            >
              <span><p>Finalizar Empréstimo</p></span>
            </button>
          </div>
          <button type="button" class="btn p-0" @click="resetLoan">
            <img src="../shared/assets/clean.svg" alt="" />
          </button>
        </div>
      </form>
    </div>
  </div>
  <!-- Loan Modal End -->

  <!-- Search Reservation Modal -->
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
              <div
                class="p-3 registry"
                data-bs-target="#loanModal"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                @click="selectReservation(item)"
              >
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
  <!-- Search Reservation Modal End -->
</template>

<script>
import LoanService from '../shared/services/LoanService';
import ReservationService from '../shared/services/ReservationService';
import { Modal } from 'bootstrap';
import vuelidate from '@vuelidate/core';
import { required, email, sameAs } from '@vuelidate/validators';
import cpfValidator from '../shared/validators/cpfValidator';
import minDateValidator from '../shared/validators/minDateValidator';
export default {
  setup() {
    return { v$: vuelidate() }
  },
  name: 'LoanModal',
  props: [
    'book',
  ],
  emits: [
    'success',
    'error',
  ],
  data() {
    return {
      loan: {
        cpf: '',
        name: '',
        phone: '',
        email: '',
        bookIsbn: '',
        withdrawalDate: new Date().toISOString(),
        returnDate: '',
        loanStatus: {
          id: 1,
        },
        reservationId: null,
      },
			reservations: [],
      today: new Date(),
    }
  },
  validations() {
    return {
      loan: {
        cpf: { required, cpfValidator, $autoDirty: true },
        name: { required, $autoDirty: true },
        phone: { required, $autoDirty: true },
        email: { required, email, $autoDirty: true },
        bookIsbn: { required },
        withdrawalDate: { required },
        returnDate: {
          required,
          minDateValidator: minDateValidator(this.today.toISOString().slice(0, 10)),
          $autoDirty: true
        },
        loanStatus: {
          id: { required, sameAs: sameAs(1) }
        },
      },
    }
  },
  computed: {
    loanIsValid() {
      return !this.v$.loan.$invalid;
    },
    modal() {
      return new Modal(document.getElementById('loanModal'));
    },
  },
  methods: {
		success(message) {
      this.$emit('success', message);
		},
		error(message) {
      this.$emit('error', message);
		},
    resetLoan() {
      this.today = new Date();

      this.loan.cpf = '';
      this.loan.name = '';
      this.loan.phone = '';
      this.loan.email = '';
      this.loan.withdrawalDate = this.today.toISOString();
      this.loan.returnDate = '';
      this.loan.reservationId = null;

      this.v$.loan.$reset();
    },
    controlIsValid(attributeName) {
      return !this.v$.loan[attributeName].$invalid && this.v$.loan[attributeName].$dirty;
    },
    controlHasError(attributeName) {
      return this.v$.loan[attributeName].$error;
    },
    selectReservation(reservation) {
      this.loan.reservationId = reservation.id;
      this.loan.cpf = reservation.cpf;
      this.loan.name = reservation.name;
      this.loan.phone = reservation.phone;
      this.loan.email = reservation.email;
    },
    getReservations() {
      ReservationService.getAll({ isbn: this.book.isbn, isActive: true }).then(response => {
        this.reservations = response.data;

      }).catch(err => {
				this.error('Erro ao listar reservas: ' + err);
      })
    },
    submit() {
      if (this.loanIsValid) this.postLoan();
    },
    postLoan() {
      LoanService.postLoan(this.loan).then(() => {
        this.resetLoan();

				this.success('Empréstimo cadastrado com sucesso!');

      }).catch(err => {
				this.error('Erro ao cadastrar Empréstimo: ' + err);
      });
    },
  },
  watch: {
    book(newBook) {
      this.loan.bookIsbn = newBook.isbn;
    },
  },
  mounted() {
    this.loan.bookIsbn = this.book.isbn;
  },
}
</script>

<style scoped>
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
