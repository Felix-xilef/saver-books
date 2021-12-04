import axios from "axios";
import store from "../../store";

class AuthService {
	get authHeader() {
		const header = {};

		const token = localStorage.getItem('token');

		if (token) header.Authorization = 'Bearer ' + token;

		return header;
	}

	login(cpf, password) {
		return axios.post(process.env.VUE_APP_API_URL + 'authenticate', { cpf, password }).then(response => {
			if (response.data.token) {
				localStorage.setItem('token', response.data.token);

				store.commit('login', response.data.user);
			}

			return true;

		}).catch(() => {
			store.commit('logout');

			return false;
		});
	}

	logout() {
		localStorage.clear();

		store.commit('logout');
	}

	async verifyCredentials() {
		const token = localStorage.getItem('token');

		if (token) {
			return axios.post(process.env.VUE_APP_API_URL + 'authenticate', { token }).then(response => {
				if (response.data.user) {
					store.commit('login', response.data.user);
					return true;

				} else return false;

			}).catch(() => {
				return false;
			});

		} else return false;
	}
}

export default new AuthService();
