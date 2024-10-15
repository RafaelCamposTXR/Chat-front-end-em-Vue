<template>
  <div>
    <button @click="toggleSidebar">Abrir Sidebar</button>
    <Backdrop v-if="isBackdropVisible" @click="toggleSidebar" />
    <Sidebar v-show="isSidebarVisible" @close="toggleSidebar" :isVisible="isSidebarVisible" />
    <router-view /> <!-- Aqui é onde as views são renderizadas -->

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
</style>
