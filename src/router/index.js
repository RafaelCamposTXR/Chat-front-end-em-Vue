import { createRouter, createWebHistory } from 'vue-router';


import Home from '../views/HomePage.vue'; 
import ChatView from '../views/ChatView.vue';



const routes = [
  { path: '/', component: Home },
  { path: '/about', component: Home },
  { path: '/services', component: ChatView},

];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
