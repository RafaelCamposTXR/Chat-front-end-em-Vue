<template>
  <div>
    <button @click="toggleSidebar" class="sidebar-button">☰</button> <!-- Ícone de menu -->
    <Backdrop v-if="isBackdropVisible" @click="toggleSidebar" />
    <Sidebar v-show="isSidebarVisible" @close="toggleSidebar" :isVisible="isSidebarVisible" />
    <router-view />
  </div>
</template>

<script>
import Backdrop from './components/BackdropSidebar.vue';
import Sidebar from './components/SideBar.vue';

export default {
  components: { Backdrop, Sidebar },
  data() {
    return {
      isSidebarVisible: false,
      isBackdropVisible: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
      this.isBackdropVisible = !this.isBackdropVisible;
    }
  }
};
</script>

<style>
* {
  font-family: "Afacad Flux", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
}

.sidebar-button {
  background-color: transparent;
  border: 1px solid #ccc; /* Borda sutil */
  color: #333;
  padding: 8px 12px; /* Espaçamento */
  border-radius: 5px; /* Borda arredondada */
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; /* Transição suave */
}

.sidebar-button:hover {
  background-color: rgba(0, 0, 0, 0.1); /* Efeito ao passar o mouse */
  color: #000; /* Muda a cor do texto */
}
</style>
