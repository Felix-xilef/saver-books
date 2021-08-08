import axios from "axios";
import store from "../store";

class AuthService {
	get authHeader() {
		const header = {};

		const token = localStorage.getItem('credentials').token;

		if (token) header.Authorization = 'Bearer ' + token;

		return header;
	}

	login(cpf, password) {
		return axios.post(process.env.VUE_APP_API_URL + 'authenticate', { cpf, password }).then(response => {
			if (response.data.token) {
				localStorage.setItem('credentials', response.data);

				store.commit('login');
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
}

export default new AuthService();
