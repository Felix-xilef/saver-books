<template>
  <form class="container p-3" @submit.prevent="submit">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
      <div class="col  mb-4">
        <label class="form-label" for="txtCpf">
          CPF
        </label>
        <input
          class="form-control"
          :class="{ 'is-valid': controlIsValid('cpf'), 'is-invalid': controlHasError('cpf') }"
          type="text"
          name="txtCpf"
          id="txtCpf"
          v-model="client.cpf"
          placeholder="CPF do cliente"
					:disabled="selectedCpf != ''"
        />
        <div class="invalid-feedback">
          <span v-if="client.cpf == ''">
            O CPF é obrigatório
          </span>
          <span v-else>
            CPF inválido
          </span>
        </div>
      </div>

      <div class="col  mb-4">
        <label class="form-label" for="txtName">
          Nome
        </label>
        <input
          class="form-control"
          :class="{ 'is-valid': controlIsValid('name'), 'is-invalid': controlHasError('name') }"
          type="name"
          name="txtName"
          id="txtName"
          v-model="client.name"
          placeholder="nome do cliente"
        />
        <div class="invalid-feedback">
          O nome é obrigatório
        </div>
      </div>

      <div class="col  mb-4">
        <label class="form-label" for="txtPhone">
          Telefone
        </label>
        <input
          class="form-control"
          :class="{ 'is-valid': controlIsValid('phone'), 'is-invalid': controlHasError('phone') }"
          type="tel"
          name="txtPhone"
          id="txtPhone"
          v-model="client.phone"
          placeholder="telefone do cliente"
        />
        <div class="invalid-feedback">
          O Telefone é obrigatório
        </div>
      </div>

      <div class="col  mb-4">
        <label class="form-label" for="txtEmail">
          E-mail
        </label>
        <input
          class="form-control"
          :class="{ 'is-valid': controlIsValid('email'), 'is-invalid': controlHasError('email') }"
          type="email"
          name="txtEmail"
          id="txtEmail"
          v-model="client.email"
          placeholder="e-mail do cliente"
        />
        <div class="invalid-feedback">
          <span v-if="client.email == ''">
            O e-mail é obrigatório
          </span>
          <span v-else>
            E-mail inválido
          </span>
        </div>
      </div>

      <div class="col  mb-4">
        <label class="form-label" for="txtEmail">
          Data do início do bloqueio
        </label>
        <input
          class="form-control"
          type="date"
          name="txtBlockStart"
          id="txtBlockStart"
          v-model="client.blockStart"
          placeholder="data do início do bloqueio"
        />
      </div>

      <div class="col  mb-4">
        <label class="form-label" for="txtEmail">
          Data do fim do bloqueio
        </label>
        <input
          class="form-control"
          type="date"
          name="txtBlockEnd"
          id="txtBlockEnd"
          v-model="client.blockEnd"
          placeholder="data do fim do bloqueio"
        />
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
			<button v-if="selectedCpf != ''" class="btn p-0 m-2" type="submit">
				<img height="40" src="../shared/assets/saveButton.svg" alt="" />
			</button>

			<button
        v-if="selectedCpf != ''"
        class="btn p-0 m-2"
        :class="{ 'disabled': !clientIsValid }"
        type="button"
        @click="removeClient"
        :disabled="!clientIsValid"
      >
				<img height="40" src="../shared/assets/removeButton.svg" alt="" />
			</button>

			<button class="btn p-0 m-2" type="button" @click="getClient">
				<img height="40" src="../shared/assets/searchButton.svg" alt="" />
			</button>
		</div>
  </form>

  <alert :logMessage="log.message" :error="log.error" :success="log.success" :warning="log.warning" />
</template>

<script>
import Alert from '../shared/components/Alert.vue';
import ClientService from '../shared/services/ClientService';
import vuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import cpfValidator from '../shared/validators/cpfValidator';
export default {
  setup() { return { v$: vuelidate() } },
  components: { Alert },
  name: "ManageClients",
  data() {
    return {
      log: {
        message: '',
        error: false,
        success: false,
				warning: false,
      },
      client: {
        cpf: '',
        name: '',
        phone: '',
        email: '',
        blockStart: '',
        blockEnd: '',
      },
      selectedCpf: '',
      today: new Date(),
    };
  },
  validations() {
    return {
      client: {
        cpf: { required, cpfValidator, $autoDirty: true },
        name: { required, $autoDirty: true },
        phone: { required, $autoDirty: true },
        email: { required, email, $autoDirty: true },
      },
    }
  },
  computed: {
    clientIsValid() {
      return !this.v$.client.$invalid;
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
      this.client.cpf = '';
      this.client.name = '';
      this.client.phone = '';
      this.client.email = '';
      this.client.blockStart = '';
      this.client.blockEnd = '';

			this.selectedCpf = '';

      this.v$.client.$reset();
		},
    controlIsValid(attributeName) {
      return !this.v$.client[attributeName].$invalid && this.v$.client[attributeName].$dirty;
    },
    controlHasError(attributeName) {
      return this.v$.client[attributeName].$error;
    },
		getClient() {
			if (this.selectedCpf != '') this.warning('Antes de realizar uma busca limpe os campos');
			else {
				ClientService.getByCpf(this.client.cpf).then(response => {
					this.client = response.data;
					this.client.blockStart = response.data.blockStart ? response.data.blockStart.slice(0, 10) : '';
					this.client.blockEnd = response.data.blockEnd ? response.data.blockEnd.slice(0, 10) : '';

					this.selectedCpf = response.data.cpf;

				}).catch(err => {
					if (err.includes('404')) this.error(`Cliente de CPF: ${this.client.cpf} não encontrado!`);
					else this.error('Erro ao buscar o cliente: ' + err);
				});
			}
		},
    submit() {
      if (this.clientIsValid) this.saveClient();
    },
		saveClient() {
			if (this.selectedCpf == '') {
				ClientService.postClient(this.client).then(() => {
					this.success('Cliente cadastrado com sucesso!');
					this.resetForm();

				}).catch(err => this.error('Erro ao cadastrar cliente: ' + err));

			} else {
				ClientService.updateClient(this.client).then(() => {
					this.success('Cliente atualizado com sucesso!');

				}).catch(err => this.error('Erro ao editar cliente: ' + err));
			}
		},
		removeClient() {
			ClientService.removeClient(this.selectedCpf).then(() => {
				this.success('Cliente removido com sucesso!');
				this.resetForm();

			}).catch(err => this.error('Erro ao remover cliente: ' + err));
		},
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
