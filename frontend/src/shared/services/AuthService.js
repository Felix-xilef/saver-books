import axios from "axios";
import store from "../../store";

class AuthService {
	get authHeader() {
		const header = {};

		const token = JSON.parse(localStorage.getItem('credentials')).token;

		if (token) header.Authorization = 'Bearer ' + token;

		return header;
	}

	login(cpf, password) {
		return axios.post(process.env.VUE_APP_API_URL + 'authenticate', { cpf, password }).then(response => {
			if (response.data.token) {
				localStorage.setItem('credentials', JSON.stringify(response.data));

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
		const credentials = JSON.parse(localStorage.getItem('credentials'));

		if (credentials?.token && credentials?.user) try {
			await axios.post(process.env.VUE_APP_API_URL + 'authenticate', { token: credentials.token });
			
			store.commit('login', credentials.user);
			return true;

		} catch {
			return false;
		}
		else return false;
	}
}

export default new AuthService();
