import './assets/main.css';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import Aura from '@primevue/themes/aura';

import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(ToastService);

app.mount('#app');
