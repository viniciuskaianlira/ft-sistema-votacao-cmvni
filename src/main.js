import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast from "vue-toastification";
// Importar o CSS da biblioteca de toast
import "vue-toastification/dist/index.css";

import './assets/tailwind.css';
import { createPinia } from 'pinia'

// Configurações opcionais para o toast (se necessário)
const options = {
    // Você pode definir opções globais aqui, como posição, tempo limite, etc.
    // Exemplo: position: "top-right", timeout: 5000
};

createApp(App)
  .use(createPinia())
  .use(router)
  .use(Toast, options) // Adicionar o plugin de toast
  .mount('#app');

