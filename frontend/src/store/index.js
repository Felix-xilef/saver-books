import { createStore } from "vuex"

const store = createStore({
	state: {
		isLogged: false,
		user: false,
	},
	mutations: {
		login(state, user) {
			state.isLogged = true;
			state.user = user;
		},
		logout(state) {
			state.isLogged = false;
			state.user = false;
		},
	},
});

export default store;
