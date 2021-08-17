<template>
  <div
    class="modal fade"
    id="reservationModal"
    tabindex="-1"
    aria-labelledby="reservationModalLabel"
    aria-hidden="true"
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
                  :class="{ 'is-valid': controlIsValid('name'), 'is-invalid': controlHasError('name') }"
                  type="name"
                  name="txtReservationName"
                  id="txtReservationName"
                  v-model="reservation.name"
                  placeholder="digite seu nome"
                  @blur="v$.reservation.name.$touch"
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
                  :class="{ 'is-valid': controlIsValid('email'), 'is-invalid': controlHasError('email') }"
                  type="email"
                  name="txtReservationEmail"
                  id="txtReservationEmail"
                  v-model="reservation.email"
                  placeholder="digite um e-mail válido"
                  @blur="v$.reservation.email.$touch"
                />
                <div class="invalid-feedback">
                  <span v-if="reservation.email == ''">
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
                  :class="{ 'is-valid': controlIsValid('cpf'), 'is-invalid': controlHasError('cpf') }"
                  type="text"
                  name="txtReservationCpf"
                  id="txtReservationCpf"
                  v-model="reservation.cpf"
                  placeholder="digite seu CPF"
                  @blur="v$.reservation.cpf.$touch"
                />
                <div class="invalid-feedback">
                  <span v-if="reservation.cpf == ''">
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
                  :class="{ 'is-valid': controlIsValid('phone'), 'is-invalid': controlHasError('phone') }"
                  type="tel"
                  name="txtReservationPhone"
                  id="txtReservationPhone"
                  v-model="reservation.phone"
                  placeholder="digite um telefone válido"
                  @blur="v$.reservation.phone.$touch"
                />
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
                  @blur="v$.reservation.withdrawalDate.$touch"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="submit"
            class="btn text-white"
            :class="{ 'backgroundGradientBlue': reservationIsValid, 'backgroundGradientDisabled': !reservationIsValid }"
            :disabled="!reservationIsValid"
          >
            Finalizar Reserva
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ReservationService from '../shared/services/ReservationService';
import { Modal } from 'bootstrap';
import vuelidate from '@vuelidate/core';
import { required, email, sameAs, minValue } from '@vuelidate/validators';
import cpfValidator from '../shared/validators/cpfValidator';
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
      },
    }
  },
  validations() {
    return {
      reservation: {
        cpf: { required, cpfValidator },
        name: { required },
        phone: { required },
        email: { required, email },
        bookIsbn: { required },
        reservedDate: { required },
        withdrawalDate: {
          required,
          minValue: minValue(new Date()),
        },
        reservationStatus: {
          id: {
            required,
            sameAs: sameAs(1),
          }
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
  },
  methods: {
		success(message) {
      this.$emit('success', message);
		},
		error(message) {
      this.$emit('error', message);
		},
    resetReservation() {
      this.reservation.cpf = '';
      this.reservation.name = '';
      this.reservation.phone = '';
      this.reservation.email = '';
      this.reservation.bookIsbn = '';
      this.reservation.reservedDate = '';
      this.reservation.withdrawalDate = '';
    },
    controlIsValid(attributeName) {
      return !this.v$.reservation[attributeName].$invalid && this.v$.reservation[attributeName].$dirty;
    },
    controlHasError(attributeName) {
      return this.v$.reservation[attributeName].$error;
    },
    submit() {
      this.reservation.bookIsbn = this.book.isbn;
      this.reservation.reservedDate = new Date().toISOString();

      if (this.reservationIsValid) this.postReservation();
    },
    postReservation() {
      ReservationService.postReservation(this.reservation).then(() => {

        this.resetReservation();
        this.modal.hide();

				this.success('Reserva cadastrada com sucesso!');

      }).catch(err => {
				this.error('Erro ao cadastrar Reserva: ' + err);
      });
    },
  },
}
</script>

<style scoped>
</style>
