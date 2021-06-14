<template>
  <navbar-return />
  <div class="container p-4">
    <div class="row">
      <div class="col">
        <div class="d-inline-flex">
          <img src="../assets/picture.png" alt="Book cover" class="bookCover" />
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
          class="btn text-white backgroundGradientGreen me-3"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#loanModal"
        >
          Realizar Empréstimo
        </button>
        <button
          class="btn text-white backgroundGradientBlue"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#reservationModal"
        >
          Reservar
        </button>
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
      <div class="modal-content">
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
          <form class="container-fluid">
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
                  type="name"
                  name="txtReservationName"
                  id="txtReservationName"
                  :value="reservation.name"
                  placeholder="digite seu nome"
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
                  :value="reservation.email"
                  placeholder="digite um e-mail válido"
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
                  :value="reservation.cpf"
                  placeholder="digite seu CPF"
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
                  :value="reservation.phone"
                  placeholder="digite um telefone válido"
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
                  :value="reservation.withdrawalDate"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn text-white backgroundGradientBlue">
            Finalizar Reserva
          </button>
        </div>
      </div>
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
      <div class="modal-content">
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
          <form class="container-fluid">
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
            </div>
            <div class="row mt-3">
              <div class="col">
                <label class="form-label" for="txtLoanName"> Nome </label>
                <input
                  class="form-control"
                  type="name"
                  name="txtLoanName"
                  id="txtLoanName"
                  :value="loan.name"
                  placeholder="digite seu nome"
                />
              </div>
              <div class="col">
                <label class="form-label" for="txtLoanEmail"> E-mail </label>
                <input
                  class="form-control"
                  type="email"
                  name="txtLoanEmail"
                  id="txtLoanEmail"
                  :value="loan.email"
                  placeholder="digite um e-mail válido"
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
                  :value="loan.cpf"
                  placeholder="digite seu CPF"
                />
              </div>
              <div class="col">
                <label class="form-label" for="txtLoanPhone"> Telefone </label>
                <input
                  class="form-control"
                  type="tel"
                  name="txtLoanPhone"
                  id="txtLoanPhone"
                  :value="loan.phone"
                  placeholder="digite um telefone válido"
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
                  :value="loan.returnDate"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer justify-content-between">
          <div>
            <button
              type="button"
              class="btn text-white backgroundGradientGreen"
              data-bs-target="#reservationsModal"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Visualizar Reservas
            </button>
            <button
              type="button"
              class="btn text-white backgroundGradientBlue ms-2"
            >
              Finalizar Empréstimo
            </button>
          </div>
          <button type="button" class="btn p-0">
            <img src="../assets/clean.svg" alt="" />
          </button>
        </div>
      </div>
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
            class="btn p-0 me-auto"
            data-bs-target="#loanModal"
            data-bs-toggle="modal"
            data-bs-dismiss="modal"
          >
            <img height="32" src="../assets/arrow-left.svg" alt="back arrow" />
          </button>
          <h5 class="modal-title" id="reservationsModalLabel">
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
          <div class="borderPurple rounded operationsView p-3">
            <div v-for="item in reservations" :key="item.id">
              <div class="p-3 registry">
                <div class="row">
                  <div class="col-1 me-2">
                    <img
                      height="100"
                      src="../assets/picture.png"
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
                        {{ item.reservationDate }}
                      </div>
                      <div class="d-flex flex-column">
                        <strong>Data da Retirada:</strong>
                        {{ item.withdrawalDate }}
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
import BookService from '../services/BookService';
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
      book: null,
      reservation: {
        isbn: "",
        name: "",
        email: "",
        cpf: "",
        phone: "",
        withdrawalDate: "",
      },
      loan: {
        isbn: "",
        name: "",
        email: "",
        cpf: "",
        phone: "",
        returnDate: "",
      },
			reservations: [
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
    };
  },
  methods: {
    getBook(isbn) {
      BookService.getByIsbn(isbn).then(response => {
        this.book = response.data
      }).catch(err => console.log('An error ocurred: ' + err.message))
    }
  },
  mounted() {
    this.getBook(this.isbn)
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
