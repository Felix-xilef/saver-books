<template>
  <form class="container p-3" @submit.prevent="submit">
    <div class="row">
      <div class="col-3">
        <label class="form-label" for="txtCpf">
          CPF
        </label>
        <input
          class="form-control"
          :class="{ 'is-valid': controlIsValid('cpf'), 'is-invalid': controlHasError('cpf') }"
          type="text"
          name="txtCpf"
          id="txtCpf"
          v-model="user.cpf"
          placeholder="CPF do usuário"
					:disabled="selectedCpf != ''"
        />
        <div class="invalid-feedback">
          <span v-if="user.cpf == ''">
            O CPF é obrigatório
          </span>
          <span v-else>
            CPF inválido
          </span>
        </div>
      </div>

      <div class="col">
        <label class="form-label" for="txtName">
          Nome
        </label>
        <input
          class="form-control"
          :class="{ 'is-valid': controlIsValid('name'), 'is-invalid': controlHasError('name') }"
          type="name"
          name="txtName"
          id="txtName"
          v-model="user.name"
          placeholder="nome do usuário"
        />
        <div class="invalid-feedback">
          O nome é obrigatório
        </div>
      </div>

      <div class="col-3">
        <label class="form-label" for="txtbirthDate">
          Data de Nascimento
        </label>
        <input
          class="form-control"
          :class="{ 'is-valid': controlIsValid('birthDate'), 'is-invalid': controlHasError('birthDate') }"
          type="date"
          name="txtbirthDate"
          id="txtbirthDate"
          v-model="user.birthDate"
        />
        <div class="invalid-feedback">
          A data de nascimento é obrigatória
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-3">
        <label class="form-label" for="txtPhone">
          Telefone
        </label>
        <input
          class="form-control"
          :class="{ 'is-valid': controlIsValid('phone'), 'is-invalid': controlHasError('phone') }"
          type="tel"
          name="txtPhone"
          id="txtPhone"
          v-model="user.phone"
          placeholder="telefone do usuário"
        />
        <div class="invalid-feedback">
          O Telefone é obrigatório
        </div>
      </div>

      <div class="col">
        <label class="form-label" for="txtEmail">
          E-mail
        </label>
        <input
          class="form-control"
          :class="{ 'is-valid': controlIsValid('email'), 'is-invalid': controlHasError('email') }"
          type="email"
          name="txtEmail"
          id="txtEmail"
          v-model="user.email"
          placeholder="e-mail do usuário"
        />
        <div class="invalid-feedback">
          <span v-if="user.email == ''">
            O e-mail é obrigatório
          </span>
          <span v-else>
            E-mail inválido
          </span>
        </div>
      </div>

      <div class="col-3">
        <label class="form-label" for="selectUserType">
          Tipo de Usuário
        </label>
        <select
          v-model="user.userType.id"
          class="form-select"
          :class="{ 'is-valid': controlIsValid('userType'), 'is-invalid': controlHasError('userType') }"
          name="selectUserType"
          id="selectUserType"
        >
          <option
            v-for="type in userTypes"
            :key="type.id"
            :value="type.id"
          >
            {{ type.description }}
          </option>
        </select>
        <div class="invalid-feedback">
          O tipo de usuário é obrigatório
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-3">
        <label class="form-label" for="txtPassword">
          Senha
        </label>
        <input
          class="form-control"
          :class="{ 'is-valid': controlIsValid('password'), 'is-invalid': controlHasError('password') }"
          type="password"
          name="txtPassword"
          id="txtPassword"
          v-model="user.password"
          placeholder="digite a senha"
        />
        <div class="invalid-feedback">
          A senha é obrigatória
        </div>
      </div>

      <div class="col-3">
        <label class="form-label" for="txtPasswordConfirmation">
          Confirmação da Senha
        </label>
        <input
          class="form-control"
          :class="{ 'is-valid': controlIsValid('passwordConfirmation'), 'is-invalid': controlHasError('passwordConfirmation') }"
          type="password"
          name="txtPasswordConfirmation"
          id="txtPasswordConfirmation"
          v-model="user.passwordConfirmation"
          placeholder="confirme a senha"
        />
        <div class="invalid-feedback">
          <span v-if="user.passwordConfirmation == ''">
            A confirmação da senha é obrigatória
          </span>
          <span v-else>
            A confirmação da senha deve ser igual a senha
          </span>
        </div>
      </div>
    </div>

		<div class="d-flex justify-content-end mt-4">
			<button
          type="button"
          class="btn text-white outlinedOnHover backgroundGradientBlue"
					@click="resetForm"
        >
          <p>Limpar Campos</p>
        </button>
		</div>

		<div class="position-fixed">
			<button
        class="btn p-0 m-2 roundFloat"
        :class="{ 'backgroundGradientDisabled': !userIsValid, 'backgroundGradientGreen': userIsValid }"
        type="submit"
        :disabled="!userIsValid"
      >
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.9687 0H3.28125C1.47197 0 0 1.47197 0 3.28125V24.7188C0 26.528 1.47197 28 3.28125 28H24.7188C26.528 28 28 26.528 28 24.7188V4.03134L23.9687 0ZM6.5625 2.1875H19.1406V8.64062H6.5625V2.1875ZM21.4375 25.8125H6.5625V17.1719H21.4375V25.8125ZM25.8125 24.7188C25.8125 25.3218 25.3218 25.8125 24.7188 25.8125H23.625V14.9844H4.375V25.8125H3.28125C2.67816 25.8125 2.1875 25.3218 2.1875 24.7188V3.28125C2.1875 2.67816 2.67816 2.1875 3.28125 2.1875H4.375V10.8281H21.3281V2.1875H23.0626L25.8125 4.93741V24.7188Z" fill="currentColor"/>
          <path d="M23.9687 0H3.28125C1.47197 0 0 1.47197 0 3.28125V24.7188C0 26.528 1.47197 28 3.28125 28H24.7188C26.528 28 28 26.528 28 24.7188V4.03134L23.9687 0ZM6.5625 2.1875H19.1406V8.64062H6.5625V2.1875ZM21.4375 25.8125H6.5625V17.1719H21.4375V25.8125ZM25.8125 24.7188C25.8125 25.3218 25.3218 25.8125 24.7188 25.8125H23.625V14.9844H4.375V25.8125H3.28125C2.67816 25.8125 2.1875 25.3218 2.1875 24.7188V3.28125C2.1875 2.67816 2.67816 2.1875 3.28125 2.1875H4.375V10.8281H21.3281V2.1875H23.0626L25.8125 4.93741V24.7188Z" fill="currentColor"/>
          <path d="M17.1719 3.22656H14.9844V7.54688H17.1719V3.22656Z" fill="currentColor"/>
        </svg>
			</button>

			<button
        v-if="selectedCpf != ''"
        class="btn p-0 m-2 roundFloat"
        :class="{ 'backgroundGradientDisabled': !userIsValid, 'backgroundGradientRed': userIsValid }"
        type="button"
        @click="removeUser"
        :disabled="!userIsValid"
      >
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
			</button>
      
			<button class="btn p-0 m-2 roundFloat backgroundGradientBlue" type="button" @click="getUser">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
			</button>
		</div>
  </form>

  <alert :logMessage="log.message" :error="log.error" :success="log.success" :warning="log.warning" />
