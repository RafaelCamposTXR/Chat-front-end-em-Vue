<template>
  <div>
    <button @click="toggleSidebar">Abrir Sidebar</button>
    <Backdrop v-if="isBackdropVisible" @click="toggleSidebar" />
    <Sidebar v-show="isSidebarVisible" @close="toggleSidebar" :isVisible="isSidebarVisible" />
    <p> Texto muuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuito longo</p>
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
/* Estilos globais, se necessário */
</style>
