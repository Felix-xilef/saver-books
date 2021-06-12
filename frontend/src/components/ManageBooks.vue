<template>
  <navbar-return />
  <form class="container p-3">
    <div class="row">
      <div class="col-3">
        <!-- <input type="image" src="../assets/picture.png" alt="" /> -->
        <img src="../assets/picture.png" alt="" />
        <div class="mt-2">
          <label class="form-label" for="txtAvailCopies">
            Número de cópias disponíveis
          </label>
          <input
            class="form-control numberInput"
            type="number"
            name="txtAvailCopies"
            id="txtAvailCopies"
            :value="book.availCopies"
            placeholder="0"
          />
        </div>
        <div class="mt-2">
          <label class="form-label" for="txtUnavailCopies">
            Número de cópias indisponíveis
          </label>
          <input
            class="form-control numberInput"
            type="number"
            name="txtUnavailCopies"
            id="txtUnavailCopies"
            :value="book.unavailCopies"
            placeholder="0"
            disabled
          />
        </div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col">
            <label class="form-label" for="txtIsbn">ISBN</label>
            <input
              class="form-control"
              type="text"
              name="txtIsbn"
              id="txtIsbn"
              placeholder="código ISBN"
              :value="book.isbn"
            />
          </div>
          <div class="col">
            <label class="form-label" for="selectGenre">Gênero</label>
            <select class="form-select" name="selectGenre" id="selectGenre">
              <option :key="genre.id" v-for="genre in genres" :value="genre.id">
                {{ genre.description }}
              </option>
            </select>
          </div>
          <div class="col">
            <label class="form-label" for="txtLanguage">Idioma</label>
            <input
              class="form-control"
              type="text"
              name="txtLanguage"
              id="txtLanguage"
              placeholder="idioma do livro"
              :value="book.language"
            />
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <label class="form-label" for="txtTitle">Título</label>
            <input
              class="form-control"
              type="text"
              name="txtTitle"
              id="txtTitle"
              placeholder="título da obra"
              :value="book.language"
            />
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <div class="row">
              <div class="col">
                <label class="form-label" for="txtAuthor">Autor</label>
                <input
                  class="form-control"
                  type="text"
                  name="txtAuthor"
                  id="txtAuthor"
                  placeholder="autor da obra"
                  :value="book.author"
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label class="form-label" for="txtPublisher">Editora</label>
                <input
                  class="form-control"
                  type="text"
                  name="txtPublisher"
                  id="txtPublisher"
                  placeholder="editora do livro"
                  :value="book.publisher"
                />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label class="form-label" for="txtPublicDate"
                  >Data de Publicação</label
                >
                <input
                  class="form-control"
                  type="date"
                  name="txtPublicDate"
                  id="txtPublicDate"
                  :value="book.publicDate"
                />
              </div>
              <div class="col">
                <label class="form-label" for="txtPages"
                  >Número de páginas</label
                >
                <input
                  class="form-control numberInput"
                  type="number"
                  name="txtPages"
                  id="txtPages"
                  :value="book.pages"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
          <div class="col">
            <label class="form-label" for="txtSummary">Síntese</label>
            <textarea
              class="form-control rounded"
              placeholder="síntese da obra..."
              name="txtSummary"
              id="txtSummary"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </form>
  <div class="position-fixed">
    <button class="btn p-0 m-2" type="button">
      <img height="40" src="../assets/saveButton.svg" alt="" />
    </button>
    <button class="btn p-0 m-2" type="button">
      <img height="40" src="../assets/removeButton.svg" alt="" />
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
  name: "ManageBooks",
  data() {
    return {
      book: {
        cover: "",
        title: "",
        author: "",
        genre: "",
        isbn: "",
        summary: "",
        publisher: "",
        language: "",
        pages: "",
        publicDate: "",
        availCopies: "",
        unavailCopies: "",
      },
      genres: [
        {
          id: 1,
          description: "um",
        },
        {
          id: 2,
          description: "dois",
        },
        {
          id: 3,
          description: "três",
        },
        {
          id: 4,
          description: "quatro",
        },
        {
          id: 5,
          description: "cinco",
        },
        {
          id: 6,
          description: "seis",
        },
        {
          id: 7,
          description: "sete",
        },
      ],
    };
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

textarea {
  height: 100%;
}

.numberInput {
  max-width: 80px;
}

.position-fixed {
  bottom: 0px;
  right: 20px;
}
</style>
