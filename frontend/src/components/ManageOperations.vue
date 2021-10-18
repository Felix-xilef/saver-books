<template>
  <form class="container p-3" @submit.prevent="submit">
    <div class="row">
      <div class="row">
        <div class="col-3">
          <book-cover :fileName="registry.book?.cover" size="large"/>
        </div>

        <div class="col">
          <div class="row mt-2">
            <div class="col-2">
              <label class="form-label" for="txtId">ID</label>
              <input
                class="form-control numberInput"
                type="number"
                name="txtId"
                id="txtId"
                :value="registry.id"
                placeholder="0"
                disabled
              />
            </div>

            <div class="col-3">
              <label class="form-label" for="txtCpf">CPF</label>
              <input
                class="form-control"
                :class="{ 'is-valid': controlIsValid('client', 'cpf'), 'is-invalid': controlHasError('client', 'cpf') }"
                type="text"
                name="txtCpf"
                id="txtCpf"
                v-model="registry.client.cpf"
                placeholder="CPF do ator"
              />
              <div class="invalid-feedback">
                <span v-if="registry.client.cpf == ''">
                  O CPF é obrigatório
                </span>
                <span v-else>
                  CPF inválido
                </span>
              </div>
            </div>

            <div class="col">
              <label class="form-label" for="txtNome">Nome</label>
              <input
                class="form-control"
                :class="{ 'is-valid': controlIsValid('client', 'name'), 'is-invalid': controlHasError('client', 'name') }"
                type="name"
                name="txtNome"
                id="txtNome"
                v-model="registry.client.name"
                placeholder="nome do ator"
                :disabled="registry.id == ''"
              />
              <div class="invalid-feedback">
                O nome é obrigatório
              </div>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-3">
              <label class="form-label" for="txtPhone">Telefone</label>
              <input
                class="form-control"
                :class="{ 'is-valid': controlIsValid('client', 'phone'), 'is-invalid': controlHasError('client', 'phone') }"
                type="tel"
                name="txtPhone"
                id="txtPhone"
                v-model="registry.client.phone"
                placeholder="telefone do ator"
                :disabled="registry.id == ''"
              />
              <div class="invalid-feedback">
                O telefone é obrigatório
              </div>
            </div>

            <div class="col">
              <label class="form-label" for="txtEmail">E-mail</label>
              <input
                class="form-control"
                :class="{ 'is-valid': controlIsValid('client', 'email'), 'is-invalid': controlHasError('client', 'email') }"
                type="email"
                name="txtEmail"
                id="txtEmail"
                v-model="registry.client.email"
                placeholder="e-mail do ator"
                :disabled="registry.id == ''"
              />
              <div class="invalid-feedback">
                <span v-if="registry.client.email == ''">
                  O e-mail é obrigatório
                </span>
                <span v-else>
                  E-mail inválido
                </span>
              </div>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-4">
              <label class="form-label" for="txtIsbn">ISBN</label>
              <input
                class="form-control"
                :class="{ 'is-valid': controlIsValid('bookIsbn'), 'is-invalid': controlHasError('bookIsbn') }"
                type="text"
                name="txtIsbn"
                id="txtIsbn"
                v-model="registry.bookIsbn"
                placeholder="ISBN do livro"
              />
              <div class="invalid-feedback">
                O ISBN é obrigatório
              </div>
            </div>

            <div class="col">
              <label class="form-label" for="txtTitle">Título</label>
              <input
                class="form-control"
                type="text"
                name="txtTitle"
                id="txtTitle"
                :value="registry.book?.title"
                placeholder="Título do livro"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col">
          <label class="form-label" for="txtFirstDate">
            {{ isReservation ? "Data da Reserva" : "Data da Retirada" }}
          </label>
          <input
            class="form-control"
            type="date"
            name="txtFirstDate"
            id="txtFirstDate"
            :value="isReservation ? registry.reservedDate?.slice(0, 10) : registry.withdrawalDate?.slice(0, 10)"
            disabled
          />
        </div>

        <div class="col">
          <label class="form-label" for="txtSecondDate">
            {{ isReservation ? "Data da Retirada" : "Data da Devolução" }}
          </label>
          <input
            class="form-control"
            :class="isReservation ? {
              'is-valid': controlIsValid('withdrawalDate'),
              'is-invalid': controlHasError('withdrawalDate')
            } : {
              'is-valid': controlIsValid('returnDate'),
              'is-invalid': controlHasError('returnDate')
            }"
            type="date"
            name="txtSecondDate"
            id="txtSecondDate"
            v-model="registrySecondDate"
            :disabled="registry.id == ''"
          />
          <div class="invalid-feedback">
            <span v-if="isReservation">
              A data de retirada é obrigatória
            </span>
            <span v-else>
              A data de devolução é obrigatória
            </span>
          </div>
        </div>

        <div class="col">
          <label class="form-label" for="selectStatus"> Situação </label>
          <select
            v-model="registryStatus.id"
            class="form-select"
            :class="isReservation ? {
              'is-valid': controlIsValid('reservationStatus'),
              'is-invalid': controlHasError('reservationStatus')
            } : {
              'is-valid': controlIsValid('loanStatus'),
              'is-invalid': controlHasError('loanStatus')
            }"
            name="selectStatus"
            id="selectStatus"
            :disabled="registry.id == ''"
          >
            <option
              v-for="status in statusOptions"
              :key="status.id"
              :value="status.id"
            >
              {{ status?.description }}
            </option>
          </select>
          <div class="invalid-feedback">
            <span v-if="isReservation">
              A situação da reserva é obrigatória
            </span>
            <span v-else>
              A situação do empréstimo é obrigatória
            </span>
          </div>
        </div>

        <div class="col">
          <label class="form-label" for="txtGenre">Gênero</label>
          <input
            class="form-control"
            type="text"
            name="txtGenre"
            id="txtGenre"
            :value="registry.book?.genre?.description"
            placeholder="Gênero do livro"
            disabled
          />
        </div>
      </div>
    </div>

    <div class="row p-5">
      <div class="borderPurple rounded operationsView">
        <div v-for="item in registries" :key="item.id">
          <div class="row m-1 p-2 registry" @click="selectRegistry(item)">            
            <div class="col-auto">
              <book-cover :fileName="item.book?.cover" size="extra-small"/>
            </div>

            <div class="col">
              <div class="d-flex flex-column justify-content-around">
                <div>
                  <strong>ISBN:</strong>

                  {{ item.book?.isbn }}
                </div>

                <div>
                  <strong>CPF:</strong>

                  {{ item.client?.cpf }}
                </div>
              </div>
            </div>

            <div class="col">
              <div class="d-flex flex-column justify-content-around">
                <div>
                  <strong>
                    {{ isReservation ? "Data da Reserva:" : "Data da Retirada:" }}
                  </strong>
                  
                  {{ isReservation ? item.reservedDate?.slice(0, 10).split('-').reverse().join('/') : item.withdrawalDate?.slice(0, 10).split('-').reverse().join('/') }}
                </div>

                <div>
                  <strong>
                    {{ isReservation ? "Data da Retirada:" : "Data da Devolução:" }}
                  </strong>
                  
                  {{ isReservation ? item.withdrawalDate?.slice(0, 10).split('-').reverse().join('/') : item.returnDate?.slice(0, 10).split('-').reverse().join('/') }}
                </div>
              </div>
            </div>

            <div class="col-auto">
              <div class="d-flex flex-column justify-content-center">
                <strong>
                  {{
                    isReservation
                      ? item.reservationStatus?.description
                      : item.loanStatus?.description
                  }}
                </strong>
              </div>
            </div>
          </div>

          <hr/>
        </div>
      </div>
    </div>

    <div class="position-fixed">
      <button
        v-if="registry.id != ''"
        class="btn p-0 m-2"
        :class="{ 'disabled': !registryIsValid }"
        type="submit"
        :disabled="!registryIsValid"
      >
        <img height="40" src="../shared/assets/saveButton.svg" alt="" />
      </button>

      <button
        class="btn p-0 m-2"
        :class="{ 'disabled': !controlIsValid('client', 'cpf') && !controlIsValid('bookIsbn') }"
        type="button"
        @click="getRegistries"
        :disabled="controlHasError('client', 'cpf') && controlHasError('bookIsbn')"
      >
        <img height="40" src="../shared/assets/searchButton.svg" alt="" />
      </button>
    </div>
  </form>

  <alert :logMessage="log.message" :error="log.error" :success="log.success" />
