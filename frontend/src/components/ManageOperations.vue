<template>
  <navbar-return />
  <form class="container p-3" @submit.prevent="saveRegistry">
    <div class="row">
      <div class="row">
        <div class="col-3">
          <img src="../shared/assets/picture.png" alt="" />
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
                type="text"
                name="txtCpf"
                id="txtCpf"
                v-model="registry.cpf"
                placeholder="CPF do ator"
                required
              />
            </div>
            <div class="col">
              <label class="form-label" for="txtNome">Nome</label>
              <input
                class="form-control"
                type="name"
                name="txtNome"
                id="txtNome"
                v-model="registry.name"
                placeholder="nome do ator"
                required
              />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-3">
              <label class="form-label" for="txtPhone">Telefone</label>
              <input
                class="form-control"
                type="tel"
                name="txtPhone"
                id="txtPhone"
                v-model="registry.phone"
                placeholder="telefone do ator"
                required
              />
            </div>
            <div class="col">
              <label class="form-label" for="txtEmail">E-mail</label>
              <input
                class="form-control"
                type="email"
                name="txtEmail"
                id="txtEmail"
                v-model="registry.email"
                placeholder="e-mail do ator"
                required
              />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-4">
              <label class="form-label" for="txtIsbn">ISBN</label>
              <input
                class="form-control"
                type="text"
                name="txtIsbn"
                id="txtIsbn"
                v-model="registry.bookIsbn"
                placeholder="ISBN do livro"
                required
              />
            </div>
            <div class="col">
              <label class="form-label" for="txtTitle">Título</label>
              <input
                class="form-control"
                type="text"
                name="txtTitle"
                id="txtTitle"
                :value="book.title"
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
            :value="isReservation ? registry.reservedDate.slice(0, 10) : registry.withdrawalDate.slice(0, 10)"
            disabled
          />
        </div>
        <div class="col">
          <label class="form-label" for="txtSecondDate">
            {{ isReservation ? "Data da Retirada" : "Data da Devolução" }}
          </label>
          <input
            class="form-control"
            type="date"
            name="txtSecondDate"
            id="txtSecondDate"
            v-model="registrySecondDate"
            required
          />
        </div>
        <div class="col">
          <label class="form-label" for="selectStatus"> Situação </label>
          <select
            v-model="registryStatus.id"
            class="form-select"
            name="selectStatus"
            id="selectStatus"
          >
            <option
              v-for="status in statusOptions"
              :key="status.id"
              :value="status.id"
            >
              {{ status.description }}
            </option>
          </select>
        </div>
        <div class="col">
          <label class="form-label" for="txtGenre">Gênero</label>
          <input
            class="form-control"
            type="text"
            name="txtGenre"
            id="txtGenre"
            :value="book.genre"
            placeholder="Gênero do livro"
            disabled
          />
        </div>
      </div>
    </div>
    <div class="row p-5">
      <div class="borderPurple rounded operationsView">
        <div v-for="item in registries" :key="item.id">
          <div class="p-3 registry" @click="selectRegistry(item)">
            <div class="row">
              <div class="col-1">
                <img
                  height="100"
                  src="../shared/assets/picture.png"
                  alt="Book cover"
                />
              </div>
              <div class="col d-flex flex-column justify-content-evenly m-2">
                <!-- <h6>{{ item.title }}</h6> -->
                <div class="d-inline-flex">
                  <strong class="pe-1">ISBN:</strong>{{ item.bookIsbn }}
                </div>
                <div class="d-inline-flex">
                  <strong class="pe-1">CPF:</strong>{{ item.cpf }}
                </div>
              </div>
              <div class="col-1">
                <strong>{{
                  isReservation
                    ? item.reservationStatus.description
                    : item.loanStatus.description
                }}</strong>
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-2">
                <strong>{{
                  isReservation ? "Data da Reserva:" : "Data da Retirada:"
                }}</strong>
                {{ isReservation ? item.reservedDate.slice(0, 10).split('-').reverse().join('/') : item.withdrawalDate.slice(0, 10).split('-').reverse().join('/') }}
              </div>
              <div class="col-2">
                <strong>{{
                  isReservation ? "Data da Retirada:" : "Data da Devolução:"
                }}</strong>
                {{ isReservation ? item.withdrawalDate.slice(0, 10).split('-').reverse().join('/') : item.returnDate.slice(0, 10).split('-').reverse().join('/') }}
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
    <div class="position-fixed">
      <button v-if="registry.id != ''" class="btn p-0 m-2" type="submit">
        <img height="40" src="../shared/assets/saveButton.svg" alt="" />
      </button>
      <button class="btn p-0 m-2" type="button" @click="getRegistries">
        <img height="40" src="../shared/assets/searchButton.svg" alt="" />
      </button>
    </div>
  </form>
