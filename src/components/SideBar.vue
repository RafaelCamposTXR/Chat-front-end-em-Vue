<template>
  <transition name="slide-fade">
    <div v-if="isVisible" class="sidebar">
      <div class="content">
        <h2 class="sidebar-titulo">Conversas</h2>
        <ul class="sidebar-lista">
          <li class="sidebar-item-pai" v-for="item in sidebarItems" :key="item.id">
            <router-link :to="`/chat/${item.id}/${item.user}`" class="sidebar-item">
              <div class="item-content">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-user">Acessando como {{ item.user }}</span> <!-- Nome do usuário -->
              </div>
            </router-link>
          </li>
        </ul>
        <div v-if="!sidebarItems.length" class="loading-message">
          <p>Carregando Conversas...</p>
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
    const sidebarItems = ref([]);

    const fetchSidebarItems = async () => {
      try {
        const response = await axios.get('/api/sidebar');
        sidebarItems.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar itens da sidebar:', error);
        sidebarItems.value = [];
      }
    };

    onMounted(() => {
      fetchSidebarItems();
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
  width: 260px;
  height: 100%;
  background-color: #1e1e2d;
  color: #ffffff;
  z-index: 101;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
}

.content {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.sidebar-titulo {
  font-weight: 600;
  font-size: 1.6rem;
  margin: 0 0 2.1vh 0;
  color: #f4f4f9;
  letter-spacing: 0.05rem;
}

.sidebar-lista {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden; /* Adicionado overflow-x: hidden */
}

.sidebar-item-pai {
  margin-bottom: 1rem;
  transition: transform 0.2s;
}

.sidebar-item-pai:hover {
  transform: scale(1.01);
}

.sidebar-item {
  color: #d1d1d6;
  font-size: 1.1rem;
  text-decoration: none;
  padding: 1.5vh 1vw;
  display: block;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s, color 0.3s;
}

.sidebar-item:hover {
  background-color: #2f2f3e;
  color: #ffffff;
}

/* Novo estilo para a divisão do conteúdo de cada item da sidebar */
.item-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.item-name {
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
}

.item-user {
  font-size: 0.9rem;
  color: #b0b0b0;
  text-align: right;
}

/* Estilo de mensagem de carregamento */
.loading-message {
  text-align: center;
  font-size: 1rem;
  color: #bbbbbb;
  margin-top: 2rem;
}

/* Animação de transição suave */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* Scroll customizado para a lista */
.sidebar-lista {
  overflow-y: auto;
  max-height: calc(100vh - 150px);
  scrollbar-width: thin;
  scrollbar-color: #444 #2f2f3e;
}

.sidebar-lista::-webkit-scrollbar {
  width: 8px;
}

.sidebar-lista::-webkit-scrollbar-thumb {
  background-color: #444;
  border-radius: 10px;
}

.sidebar-lista::-webkit-scrollbar-track {
  background-color: #2f2f3e;
}
</style>
