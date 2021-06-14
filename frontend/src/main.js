import { createApp } from 'vue'
import { createStore } from 'vuex'

import 'es6-promise/auto'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import router from './router'

import App from './App.vue'

const store = createStore({
    state: {
        isLogged: false,
        filter: '',
    },
})

createApp(App).use(router).use(store).mount('#app')
