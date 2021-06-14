<template>
  <navbar-return />
	<div class="container p-3">
		<div class="row">
			<div class="col-3">
				<label class="form-label" for="txtCpf">
					CPF
				</label>
				<input class="form-control" type="text" name="txtCpf" id="txtCpf" :value="user.cpf" placeholder="CPF do usuário">
			</div>
			<div class="col">
				<label class="form-label" for="txtName">
					Nome
				</label>
				<input class="form-control" type="name" name="txtName" id="txtName" :value="user.name" placeholder="nome do usuário">
			</div>
			<div class="col-3">
				<label class="form-label" for="txtBirth">
					Data de Nascimento
				</label>
				<input class="form-control" type="date" name="txtBirth" id="txtBirth" :value="user.birth">
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-3">
				<label class="form-label" for="txtPhone">
					Telefone
				</label>
				<input class="form-control" type="tel" name="txtPhone" id="txtPhone" :value="user.phone" placeholder="telefone do usuário">
			</div>
			<div class="col">
				<label class="form-label" for="txtEmail">
					E-mail
				</label>
				<input class="form-control" type="email" name="txtEmail" id="txtEmail" :value="user.email" placeholder="e-mail do usuário">
			</div>
			<div class="col-3">
				<label class="form-label" for="selectUserType">
					Tipo de Usuário
				</label>
				<select class="form-select" name="selectUserType" id="selectUserType">
					<option
						v-for="type in userTypes"
						:key="type.id"
						:value="type.id"
						:selected="user.userType.id == type.id"
					>
						{{ type.description }}
					</option>
				</select>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-3">
				<label class="form-label" for="txtPassword">
					Senha
				</label>
				<input class="form-control" type="password" name="txtPassword" id="txtPassword" :value="user.password" placeholder="digite a senha">
			</div>
			<div class="col-3">
				<label class="form-label" for="txtPasswordConfirmation">
					Confirmação da Senha
				</label>
				<input class="form-control" type="password" name="txtPasswordConfirmation" id="txtPasswordConfirmation" :value="user.passwordConfirmation" placeholder="confirme a senha">
			</div>
		</div>
	</div>
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
import NavbarReturn from './NavbarReturn.vue'
export default {
  components: { NavbarReturn },
	name: 'ManageUsers',
	data() {
		return {
			user: {
				cpf: '',
				name: '',
				birth: '',
				phone: '',
				email: '',
				userType: {
					id: '',
					description: '',
				},
				password: '',
				passwordConfirmation: '',
			},
			userTypes: [
				{
					id: 1,
					description: 'Gerente',
				},
				{
					id: 1,
					description: 'Bibliotecário',
				},
			],
		}
	},
}
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
