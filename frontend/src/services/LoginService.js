import UserService from "./UserService"

var isLoggedNow = false;

export default {
	async login(cpf, password) {
		await UserService.getByCpf(cpf).then(response => {
			if (response.data.password == password) {
				isLoggedNow = true
				localStorage.cpf = response.data.cpf
				localStorage.password = response.data.password
				localStorage.userTypeId = response.data.userType.id
			}
		}).catch(error => {
			if (error.status != 404) {
				return error
			}
		})
	},

	logout() {
		isLoggedNow = false;
		localStorage.clear();
	},

	async isLogged() {
		if (!isLoggedNow) {
			if (localStorage.cpf && localStorage.password) {
				await this.login(localStorage.cpf, localStorage.password).then(response => {
					if (response) {
						alert('Erro ao realizar login')
					}
					return isLoggedNow
				})
			}
		}
		return isLoggedNow
	},
}
