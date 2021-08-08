import { createApp } from 'vue';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import router from './router';
import store from './store';

import App from './App.vue';

createApp(App).use(store).use(router).mount('#app');
