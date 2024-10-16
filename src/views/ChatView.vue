<template>
  <div class="chat-view">
    <div class="header">
      <h3 class="chat-name">{{ currentChatName }}</h3> <!-- Nome da conversa -->
      <h4 class="user-info">Você está acessando como {{ user }}</h4> <!-- Informação do usuário -->
    </div>

    <div v-if="messages.length" class="messages">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="{'message-user': msg.autor === user, 'message': msg.autor !== user}" 
      >
        <div v-if="msg.autor !== user" class="message-header">
          <strong>{{ msg.autor }}</strong>
        </div>
        <span>{{ msg.conteudo }}</span>
      </div>
    </div>

    <div class="area-input">
      <input v-model="newMessage" placeholder="Digite sua mensagem..." @keydown.enter="sendMessage" />
      <button @click="sendMessage">Enviar</button>
    </div>  
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const chatId = ref(route.params.id);
    const user = ref(route.params.user);
    const messages = ref([]);
    const newMessage = ref('');
    const currentChatName = ref(''); // Nome da conversa

    // Função para buscar mensagens
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/mensagens/chat/${chatId.value}`);
        messages.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
      }
    };

    // Função para buscar o nome da conversa
    const fetchCurrentChatName = async () => {
      try {
        const response = await axios.get('/api/sidebar');
        const chat = response.data.find(item => item.user === user.value); // Busca o item correspondente ao usuário
        if (chat) {
          currentChatName.value = chat.name; // Atualiza o nome da conversa
        }
      } catch (error) {
        console.error('Erro ao buscar nome da conversa:', error);
      }
    };

    // Função para enviar mensagem
    const sendMessage = async () => {
      if (newMessage.value.trim() === '') return;

      const message = {
        autor: user.value,
        conteudo: newMessage.value,
        chatId: chatId.value
      };

      try {
        const response = await axios.post('/api/mensagens/enviarmensagem', message);
        messages.value.push(response.data);
        newMessage.value = '';
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    };

    onMounted(() => {
      fetchMessages(); // Chama a função para buscar mensagens ao montar o componente
      fetchCurrentChatName(); // Chama a função para buscar o nome da conversa
    });

    watch(
      () => route.params.id,
      (newId) => {
        chatId.value = newId;
        fetchMessages(); // Recarrega as mensagens ao mudar o chatId
        fetchCurrentChatName(); // Atualiza o nome da conversa
      }
    );

    watch(
      () => route.params.user,
      (newUser) => {
        user.value = newUser;
        fetchCurrentChatName(); // Atualiza o nome da conversa ao mudar o usuário
      }
    );

    return {
      chatId,
      user,
      messages,
      newMessage,
      currentChatName,
      sendMessage
    };
  }
};
</script>

<style scoped>
.chat-view {
  padding: 2vh 1.3vw;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 600px;
  margin: auto;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.1vh; /* Posiciona os elementos no início */
  padding: 0.5vh 0.5vw; /* Reduz a margem interna */
  margin-bottom: 3vh; /* Margem inferior */
}

.chat-name {
  margin: 0;
  text-align: left; /* Alinhado à esquerda */
  font-size: 1.8rem; /* Tamanho maior para o nome da conversa */
  font-weight: 500;
  cursor: default;
}

.user-info {
  margin: 0;
  text-align: right; 
  font-size: 1rem; 
  opacity: 0.7; 
  cursor: default;
}

.messages {
  display: flex;
  flex-direction: column;
  max-height: 40vh;
  overflow-y: auto;
  margin-bottom: 3vh;
  padding: 2vh 0.35vw;
  gap: 1vh;
}

.message {
  margin: 0 0 0.7vh 0vw;
  align-self: start;
  background-color: #cfd0d062;
  padding: 1.2vh 0.75vw;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.message-header {
  position: relative;
  font-size: 0.95rem;
  color: #333;
  margin-bottom: 0.5vh;
}

.message-user {
  margin: 0 0 0.7vh 0vw;
  justify-self: end;
  align-self: flex-end;
  background-color: #2b2b42; 
  color: white;
  padding: 1.2vh 1vw;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.area-input {
  display: flex;
  flex-direction: column;
  padding: 0 0.25vw;
  gap: 1.3vh;
}

input {
  padding: 1.5vh 0.6vw;
  font-size: 1.1rem;
  border-radius: 5px;
}

button {
  background-color: #2b2b42;
  color: white;
  padding: 1vh 1.5vw;
  font-size: 1rem;
  border-radius: 5px;
  align-self: end;
}
</style>
