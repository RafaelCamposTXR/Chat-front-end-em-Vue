<template>
  <transition name="slide-fade">
    <div v-if="isVisible" class="sidebar">
      <button class="close-btn" @click="closeSidebar">Fechar</button>
      <div class="content">
        <h2 class="sidebar-titulo">Menu</h2>
        <ul>
          <li class="sidebar-item-pai" v-for="item in sidebarItems" :key="item.name">
            <router-link :to="item.link" class="sidebar-item">{{ item.name }}</router-link> <!-- Link clicável para cada item -->
          </li>
        </ul>
        <div v-if="!sidebarItems.length">
          <p>Carregando Conversas...</p> <!-- Placeholder para quando os itens não estão disponíveis -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const sidebarItems = ref([]); // Define um estado reativo para os itens da sidebar

    const fetchSidebarItems = async () => {
      try {
        const response = await axios.get('/api/sidebar'); // Chama a API para obter os itens
        sidebarItems.value = response.data; // Armazena os itens recebidos
      } catch (error) {
        console.error('Erro ao buscar itens da sidebar:', error);
        sidebarItems.value = []; // Define como vazio em caso de erro
      }
    };

    onMounted(() => {
      fetchSidebarItems(); // Chama a função ao montar o componente
    });

    const closeSidebar = () => {
      this.$emit('close');
    };

    return {
      sidebarItems,
      closeSidebar
    };
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 300px;
  height: 100%;
  background-color: #333;
  z-index: 101;
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


.sidebar-titulo {
  font-weight: 500;
  font-size: 1.8rem;
  margin: 0;
}

.sidebar-item-pai {
  list-style-type: none;
  margin: 2vh 0;
}

.sidebar-item {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 5vh 1vw;
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
