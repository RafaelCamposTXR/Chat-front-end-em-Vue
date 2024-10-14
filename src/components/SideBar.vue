<template>
  <transition name="slide-fade">
    <div v-if="isVisible" class="sidebar">
      <button class="close-btn" @click="closeSidebar">Fechar</button>
      <div class="content">
        <h2>Menu</h2>
        <ul>
          <li v-for="item in sidebarItems" :key="item.name">
            <router-link v-if="sidebarItems.length" :to="item.link">{{ item.name }}</router-link>
          </li>
          <li v-if="!sidebarItems.length">
            <p>No items available.</p>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      sidebarItems: [] // Para armazenar os itens da sidebar
    };
  },
  methods: {
    closeSidebar() {
      this.$emit('close');
    },
    fetchSidebarItems() {
      axios.get('/api/sidebar')
        .then(response => {
          this.sidebarItems = response.data; // Armazena os itens no estado
        })
        .catch(error => {
          console.error('Error fetching sidebar items:', error);
        });
    }
  },
  mounted() {
    this.fetchSidebarItems(); // Chama a função para obter os itens ao montar o componente
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0; /* Alinha à esquerda */
  top: 0;
  width: 300px;
  height: 100%;
  background-color: #333;
  z-index: 101; /* Acima do backdrop */
}

.close-btn {
  margin: 16px;
  background-color: #f00;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.content {
  padding: 16px;
  color: white;
}

.slide-fade-enter-active {
  transition: 3s ease;
}

.slide-fade-leave-active {
  transition: 0.2s ease;
}

.slide-fade-enter {
  opacity: 0;
  transform: translateX(-100%); 
}

.slide-fade-leave-to {
  opacity: 0.7;
  transform: translateX(-100%); 
}
</style>
