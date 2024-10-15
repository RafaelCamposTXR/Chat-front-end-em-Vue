<template>
  <div class="chat-view">
    <h1>Chat ID: {{ chatId }}</h1>
    <h2>Usuário: {{ user }}</h2> <!-- Exibe o usuário atual -->
    
    <div v-if="messages.length" class="messages">
      <div v-for="msg in messages" :key="msg.id" class="message">
        <!-- Verificando se msg.autor está presente -->
        <strong v-if="msg.autor">{{ msg.autor }}:</strong> 
        <span>{{ msg.conteudo }}</span>
      </div>
    </div>
    
    <input v-model="newMessage" placeholder="Digite sua mensagem..." @keydown.enter="sendMessage" />
    <button @click="sendMessage">Enviar</button>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute(); // Obtém a rota atual
    const chatId = ref(route.params.id); // Captura o ID do chat
    const user = ref(route.params.user); // Captura o usuário da URL
    const messages = ref([]);
    const newMessage = ref('');

    // Função para buscar mensagens
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/mensagens/chat/${chatId.value}`);
        messages.value = response.data; // Supondo que o campo 'autor' já esteja presente aqui
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
      }
    };

    // Função para enviar mensagem
    const sendMessage = async () => {
      if (newMessage.value.trim() === '') return; // Verifica se a mensagem não está vazia

      const message = {
        autor: user.value,  // O autor agora será o usuário da rota
        conteudo: newMessage.value,
        chatId: chatId.value
      };

      try {
        const response = await axios.post('/api/mensagens/enviarmensagem', message);
        messages.value.push(response.data); // Adiciona a nova mensagem à lista de mensagens
        newMessage.value = ''; // Limpa o campo de entrada
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    };

    onMounted(() => {
      fetchMessages(); // Carrega as mensagens ao montar o componente
    });

    // Observa mudanças na rota para recarregar mensagens e alterar chatId e user
    watch(
      () => route.params.id,
      (newId) => {
        chatId.value = newId;
        fetchMessages();
      }
    );

    watch(
      () => route.params.user,
      (newUser) => {
        user.value = newUser; 
      }
    );

    return {
      chatId,
      user,
      messages,
      newMessage,
      sendMessage
    };
  }
};
</script>

<style scoped>
.chat-view {
  padding: 16px;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 600px;
  margin: auto;
}

.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  margin-bottom: 5px;
}

input {
  width: calc(100% - 60px);
  padding: 10px;
}

button {
  padding: 10px;
}
</style>
