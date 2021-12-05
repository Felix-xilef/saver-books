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
                @change="getClient"
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
                @change="getBook"
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
      <div v-if="registries.length > 0" class="borderPurple rounded operationsView">
        <div v-for="(item, index) in registries" :key="item.id">
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

          <hr v-if="(index + 1) < registries.length"/>
        </div>
      </div>
      <div v-else-if="searchParam" class="alert alert-warning text-center">
        <h4 class="m-0">Nenhum resultado encontrado para '{{ searchParam }}'</h4>
      </div>
      <div v-else class="alert alert-info text-center">
        <h4 class="m-0">Digite o CPF do cliente ou o ISBN do livro para realizar uma busca</h4>
      </div>
    </div>

    <div class="position-fixed">
			<button
        v-if="registry.id != ''"
        class="btn p-0 m-2 roundFloat"
        :class="[ registryIsValid ? 'backgroundGradientGreen' : 'backgroundGradientDisabled' ]"
        type="submit"
        :disabled="!registryIsValid"
      >
        <svg width="20" height="20" viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.9687 0H3.28125C1.47197 0 0 1.47197 0 3.28125V24.7188C0 26.528 1.47197 28 3.28125 28H24.7188C26.528 28 28 26.528 28 24.7188V4.03134L23.9687 0ZM6.5625 2.1875H19.1406V8.64062H6.5625V2.1875ZM21.4375 25.8125H6.5625V17.1719H21.4375V25.8125ZM25.8125 24.7188C25.8125 25.3218 25.3218 25.8125 24.7188 25.8125H23.625V14.9844H4.375V25.8125H3.28125C2.67816 25.8125 2.1875 25.3218 2.1875 24.7188V3.28125C2.1875 2.67816 2.67816 2.1875 3.28125 2.1875H4.375V10.8281H21.3281V2.1875H23.0626L25.8125 4.93741V24.7188Z" fill="currentColor"/>
          <path d="M23.9687 0H3.28125C1.47197 0 0 1.47197 0 3.28125V24.7188C0 26.528 1.47197 28 3.28125 28H24.7188C26.528 28 28 26.528 28 24.7188V4.03134L23.9687 0ZM6.5625 2.1875H19.1406V8.64062H6.5625V2.1875ZM21.4375 25.8125H6.5625V17.1719H21.4375V25.8125ZM25.8125 24.7188C25.8125 25.3218 25.3218 25.8125 24.7188 25.8125H23.625V14.9844H4.375V25.8125H3.28125C2.67816 25.8125 2.1875 25.3218 2.1875 24.7188V3.28125C2.1875 2.67816 2.67816 2.1875 3.28125 2.1875H4.375V10.8281H21.3281V2.1875H23.0626L25.8125 4.93741V24.7188Z" fill="currentColor"/>
          <path d="M17.1719 3.22656H14.9844V7.54688H17.1719V3.22656Z" fill="currentColor"/>
        </svg>
			</button>

			<button
        class="btn p-0 m-2 roundFloat backgroundGradientRed"
        type="button"
        @click="resetRegistry"
      >
        <svg width="20" height="20" viewBox="0 0 36 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
          <path d="M34.8552 0.111316C34.3309 -0.148207 33.7006 0.0618867 33.4389 0.581988L23.8118 19.8532L21.9261 18.9087C20.3647 18.127 18.4613 18.7635 17.6795 20.3208L17.2075 21.2634L28.5248 26.9317L28.9968 25.9887C29.7764 24.4318 29.1534 22.5307 27.5847 21.7432L25.6987 20.7985L35.3259 1.52748C35.5864 1.00632 35.3753 0.372879 34.8552 0.111316Z" fill="currentColor"/>
          <path d="M12.1641 36.0001C12.7466 36.0001 13.2188 35.5279 13.2188 34.9454C13.2188 34.3629 12.7466 33.8907 12.1641 33.8907C11.5816 33.8907 11.1094 34.3629 11.1094 34.9454C11.1094 35.5279 11.5816 36.0001 12.1641 36.0001Z" fill="currentColor"/>
          <path d="M1.61719 29.672C2.19968 29.672 2.67188 29.1998 2.67188 28.6173C2.67188 28.0348 2.19968 27.5626 1.61719 27.5626C1.0347 27.5626 0.5625 28.0348 0.5625 28.6173C0.5625 29.1998 1.0347 29.672 1.61719 29.672Z" fill="currentColor"/>
          <path d="M5.83594 31.7814C6.41843 31.7814 6.89062 31.3092 6.89062 30.7267C6.89062 30.1442 6.41843 29.672 5.83594 29.672C5.25345 29.672 4.78125 30.1442 4.78125 30.7267C4.78125 31.3092 5.25345 31.7814 5.83594 31.7814Z" fill="currentColor"/>
          <path d="M7.94531 33.8907H3.72656C3.14466 33.8907 2.67188 33.418 2.67188 32.8361C2.67188 32.2531 2.20015 31.7814 1.61719 31.7814C1.03423 31.7814 0.5625 32.2531 0.5625 32.8361C0.5625 34.5808 1.98183 36.0001 3.72656 36.0001H7.94531C8.52827 36.0001 9 35.5284 9 34.9454C9 34.3625 8.52827 33.8907 7.94531 33.8907Z" fill="currentColor"/>
          <path d="M7.63834 27.2864C7.17688 27.3441 6.80816 27.6974 6.7299 28.1547C6.65164 28.6131 6.88128 29.0683 7.29641 29.2763L12.3361 31.7998C13.2456 32.2551 14.2507 32.4363 15.2313 32.3323C15.1159 32.7998 15.3353 33.3014 15.7834 33.527L20.4986 35.8887C20.8949 36.0842 21.3543 36.0153 21.6718 35.7343C21.8368 35.5872 25.429 32.3553 27.5288 28.7931L16.166 23.1021C13.6201 26.4847 7.70296 27.2779 7.63834 27.2864Z" fill="currentColor"/>
          </g>
          <defs>
          <clipPath id="clip0">
          <rect width="36" height="36" fill="currentColor"/>
          </clipPath>
          </defs>
        </svg>
			</button>

			<button
        class="btn p-0 m-2 roundFloat"
        :class="[(controlIsValid('client', 'cpf') || controlIsValid('bookIsbn')) ? 'backgroundGradientBlue' : 'backgroundGradientDisabled']"
        type="button"
        @click="getRegistries"
        :disabled="!(controlIsValid('client', 'cpf') || controlIsValid('bookIsbn'))"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
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
import LoanService from '../shared/services/LoanService';
import ReservationService from '../shared/services/ReservationService';
import SubTypesService from "../shared/services/SubTypesService";
import BookService from "../shared/services/BookService";
import ClientService from "../shared/services/ClientService";
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
        status: {
          error: false,
          success: false,
        },
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
        book: {
          isbn: "",
          title: "",
          cover: "",
          genre: {
            description: "",
          },
        },
      },
      registries: [],
      statusOptions: [],
      searchParam: null,
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
        book: {
          isbn: { required, $autoDirty: true },
          title: { required, $autoDirty: true },
          cover: { required, $autoDirty: true },
          genre: {
            description: { required, $autoDirty: true },
          },
        },
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
    alert(message, type) {
      this.log.message = message;
      Object.keys(this.log.status).forEach(key => this.log.status[key] = key == type);
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
    resetClient() {
      this.registry.client.cpf = "";
      this.registry.client.name = "";
      this.registry.client.phone = "";
      this.registry.client.email = "";
      this.registry.client.blockStart = null;
      this.registry.client.blockEnd = null;
    },
    resetBook() {
      this.registry.bookIsbn = "";
      this.registry.book.isbn = "";
      this.registry.book.title = "";
      this.registry.book.cover = "";
      this.registry.book.genre.description = "";
    },
    resetRegistry() {
      this.searchParam = null;
      this.registries = [];
      this.resetClient();
      this.resetBook();
      this.registry.id = "";
      this.registry.reservedDate = "";
      this.registry.withdrawalDate = "";
      this.registry.returnDate = "";
      this.registry.reservationStatus.id = 1;
      this.registry.reservationStatus.description = "";
      this.registry.loanStatus.id = 1;
      this.registry.loanStatus.description = "";
    },
    getStatus() {
      if (this.isReservation) {
        SubTypesService.getReservationStatus().then((response) => {
          this.statusOptions = response.data;

        }).catch(err => this.alert('Erro ao listar as Situações da reserva: ' + err, 'error'));

      } else {
        SubTypesService.getLoanStatus().then((response) => {
          this.statusOptions = response.data;

        }).catch(err => this.alert('Erro ao listar as Situações do empréstimo: ' + err, 'error'));
      }
    },
    getClient() {
      ClientService.getByCpf(this.registry.client.cpf).then(response => {
        if (response.data) {
          this.registry.client = response.data;
        } else if (!this.registry.id) {
          this.alert('Cliente não encontrado', 'error');
          this.resetClient();
        }

      }).catch(err => {
        if (err?.response?.status != 404) {
          this.alert('Erro ao buscar cliente: ' + err, 'error');

        } else if (!this.registry.id) {
          this.alert('Cliente não encontrado', 'error');
          this.resetClient();
        }
      });
    },
    getBook() {
      if (this.registry.bookIsbn) {
        BookService.getByIsbn(this.registry.bookIsbn).then(response => {
          if (response.data) {
            this.registry.book = response.data;
          } else {
            this.alert('Livro não encontrado', 'error');
            this.resetBook();
          }

        }).catch(err => {
          if (err?.response?.status == 404) {
            this.alert('Livro não encontrado', 'error');
            this.resetBook();

          } else {
            this.alert('Erro ao buscar o livro: ' + err, 'error');
          }
        });
      }
    },
    getRegistries() {
      let param = {}

      if (this.registry.client.cpf != '') {
        param = { cpf: this.registry.client.cpf };
        this.searchParam = this.registry.client.cpf;

      } else if (this.registry.bookIsbn != '') {
        param = { isbn: this.registry.bookIsbn };
        this.searchParam = this.registry.bookIsbn;
      }

      if (this.isReservation) {
        ReservationService.getAll(param).then(response => {
          this.registries = response.data;

        }).catch(err => {
          if (err?.response?.status == 404) this.handle404Error();
          else this.alert('Erro ao listar as Reservas: ' + err, 'error');

          this.registries = [];
        });

      } else {
        LoanService.getAll(param).then(response => {
          this.registries = response.data;

        }).catch(err => {
          if (err?.response?.status == 404) this.handle404Error();
          else this.alert('Erro ao listar os Empréstimos: ' + err, 'error');

          this.registries = [];
        });
      }
    },
    handle404Error() {
      if (this.registry.client.cpf) this.alert(`Cliente de CPF: ${this.registry.client.cpf} não encontrado`, 'error');
      else this.alert(`Livro de ISBN: ${this.registry.bookIsbn} não encontrado`, 'error');
    },
    submit() {
      if (this.registryIsValid) this.saveRegistry();
    },
    saveRegistry() {
      ClientService.postClient(this.registry.client).then(() => {
        if (this.isReservation) {
          this.saveReservation(this.registry);

        } else {
          this.saveLoan(this.registry);
        }
      }).catch(err => this.alert('Erro ao salvar o cliente: ' + err, 'error'));
    },
    saveReservation(reservation) {
      ReservationService.updateReservation(reservation).then(() => {
        this.alert('Reserva atualizada com sucesso!', 'success');
        
      }).catch(err => {
        this.alert('Erro ao atualizar a reserva: ' + err, 'error');
      });
    },
    saveLoan(loan) {
      LoanService.updateLoan(loan).then(() => {
        this.alert('Empréstimo atualizado com sucesso!', 'success');

      }).catch(err => {
        this.alert('Erro ao atualizar empréstimo: ' + err, 'error');
      });
    },
    selectRegistry(newRegistry) {
      this.registry = { ...newRegistry };
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
  bottom: 10px;
  right: 20px;
}
</style>
