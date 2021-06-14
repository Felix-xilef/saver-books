<template>
  <navbar-return />
  <div class="container p-3">
    <form class="row">
      <div class="row">
        <div class="col-3">
          <img src="../assets/picture.png" alt="" />
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
                :value="registry.cpf"
                placeholder="CPF do ator"
              />
            </div>
            <div class="col">
              <label class="form-label" for="txtNome">Nome</label>
              <input
                class="form-control"
                type="name"
                name="txtNome"
                id="txtNome"
                :value="registry.name"
                placeholder="nome do ator"
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
                :value="registry.phone"
                placeholder="telefone do ator"
              />
            </div>
            <div class="col">
              <label class="form-label" for="txtEmail">E-mail</label>
              <input
                class="form-control"
                type="email"
                name="txtEmail"
                id="txtEmail"
                :value="registry.email"
                placeholder="e-mail do ator"
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
                :value="registry.isbn"
                placeholder="ISBN do livro"
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
            :value="
              isReservation ? registry.reservationDate : registry.withdrawalDate
            "
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
            :value="
              isReservation ? registry.withdrawalDate : registry.returnDate
            "
          />
        </div>
        <div class="col">
          <label class="form-label" for="selectStatus"> Situação </label>
          <select class="form-select" name="selectStatus" id="selectStatus">
            <option
              v-for="status in statusOptions"
              :key="status.id"
              :value="status.id"
              :selected="registry.status.id == status.id"
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
    </form>
    <div class="row p-5">
      <div class="borderPurple rounded operationsView">
        <div v-for="item in registries" :key="item.id">
          <div class="p-3 registry">
            <div class="row">
              <div class="col-1">
                <img
                  height="100"
                  src="../assets/picture.png"
                  alt="Book cover"
                />
              </div>
              <div class="col d-flex flex-column justify-content-evenly m-2">
                <h6>{{ item.title }}</h6>
                <div class="d-inline-flex">
                  <strong class="pe-1">ISBN:</strong>{{ item.isbn }}
                </div>
                <div class="d-inline-flex">
                  <strong class="pe-1">CPF:</strong>{{ item.cpf }}
                </div>
              </div>
              <div class="col-1">
                <strong>{{ item.status.description }}</strong>
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-2">
                <strong>{{
                  isReservation ? "Data da Reserva:" : "Data da Retirada:"
                }}</strong>
                {{
                  isReservation ? item.reservationDate : item.withdrawalDate
                }}
              </div>
              <div class="col-2">
                <strong>{{
                  isReservation ? "Data da Retirada:" : "Data da Devolução:"
                }}</strong>
                {{ isReservation ? item.withdrawalDate : item.returnDate }}
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  </div>
  <div class="position-fixed">
    <button class="btn p-0 m-2" type="button">
      <img height="40" src="../assets/saveButton.svg" alt="" />
    </button>
    <button class="btn p-0 m-2" type="button">
      <img height="40" src="../assets/searchButton.svg" alt="" />
    </button>
  </div>
</template>

<script>
import NavbarReturn from "./NavbarReturn.vue";
export default {
  components: { NavbarReturn },
  name: "ManageOperations",
  data() {
    return {
      registry: {
        id: "",
        cpf: "",
        name: "",
        phone: "",
        email: "",
        isbn: "",
        reservationDate: "",
        withdrawalDate: "",
        returnDate: "",
        status: {
          id: "",
          description: "",
        },
      },
      registries: [
        {
          id: 1,
          image: "",
          cpf: "XXX.XXX.XXX-XX",
          title: "Book Title",
          isbn: "XXX-X-XX-XXXXXX-X",
          reservationDate: "XX/XX/XXXX",
          withdrawalDate: "XX/XX/XXXX",
          returnDate: "XX/XX/XXXX",
          status: {
            description: "situação",
          },
        },
        {
          id: 2,
          image: "",
          cpf: "XXX.XXX.XXX-XX",
          title: "Book Title",
          isbn: "XXX-X-XX-XXXXXX-X",
          reservationDate: "XX/XX/XXXX",
          withdrawalDate: "XX/XX/XXXX",
          returnDate: "XX/XX/XXXX",
          status: {
            description: "situação",
          },
        },
        {
          id: 3,
          image: "",
          cpf: "XXX.XXX.XXX-XX",
          title: "Book Title",
          isbn: "XXX-X-XX-XXXXXX-X",
          reservationDate: "XX/XX/XXXX",
          withdrawalDate: "XX/XX/XXXX",
          returnDate: "XX/XX/XXXX",
          status: {
            description: "situação",
          },
        },
      ],
      book: {
        isbn: "",
        title: "",
        genre: "",
      },
    };
  },
  computed: {
    isReservation() {
      console.log(this.$route)
      return this.$route.params['operationName'] == 'reservation'
    },
    statusOptions() {
      return this.isReservation
        ? [ //reservationStatus
            {
              id: 1,
              description: "aberto",
            },
            {
              id: 2,
              description: "atrasado",
            },
            {
              id: 3,
              description: "retirado",
            },
            {
              id: 4,
              description: "cancelado",
            },
          ]
        : [ //loanStatus
            {
              id: 1,
              description: "retirado",
            },
            {
              id: 2,
              description: "atrasado",
            },
            {
              id: 3,
              description: "devolvido",
            },
          ];
    },
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
