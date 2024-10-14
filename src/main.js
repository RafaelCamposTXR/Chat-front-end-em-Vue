import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa o router

const app = createApp(App);
app.use(router); // Adiciona o router à aplicação
app.mount('#app');

