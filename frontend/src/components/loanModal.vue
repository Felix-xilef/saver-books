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
          <p v-if="!clientIsBlocked">
            Preencha as informações abaixo e clique em finalizar empréstimo para
            concluir o cadastro do empréstimo. Ou selecione a opção visualizar
            reservas para reslizar um empréstimo a partir de uma reserva já
            existente.
          </p>
          <p v-else class="alert alert-danger">
            O cliente selecionado está bloqueado pois possui empréstimo(s) em atraso!
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
                  :class="{ 'is-valid': controlIsValid('client', 'name'), 'is-invalid': controlHasError('client', 'name') }"
                  type="name"
                  name="txtLoanName"
                  id="txtLoanName"
                  v-model="loan.client.name"
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
                  :class="{ 'is-valid': controlIsValid('client', 'email'), 'is-invalid': controlHasError('client', 'email') }"
                  type="email"
                  name="txtLoanEmail"
                  id="txtLoanEmail"
                  v-model="loan.client.email"
                  placeholder="digite um e-mail válido"
                />
                <div class="invalid-feedback">
                  <span v-if="loan.client.email == ''">
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
                  :class="{ 'is-valid': controlIsValid('client', 'cpf'), 'is-invalid': controlHasError('client', 'cpf') }"
                  type="text"
                  name="txtLoanCpf"
                  id="txtLoanCpf"
                  v-model="loan.client.cpf"
                  placeholder="digite seu CPF"
                  @change="getUser"
                />
                <div class="invalid-feedback">
                  <span v-if="loan.client.cpf == ''">
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
                  :class="{ 'is-valid': controlIsValid('client', 'phone'), 'is-invalid': controlHasError('client', 'phone') }"
                  type="tel"
                  name="txtLoanPhone"
                  id="txtLoanPhone"
                  v-model="loan.client.phone"
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
              <p>Visualizar Reservas</p>
            </button>

            <button
              v-if="book.availCopies > 0 || loan.reservationId"
              type="submit"
              class="btn text-white ms-2 outlinedOnHover"
              :class="{ 'backgroundGradientBlue': loanIsValid, 'backgroundGradientDisabled': !loanIsValid }"
              :disabled="!loanIsValid || clientIsBlocked"
            >
              <p>Finalizar Empréstimo</p>
            </button>
          </div>
          <button type="button" class="btn p-0" @click="resetLoan">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0)">
              <path d="M34.8552 0.111316C34.3309 -0.148207 33.7006 0.0618867 33.4389 0.581988L23.8118 19.8532L21.9261 18.9087C20.3647 18.127 18.4613 18.7635 17.6795 20.3208L17.2075 21.2634L28.5248 26.9317L28.9968 25.9887C29.7764 24.4318 29.1534 22.5307 27.5847 21.7432L25.6987 20.7985L35.3259 1.52748C35.5864 1.00632 35.3753 0.372879 34.8552 0.111316Z" fill="black" fill-opacity="0.26"/>
              <path d="M12.1641 36.0001C12.7466 36.0001 13.2188 35.5279 13.2188 34.9454C13.2188 34.3629 12.7466 33.8907 12.1641 33.8907C11.5816 33.8907 11.1094 34.3629 11.1094 34.9454C11.1094 35.5279 11.5816 36.0001 12.1641 36.0001Z" fill="black" fill-opacity="0.26"/>
              <path d="M1.61719 29.672C2.19968 29.672 2.67188 29.1998 2.67188 28.6173C2.67188 28.0348 2.19968 27.5626 1.61719 27.5626C1.0347 27.5626 0.5625 28.0348 0.5625 28.6173C0.5625 29.1998 1.0347 29.672 1.61719 29.672Z" fill="black" fill-opacity="0.26"/>
              <path d="M5.83594 31.7814C6.41843 31.7814 6.89062 31.3092 6.89062 30.7267C6.89062 30.1442 6.41843 29.672 5.83594 29.672C5.25345 29.672 4.78125 30.1442 4.78125 30.7267C4.78125 31.3092 5.25345 31.7814 5.83594 31.7814Z" fill="black" fill-opacity="0.26"/>
              <path d="M7.94531 33.8907H3.72656C3.14466 33.8907 2.67188 33.418 2.67188 32.8361C2.67188 32.2531 2.20015 31.7814 1.61719 31.7814C1.03423 31.7814 0.5625 32.2531 0.5625 32.8361C0.5625 34.5808 1.98183 36.0001 3.72656 36.0001H7.94531C8.52827 36.0001 9 35.5284 9 34.9454C9 34.3625 8.52827 33.8907 7.94531 33.8907Z" fill="black" fill-opacity="0.26"/>
              <path d="M7.63834 27.2864C7.17688 27.3441 6.80816 27.6974 6.7299 28.1547C6.65164 28.6131 6.88128 29.0683 7.29641 29.2763L12.3361 31.7998C13.2456 32.2551 14.2507 32.4363 15.2313 32.3323C15.1159 32.7998 15.3353 33.3014 15.7834 33.527L20.4986 35.8887C20.8949 36.0842 21.3543 36.0153 21.6718 35.7343C21.8368 35.5872 25.429 32.3553 27.5288 28.7931L16.166 23.1021C13.6201 26.4847 7.70296 27.2779 7.63834 27.2864Z" fill="black" fill-opacity="0.26"/>
              </g>
              <defs>
              <clipPath id="clip0">
              <rect width="36" height="36" fill="white"/>
              </clipPath>
              </defs>
            </svg>
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
                      {{ item.client.cpf }}
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
import ClientService from '../shared/services/ClientService';
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
        client: {
          cpf: '',
          name: '',
          phone: '',
          email: '',
          blockStart: null,
          blockEnd: null,
        },
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
        client: {
          cpf: { required, cpfValidator, $autoDirty: true },
          name: { required, $autoDirty: true },
          phone: { required, $autoDirty: true },
          email: { required, email, $autoDirty: true },
        },
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
    clientIsBlocked() {
      return this.loan.client && this.loan.client.blockStart && (!this.loan.client.blockEnd || this.loan.client.blockEnd > new Date());
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

      this.loan.client.cpf = '';
      this.loan.client.name = '';
      this.loan.client.phone = '';
      this.loan.client.email = '';
      this.loan.client.blockStart = null;
      this.loan.client.blockEnd = null;
      this.loan.withdrawalDate = this.today.toISOString();
      this.loan.returnDate = '';
      this.loan.reservationId = null;

      this.v$.loan.$reset();
    },
    controlIsValid(attributeName, subAttributeName) {
      if (!subAttributeName) {
        return !this.v$.loan[attributeName].$invalid && this.v$.loan[attributeName].$dirty;

      } else {
        return !this.v$.loan[attributeName][subAttributeName].$invalid && this.v$.loan[attributeName][subAttributeName].$dirty;
      }
    },
    controlHasError(attributeName, subAttributeName) {
      if (!subAttributeName) {
        return this.v$.loan[attributeName].$error;

      } else {
        return this.v$.loan[attributeName][subAttributeName].$error;
      }
    },
    getUser() {
      if (this.controlIsValid('client', 'cpf')) {
        ClientService.getByCpf(this.loan.client.cpf).then(response => {
          if (response.data) this.loan.client = response.data;

        }).catch(err => this.error('Erro ao recuperar cliente: ' + err));
      }
    },
    selectReservation(reservation) {
      this.loan.reservationId = reservation.id;
      this.loan.client = reservation.client;
    },
    getReservations() {
      ReservationService.getAll({ isbn: this.book.isbn, isActive: true }).then(response => {
        this.reservations = response.data;

      }).catch(err => {
				this.error('Erro ao listar reservas: ' + err);
      })
    },
    submit() {
      if (this.loanIsValid && !this.clientIsBlocked) this.postLoan();
    },
    postLoan() {
      ClientService.postClient(this.loan.client).then(() => {
        LoanService.postLoan(this.loan).then(() => {
          this.resetLoan();

          this.success('Empréstimo cadastrado com sucesso!');

        }).catch(err => this.error('Erro ao cadastrar Empréstimo: ' + err));
        
      }).catch(err => this.error('Erro ao salvar Cliente: ' + err));
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
	background-color: var(--on-hover-gray);
}

.operationsView hr {
  background-color: rgb(81, 38, 200);
}

svg:hover path {
  fill-opacity: 0.5;
}
</style>
