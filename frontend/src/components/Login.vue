<template>
  <div class="row m-0">
    <img src="../shared/assets/logo.svg" alt="logo do site" class="logo" />
  </div>
  <div class="row m-0 justify-content-center p-md-0 p-3">
    <div class="card p-4 backgroundLightPurple borderPurple">
      <div class="row row-cols-md-2 row-cols-1">
        <div class="col-md-4">
          <div class="row justify-content-center">
            <img
              src="../shared/assets/userIcon.svg"
              alt="ícone de uma pessoa"
              class="userIcon"
            />
          </div>
        </div>
        <form class="col-md-8" @submit.prevent="submit">
          <div class="mb-3">
            <label for="txtLogin" class="form-label">Login</label>
            <input
              type="text"
              name="txtLogin"
              id="txtLogin"
              placeholder="Digite seu CPF"
              class="form-control"
              :class="{ 'is-valid': cpfIsValid, 'is-invalid': cpfHasError }"
              @blur="v$.loginForm.cpf.$touch"
              v-model="loginForm.cpf"
            />
            <div class="invalid-feedback">
              Digite um CPF válido para continuar
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
              :class="{ 'is-valid': passwordIsValid, 'is-invalid': passwordHasError }"
              @blur="v$.loginForm.password.$touch"
              v-model="loginForm.password"
            />
            <div class="invalid-feedback">
              Digite a senha para continuar
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button
              type="submit"
              class="btn"
              :class="{ 'btn-primary backgroundGradientBlue': loginFormIsValid, 'backgroundGradientDisabled': !loginFormIsValid }"
              :disabled="!loginFormIsValid"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <alert
    :logMessage="log.message"
    :error="log.status.error"
    @closed="alert(null, null)"
  />
</template>

<script>
import vuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import cpfValidator from '../shared/validators/cpfValidator';
import AuthService from '../shared/services/AuthService';
import Alert from '../shared/components/Alert.vue';
export default {
  components: { Alert },
  setup() {
    return { v$: vuelidate() }
  },
  name: "Login",
  data() {
    return {
      log: {
        message: '',
        status: {
          error: false
        }
      },
      loginForm: {
        cpf: '',
        password: '',
      },
    };
  },
  validations() {
    return {
      loginForm: {
        cpf: { required, cpfValidator },
        password: { required },
      },
    }
  },
  computed: {
    loginFormIsValid() {
      return !this.v$.loginForm.$invalid;
    },
    cpfIsValid() {
      return !this.v$.loginForm.cpf.$invalid && this.v$.loginForm.cpf.$dirty;
    },
    cpfHasError() {
      return this.v$.loginForm.cpf.$error;
    },
    passwordIsValid() {
      return !this.v$.loginForm.password.$invalid && this.v$.loginForm.password.$dirty;
    },
    passwordHasError() {
      return this.v$.loginForm.password.$error;
    },
  },
  methods: {
    alert(message, type) {
      this.log.message = message;
      Object.keys(this.log.status).forEach(key => this.log.status[key] = key == type);
    },
    resetForm() {
      this.loginForm.cpf = '';
      this.loginForm.password = '';
    },
    submit() {
      this.alert(null, null);

      if (this.loginFormIsValid) this.enter();
    },
    enter() {
      AuthService.login(this.loginForm.cpf, this.loginForm.password).then(loggedIn => {
        if (loggedIn) this.$router.push({ name: 'Search', replace: true });
        else {
          this.resetForm();
          this.alert('CPF ou senha inválido(s)', 'error');
        }
      });
    },
  },
  beforeMount() {
    AuthService.verifyCredentials().then(tokenIsValid => {
      if (tokenIsValid) this.$router.push({ name: 'Search', replace: true });
    });
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
