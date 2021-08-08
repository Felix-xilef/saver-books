import { createStore } from "vuex"

const store = createStore({
	state: {
		isLogged: false,
	},
	mutations: {
		login(state) {
			state.isLogged = true;
		},
		logout(state) {
			state.isLogged = false
		},
	},
});

export default store;
