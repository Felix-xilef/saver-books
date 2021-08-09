import { createStore } from "vuex"

const store = createStore({
	state: {
		isLogged: false,
		user: null,
	},
	mutations: {
		login(state, user) {
			state.isLogged = true;
			state.user = user;
		},
		logout(state) {
			state.isLogged = false;
			state.user = null;
		},
	},
});

export default store;
