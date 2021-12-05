<template>
  <div
    class="modal fade"
    id="reservationModal"
    tabindex="-1"
    aria-labelledby="reservationModalLabel"
    aria-hidden="true"
    @closed="v$.$reset()"
  >
    <div class="modal-dialog modal-lg">
      <form class="modal-content" @submit.prevent="submit">
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
          <p v-if="!clientIsBlocked">
            Preencha as informações abaixo e clique em finalizar reserva para
            concluir o cadastro da sua reserva.
          </p>
          <p v-else class="alert alert-danger">
            O cliente selecionado está bloqueado pois possui empréstimo(s) em atraso!
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
                  :class="{ 'is-valid': controlIsValid('client', 'name'), 'is-invalid': controlHasError('client', 'name') }"
                  type="name"
                  name="txtReservationName"
                  id="txtReservationName"
                  v-model="reservation.client.name"
                  placeholder="digite seu nome"
                />
                <div class="invalid-feedback">
                  O nome é obrigatório
                </div>
              </div>

              <div class="col">
                <label class="form-label" for="txtReservationEmail">
                  E-mail
                </label>
                <input
                  class="form-control"
                  :class="{ 'is-valid': controlIsValid('client', 'email'), 'is-invalid': controlHasError('client', 'email') }"
                  type="email"
                  name="txtReservationEmail"
                  id="txtReservationEmail"
                  v-model="reservation.client.email"
                  placeholder="digite um e-mail válido"
                />
                <div class="invalid-feedback">
                  <span v-if="reservation.client.email == ''">
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
                <label class="form-label" for="txtReservationCpf">
                  CPF
                </label>
                <input
                  class="form-control"
                  :class="{ 'is-valid': controlIsValid('client', 'cpf'), 'is-invalid': controlHasError('client', 'cpf') }"
                  type="text"
                  name="txtReservationCpf"
                  id="txtReservationCpf"
                  v-model="reservation.client.cpf"
                  placeholder="digite seu CPF"
                  @change="getUser"
                />
                <div class="invalid-feedback">
                  <span v-if="reservation.client.cpf == ''">
                    O CPF é obrigatório
                  </span>
                  <span v-else>
                    CPF inválido
                  </span>
                </div>
              </div>

              <div class="col">
                <label class="form-label" for="txtReservationPhone">
                  Telefone
                </label>
                <input
                  class="form-control"
                  :class="{ 'is-valid': controlIsValid('client', 'phone'), 'is-invalid': controlHasError('client', 'phone') }"
                  type="tel"
                  name="txtReservationPhone"
                  id="txtReservationPhone"
                  v-model="reservation.client.phone"
                  placeholder="digite um telefone válido"
                />
                <div class="invalid-feedback">
                  O Telefone é obrigatório
                </div>
              </div>
              
              <div class="col">
                <label class="form-label" for="txtReservationWithdrawal">
                  Data da Retirada
                </label>
                <input
                  class="form-control"
                  :class="{ 'is-valid': controlIsValid('withdrawalDate'), 'is-invalid': controlHasError('withdrawalDate') }"
                  type="date"
                  name="txtReservationWithdrawal"
                  id="txtReservationWithdrawal"
                  v-model="reservation.withdrawalDate"
                  :min="(new Date()).toISOString().slice(0, 10)"
                />
                <div class="invalid-feedback">
                  <span v-if="reservation.withdrawalDate == ''">
                    A data de retirada é obrigatória
                  </span>
                  <span v-else>
                    A data de retirada deve ser a partir de hoje
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="submit"
            class="btn text-white outlinedOnHover"
            :class="{ 'backgroundGradientBlue': reservationIsValid && !clientIsBlocked, 'backgroundGradientDisabled': !reservationIsValid || clientIsBlocked }"
            :disabled="!reservationIsValid || clientIsBlocked"
          >
            <p>Finalizar Reserva</p>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
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
  name: 'ReservationModal',
  props: [
    'book',
  ],
  emits: [
    'success',
    'error',
  ],
  data() {
    return {
      reservation: {
        client: {
          cpf: '',
          name: '',
          phone: '',
          email: '',
          blockStart: null,
          blockEnd: null,
        },
        bookIsbn: '',
        reservedDate: new Date().toISOString(),
        withdrawalDate: '',
        reservationStatus: {
          id: 1,
        },
      },
    }
  },
  validations() {
    return {
      reservation: {
        client: {
          cpf: { required, cpfValidator, $autoDirty: true },
          name: { required, $autoDirty: true },
          phone: { required, $autoDirty: true },
          email: { required, email, $autoDirty: true },
        },
        bookIsbn: { required },
        reservedDate: { required, $autoDirty: true },
        withdrawalDate: {
          required,
          minDateValidator: minDateValidator((new Date()).toISOString().slice(0, 10)),
          $autoDirty: true
        },
        reservationStatus: {
          id: { required, sameAs: sameAs(1) }
        },
      },
    }
  },
  computed: {
    modal() {
      return new Modal(document.getElementById('reservationModal'));
    },
    reservationIsValid() {
      return !this.v$.reservation.$invalid;
    },
    clientIsBlocked() {
      return this.reservation.client &&
        this.reservation.client.blockStart &&
        (!this.reservation.client.blockEnd || this.reservation.client.blockEnd > new Date());
    },
  },
  methods: {
		success(message) {
      this.$emit('success', message);
		},
		error(message) {
      this.$emit('error', message);
		},
    resetReservation() {
      this.reservation.client.cpf = '';
      this.reservation.client.name = '';
      this.reservation.client.phone = '';
      this.reservation.client.email = '';
      this.reservation.client.blockStart = null;
      this.reservation.client.blockEnd = null;
      this.reservation.reservedDate = (new Date()).toISOString();
      this.reservation.withdrawalDate = '';

      this.v$.$reset();
    },
    getControl(attributeName, subAttributeName) {
      let control = this.v$.reservation[attributeName];

      return !subAttributeName ? control : control[subAttributeName];
    },
    controlIsValid(attributeName, subAttributeName) {
      let control = this.getControl(attributeName, subAttributeName);

      return !control.$invalid && control.$dirty;
    },
    controlHasError(attributeName, subAttributeName) {
      return this.getControl(attributeName, subAttributeName).$error;
    },
    getUser() {
      if (this.controlIsValid('client', 'cpf')) {
        ClientService.getByCpf(this.reservation.client.cpf).then(response => {
          if (response.data) this.reservation.client = response.data;
          else {
            this.reservation.client.blockStart = null;
            this.reservation.client.blockEnd = null;
          }

        }).catch(err => {
          if (!err || !err.response || err.response.status != 404) {
            this.error('Erro ao recuperar cliente: ' + err);

          } else {
            this.reservation.client.blockStart = null;
            this.reservation.client.blockEnd = null;
          }
        });
      }
    },
    submit() {
      if (this.reservationIsValid && !this.clientIsBlocked) this.postReservation();
    },
    postReservation() {
      ClientService.postClient(this.reservation.client).then(() => {
        ReservationService.postReservation(this.reservation).then(() => {
          this.resetReservation();

          this.success('Reserva cadastrada com sucesso!');

        }).catch(err => this.error('Erro ao cadastrar Reserva: ' + err));

      }).catch(err => this.error('Erro ao salvar Cliente: ' + err));
    },
  },
  watch: {
    book(newBook) {
      this.reservation.bookIsbn = newBook.isbn;
    },
  },
  mounted() {
    this.reservation.bookIsbn = this.book.isbn;
  },
}
</script>

<style scoped>
</style>
