<template>
  <div>
    <button @click="toggleSidebar" class="sidebar-button">☰</button> 
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
  font-size: 1rem;
  background-color: transparent;
  border: 2px solid #ccc; 
  color: #333;
  padding: 1vh 0.8vw; 
  border-radius: 5px; 
  cursor: pointer;
  margin: 1vh 0 0 0.5vw;
  transition: background-color 0.3s, color 0.3s; 
}

.sidebar-button:hover {
  background-color: rgba(0, 0, 0, 0.1); 
  color: #000; 
}
</style>