</template>

<script>
import LoanService from '../shared/services/LoanService';
import ReservationService from '../shared/services/ReservationService';
import SubTypesService from "../shared/services/SubTypesService";
import NavbarReturn from "./NavbarReturn.vue";
export default {
  components: { NavbarReturn },
  name: "ManageOperations",
  props: {
    operationName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      registry: {
        id: "",
        cpf: "",
        name: "",
        phone: "",
        email: "",
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
      },
      registries: [],
      book: {
        isbn: "",
        title: "",
        genre: "",
      },
      statusOptions: [],
    };
  },
  computed: {
    isReservation() {
      return this.operationName == "reservation";
    },
    registrySecondDate: {
      get() {
        return this.isReservation ? this.registry.withdrawalDate.slice(0, 10) : this.registry.returnDate.slice(0, 10)
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
    getStatus() {
      if (this.isReservation) {
        SubTypesService.getReservationStatus()
          .then((response) => {
            this.statusOptions = response.data;
          })
          .catch((error) => {
            alert("Erro ao listar as Situações da reserva");
            console.log(error);
          });
      } else {
        SubTypesService.getLoanStatus()
          .then((response) => {
            this.statusOptions = response.data;
          })
          .catch((error) => {
            alert("Erro ao listar as Situações do empréstimo");
            console.log(error);
          });
      }
    },
    getRegistries() {
      let param = {}
      if (this.registry.cpf != '') {
        param = {
          cpf: this.registry.cpf
        }
      } else if (this.registry.bookIsbn != '') {
        param = {
          isbn: this.registry.bookIsbn
        }
      }
      if (this.isReservation) {
        ReservationService.getAll(param).then(response => {
          this.registries = response.data
        }).catch(error => {
          if (error == 'Error: Request failed with status code 404') {
            alert(`Livro de ISBN: ${this.registry.bookIsbn} não encontrado`);
          } else {
            alert("Erro ao listar as Reservas");
          }
          console.log(error);
          this.registries = []
        })
      } else {
        LoanService.getAll(param).then(response => {
          this.registries = response.data
        }).catch(error => {
          if (error == 'Error: Request failed with status code 404') {
            alert(`Livro de ISBN: ${this.registry.bookIsbn} não encontrado`);
          } else {
            alert("Erro ao listar as Empréstimos");
          }
          console.log(error);
          this.registries = []
        })
      }
    },
    saveRegistry() {
      if (this.isReservation) {
        ReservationService.updateReservation(this.registry).then(() => {
          alert('Reserva atualizada com sucesso!')
        }).catch(error => {
          alert('Erro ao atualizar a reserva!')
          console.log(error)
        })
      } else {
        LoanService.updateLoan(this.registry).then(() => {
          alert('Empréstimo atualizado com sucesso!')
        }).catch(error => {
          alert('Erro ao atualizar a empréstimo!')
          console.log(error)
        })
      }
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
}

.operationsView .registry:hover {
  background-color: rgba(219, 219, 219, 0.616);
}

.operationsView hr {
  background-color: rgb(81, 38, 200);
}

.position-fixed {
  bottom: 0px;
  right: 20px;
}
</style>
