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
			<button
        v-if="selectedCpf != ''"
        class="btn p-0 m-2 roundFloat"
        :class="[ clientIsValid ? 'backgroundGradientGreen' : 'backgroundGradientDisabled' ]"
        type="submit"
        :disabled="!clientIsValid"
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
        :class="[ clientIsValid ? 'backgroundGradientRed' : 'backgroundGradientDisabled' ]"
        type="button"
        @click="removeClient"
        :disabled="!clientIsValid"
      >
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
			</button>

			<button class="btn p-0 m-2 roundFloat backgroundGradientBlue" type="button" @click="getClient">
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
          if (err && err.response && err.response.status == 404) {
            this.error(`Cliente de CPF: ${this.client.cpf} não encontrado!`);
            
          } else this.error('Erro ao buscar o cliente: ' + err);
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
  bottom: 10px;
  right: 20px;
}
</style>
