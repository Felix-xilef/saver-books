<template>
  <div class="row m-0">
    <img src="../assets/logo.svg" alt="logo do site" class="logo" />
  </div>
  <div class="row m-0 justify-content-center p-md-0 p-3">
    <div class="card p-4 backgroundLightPurple borderPurple">
      <div v-if="error" class="alert alert-danger d-flex align-items-center justify-content-between" role="alert">
        <!-- <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
          <use xlink:href="#exclamation-triangle-fill"/>
        </svg> -->
        <div>{{ logMessage }}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div class="row row-cols-md-2 row-cols-1">
        <div class="col-md-4">
          <div class="row justify-content-center">
            <img
              src="../assets/userIcon.svg"
              alt="ícone de uma pessoa"
              class="userIcon"
            />
          </div>
        </div>
        <form class="col-md-8 needs-validation" @submit.prevent="enter" novalidate>
          <div class="mb-3">
            <label for="txtLogin" class="form-label">Login</label>
            <input
              type="text"
              name="txtLogin"
              id="txtLogin"
              placeholder="Digite seu CPF"
              class="form-control"
              v-model="cpf"
              required
            />
            <div class="invalid-feedback">
              Digite o CPF para continuar
            </div>
          </div>

          <div class="mb-3">
            <label for="txtPassword" class="form-label">Senha</label>
            <input
              type="password"
              name="txtPassword"
              id="txtPassword"
              placeholder="Digite sua Senha"
              class="form-control"
              v-model="password"
              required
            />
            <div class="invalid-feedback">
              Digite a senha para continuar
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button
              type="submit"
              class="btn btn-primary backgroundGradientBlue"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/AuthService'
export default {
  name: "Login",
  data() {
    return {
      cpf: '',
      password: '',
      error: false,
      logMessage: '',
    };
  },
  methods: {
    enter() {
      AuthService.login(this.cpf, this.password).then(loggedIn => {
        if (loggedIn) this.$router.push({ name: 'Search' });
        else {
          this.logMessage = 'CPF ou senha incorreto(s)';
          this.error = true;
        }
      });
    },
  },
  mounted() {
    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
  },
};
</script>

<style scoped>
.logo {
  max-height: 164px;
}

.userIcon {
  max-height: 150px;
}

.card {
  max-width: 540px;
}
</style>
