import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'vue-toast-notification/dist/theme-sugar.css';

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createPinia } from 'pinia';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import ToastPlugin, { useToast } from 'vue-toast-notification';
import App from './App.vue'
import { router } from './router';
const app = Vue.createApp(App);
const pinia = createPinia();
app.use(BootstrapVue);
app.use(IconsPlugin);
app.use(VueAxios, axios);
app.use(ToastPlugin);
app.use(router);
pinia.use(({ store }) => {
    store.$toast = useToast();
    store.$token = localStorage.getItem('token') ?? "";
    store.$axios = axios;
    store.$base_url = "http://localhost:3000/api";
});
app.use(pinia);

app.mount('#app');