</template>

<script>
import Alert from '../shared/components/Alert.vue';
import SubTypesService from '../shared/services/SubTypesService';
import UserService from '../shared/services/UserService';
import vuelidate from '@vuelidate/core';
import { required, email, sameAs } from '@vuelidate/validators';
import cpfValidator from '../shared/validators/cpfValidator';
export default {
  setup() { return { v$: vuelidate() } },
  components: { Alert },
  name: "ManageUsers",
  data() {
    return {
      log: {
        message: '',
        error: false,
        success: false,
				warning: false,
      },
      user: {
        cpf: '',
        name: '',
        birthDate: '',
        phone: '',
        email: '',
        userType: {
          id: 1,
          description: '',
        },
        password: '',
        passwordConfirmation: '',
      },
      userTypes: [],
      selectedCpf: '',
    };
  },
  validations() {
    return {
      user: {
        cpf: { required, cpfValidator, $autoDirty: true },
        name: { required, $autoDirty: true },
        birthDate: { required, $autoDirty: true },
        phone: { required, $autoDirty: true },
        email: { required, email, $autoDirty: true },
        userType: {
          id: { required, $autoDirty: true },
        },
        password: { required, $autoDirty: true },
        passwordConfirmation: { required, sameAsPassword: sameAs(this.user.password), $autoDirty: true },
      },
    }
  },
  computed: {
    userIsValid() {
      return !this.v$.user.$invalid;
    },
  },
	methods: {
		success(message) {
			this.log.message = message;
			this.log.error = false;
			this.log.warning = false;
			this.log.success = true;
		},
		error(message) {
			this.log.message = message;
			this.log.success = false;
			this.log.warning = false;
			this.log.error = true;
		},
		warning(message) {
			this.log.message = message;
			this.log.success = false;
			this.log.error = false;
			this.log.warning = true;
		},
		resetForm() {
      this.user.cpf = '';
      this.user.name = '';
      this.user.birthDate = '';
      this.user.phone = '';
      this.user.email = '';
      this.user.userType.id = 1;
      this.user.userType.description = '';
      this.user.password = '';
      this.user.passwordConfirmation = '';

			this.selectedCpf = '';

      this.v$.user.$reset();
		},
    controlIsValid(attributeName) {
      return !this.v$.user[attributeName].$invalid && this.v$.user[attributeName].$dirty;
    },
    controlHasError(attributeName) {
      return this.v$.user[attributeName].$error;
    },
		getUserTypes() {
			SubTypesService.getUserTypes().then(response => {
				this.userTypes = response.data;

			}).catch(err => {
				this.error('Erro ao listar tipos de usuário: ' + err);
			});
		},
		getUser() {
			if (this.selectedCpf != '') this.warning('Antes de realizar uma busca limpe os campos');
			else {
				UserService.getByCpf(this.user.cpf).then(response => {
					this.user = response.data;
					this.user.birthDate = response.data.birthDate.slice(0, 10);
					this.selectedCpf = response.data.cpf;

				}).catch(err => {
          if (err && err.response && err.response.status == 404) {
            this.error(`Usuário de CPF: ${this.user.cpf} não encontrado!`);
            
          } else this.error('Erro ao buscar o usuário: ' + err);
				});
			}
		},
    submit() {
      if (this.userIsValid) this.saveUser();
    },
		saveUser() {
			if (this.selectedCpf == '') {
				UserService.postUser(this.user).then(() => {
					this.success('Usuário cadastrado com sucesso!');
					this.resetForm();

				}).catch(err => {
					this.error('Erro ao cadastrar usuário: ' + err);
				});

			} else {
				UserService.updateUser(this.user).then(() => {
					this.success('Usuário atualizado com sucesso!');

				}).catch(err => {
					this.error('Erro ao editar usuário: ' + err);
				});
			}
		},
		removeUser() {
			UserService.removeUser(this.selectedCpf).then(() => {
				this.success('Usuário removido com sucesso!');
				this.resetForm();

			}).catch(err => {
				this.error('Erro ao remover usuário: ' + err);
			});
		},
	},
	mounted() {
		this.getUserTypes()
	},
};
</script>

<style scoped>
.container {
  width: 95%;
}

.position-fixed {
  bottom: 10px;
  right: 20px;
}
</style>