</template>

<script>
import Alert from '../shared/components/Alert.vue';
import LoanService from '../shared/services/LoanService';
import ReservationService from '../shared/services/ReservationService';
import SubTypesService from "../shared/services/SubTypesService";
import vuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import cpfValidator from '../shared/validators/cpfValidator';
import BookCover from '../shared/components/BookCover.vue';
export default {
  setup() {
    return { v$: vuelidate() }
  },
  components: { Alert, BookCover },
  name: "ManageOperations",
  props: {
    operationName: {
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
      registry: {
        id: "",
        client: {
          cpf: "",
          name: "",
          phone: "",
          email: "",
          blockStart: null,
          blockEnd: null,
        },
        bookIsbn: "",
        reservedDate: "",
        withdrawalDate: "",
        returnDate: "",
        reservationStatus: {
          id: 1,
          description: "",
        },
        loanStatus: {
          id: 1,
          description: "",
        },
        book: '',
      },
      registries: [],
      statusOptions: [],
    };
  },
  validations() {
    return {
      registry: {
        id: { required, $autoDirty: true },
        client: {
          cpf: { required, cpfValidator, $autoDirty: true },
          name: { required, $autoDirty: true },
          phone: { required, $autoDirty: true },
          email: { required, email, $autoDirty: true },
        },
        bookIsbn: { required, $autoDirty: true },
        reservedDate: this.isReservation ? { required, $autoDirty: true } : {},
        withdrawalDate: { required, $autoDirty: true },
        returnDate: this.isReservation ? {} : { required, $autoDirty: true },
        reservationStatus: this.isReservation ? {
          id: { required, $autoDirty: true }
        } : {},
        loanStatus: this.isReservation ? {} : {
          id: { required, $autoDirty: true }
        },
      },
    }
  },
  computed: {
    isReservation() {
      return this.operationName == "reservation";
    },
    registryIsValid() {
      return !this.v$.registry.$invalid;
    },
    registrySecondDate: {
      get() {
        return this.isReservation ? this.registry.withdrawalDate?.slice(0, 10) : this.registry.returnDate?.slice(0, 10)
      },
      set(newValue) {
        if (this.isReservation) {
          this.registry.withdrawalDate = newValue
        } else {
          this.registry.returnDate = newValue
        }
      },
    },
    registryStatus: {
      get() {
        return this.isReservation ? this.registry.reservationStatus : this.registry.loanStatus
      },
      set(newValue) {
        if (this.isReservation) {
          this.registry.reservationStatus = newValue
        } else {
          this.registry.loanStatus = newValue
        }
      },
    },
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
    controlIsValid(attributeName, subAttributeName) {
      if (!subAttributeName) {
        return !this.v$.registry[attributeName].$invalid && this.v$.registry[attributeName].$dirty;

      } else {
        return !this.v$.registry[attributeName][subAttributeName].$invalid && this.v$.registry[attributeName][subAttributeName].$dirty;
      }
    },
    controlHasError(attributeName, subAttributeName) {
      if (!subAttributeName) return this.v$.registry[attributeName].$error;

      else return this.v$.registry[attributeName][subAttributeName].$error;
    },
    getStatus() {
      if (this.isReservation) {
        SubTypesService.getReservationStatus().then((response) => {
          this.statusOptions = response.data;

        }).catch(err => {
          if (!err || !err.response || err.response.status != 404) {
            this.error('Erro ao listar as Situações da reserva: ' + err);
          }
        });

      } else {
        SubTypesService.getLoanStatus().then((response) => {
          this.statusOptions = response.data;

        }).catch(err => {
          if (!err || !err.response || err.response.status != 404) {
            this.error('Erro ao listar as Situações do empréstimo: ' + err);
          }
        });
      }
    },
    getRegistries() {
      let param = {}

      if (this.registry.client.cpf != '') param = { cpf: this.registry.client.cpf };
      else if (this.registry.bookIsbn != '') param = { isbn: this.registry.bookIsbn };

      if (this.isReservation) {
        ReservationService.getAll(param).then(response => {
          this.registries = response.data;

        }).catch(err => {
          if (err && err.response && err.response.status != 404) this.handle404Error();
          else this.error('Erro ao listar as Reservas: ' + err);

          this.registries = [];
        });

      } else {
        LoanService.getAll(param).then(response => {
          this.registries = response.data;

        }).catch(err => {
          if (err && err.response && err.response.status != 404) this.handle404Error();
          else this.error('Erro ao listar os Empréstimos: ' + err);

          this.registries = [];
        });
      }
    },
    handle404Error() {
      if (this.registry.bookIsbn) this.error(`Livro de ISBN: ${this.registry.bookIsbn} não encontrado`);
      else this.error(`Cliente de CPF: ${this.registry.client.cpf} não encontrado`);
    },
    submit() {
      if (this.registryIsValid) this.saveRegistry();
    },
    saveRegistry() {
      if (this.isReservation) {
        this.saveReservation(this.registry);

      } else {
        this.saveLoan(this.registry);
      }
    },
    saveReservation(reservation) {
      ReservationService.updateReservation(reservation).then(() => {
        this.success('Reserva atualizada com sucesso!');
        
      }).catch(err => {
        this.error('Erro ao atualizar a reserva: ' + err);
      });
    },
    saveLoan(loan) {
      LoanService.updateLoan(loan).then(() => {
        this.success('Empréstimo atualizado com sucesso!');

      }).catch(err => {
        this.error('Erro ao atualizar empréstimo: ' + err);
      });
    },
    selectRegistry(newRegistry) {
      this.registry = newRegistry
    },
  },
  mounted() {
    this.getStatus();
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

.numberInput {
  max-width: 80px;
}

.operationsView {
  max-height: 350px;
  overflow-y: auto;

  font-size: 10pt;

  border-width: 1px;
}

.operationsView .registry {
  cursor: pointer;
  transition: var(--transition-duration);
}

.operationsView .registry:hover {
  background-color: var(--on-hover-gray);
}

.operationsView .registry .col .d-flex, .operationsView .registry .col-auto .d-flex {
  height: 100%;
}

.operationsView hr {
  background-color: rgb(81, 38, 200);
}

.position-fixed {
  bottom: 0px;
  right: 20px;
}
</style>
