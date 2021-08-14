<template>
  <form class="container p-3" @submit.prevent="saveUser">
    <div class="row">
      <div class="col-3">
        <label class="form-label" for="txtCpf"> CPF </label>
        <input
          class="form-control"
          type="text"
          name="txtCpf"
          id="txtCpf"
          v-model="user.cpf"
          placeholder="CPF do usuário"
					:disabled="selectedCpf != ''"
					required
        />
      </div>
      <div class="col">
        <label class="form-label" for="txtName"> Nome </label>
        <input
          class="form-control"
          type="name"
          name="txtName"
          id="txtName"
          v-model="user.name"
          placeholder="nome do usuário"
					required
        />
      </div>
      <div class="col-3">
        <label class="form-label" for="txtbirthDate"> Data de Nascimento </label>
        <input
          class="form-control"
          type="date"
          name="txtbirthDate"
          id="txtbirthDate"
          v-model="user.birthDate"
					required
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-3">
        <label class="form-label" for="txtPhone"> Telefone </label>
        <input
          class="form-control"
          type="tel"
          name="txtPhone"
          id="txtPhone"
          v-model="user.phone"
          placeholder="telefone do usuário"
					required
        />
      </div>
      <div class="col">
        <label class="form-label" for="txtEmail"> E-mail </label>
        <input
          class="form-control"
          type="email"
          name="txtEmail"
          id="txtEmail"
          v-model="user.email"
          placeholder="e-mail do usuário"
					required
        />
      </div>
      <div class="col-3">
        <label class="form-label" for="selectUserType"> Tipo de Usuário </label>
        <select v-model="user.userType.id" class="form-select" name="selectUserType" id="selectUserType" required>
          <option
            v-for="type in userTypes"
            :key="type.id"
            :value="type.id"
          >
            {{ type.description }}
          </option>
        </select>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-3">
        <label class="form-label" for="txtPassword"> Senha </label>
        <input
          class="form-control"
          type="password"
          name="txtPassword"
          id="txtPassword"
          v-model="user.password"
          placeholder="digite a senha"
					required
        />
      </div>
      <div class="col-3">
        <label class="form-label" for="txtPasswordConfirmation">
          Confirmação da Senha
        </label>
        <input
          class="form-control"
          type="password"
          name="txtPasswordConfirmation"
          id="txtPasswordConfirmation"
          v-model="passwordConfirmation"
          placeholder="confirme a senha"
					required
        />
      </div>
    </div>
		<div class="d-flex justify-content-end mt-4">
			<button
          class="btn text-white backgroundGradientBlue"
          type="button"
					@click="resetForm"
        >
          Limpar Campos
        </button>
		</div>
		<div class="position-fixed">
			<button class="btn p-0 m-2" type="submit">
				<img height="40" src="../shared/assets/saveButton.svg" alt="" />
			</button>
			<button v-if="selectedCpf != ''" class="btn p-0 m-2" type="button" @click="removeUser">
				<img height="40" src="../shared/assets/removeButton.svg" alt="" />
			</button>
			<button class="btn p-0 m-2" type="button" @click="getUser">
				<img height="40" src="../shared/assets/searchButton.svg" alt="" />
			</button>
		</div>
  </form>

  <alert :logMessage="log.message" :error="log.error" :success="log.success" :warning="log.warning" />
</template>

<script>
import Alert from '../shared/components/Alert.vue';
import SubTypesService from '../shared/services/SubTypesService';
import UserService from '../shared/services/UserService';
export default {
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
			passwordConfirmation: '',
    };
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
			this.user = {
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
      }
			this.selectedCpf = ''
			this.passwordConfirmation = ''
		},
		getUserTypes() {
			SubTypesService.getUserTypes().then(response => {
				this.userTypes = response.data;

			}).catch(err => {
				this.error('Erro ao listar tipos de usuário: ' + err);
			});
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
		getUser() {
			if (this.selectedCpf != '') this.warning('Antes de realizar uma busca limpe os campos');
			else {
				UserService.getByCpf(this.user.cpf).then(response => {
					this.user = response.data
					this.user.birthDate = response.data.birthDate.slice(0, 10)
					this.selectedCpf = response.data.cpf
					this.passwordConfirmation = response.data.password;

				}).catch(err => {
					if (err.includes('404')) this.error(`Usuário de CPF: ${this.user.cpf} não encontrado!`);
					else this.error('Erro ao buscar o usuário: ' + err);
				});
			}
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
  bottom: 0px;
  right: 20px;
}
</style>
