<template>
  <div class="chat-view">
    <h1>Chat ID: {{ chatId }}</h1>
    <div v-if="messages.length">
      <div v-for="msg in messages" :key="msg.id">
        <strong>{{ msg.autor }}:</strong> {{ msg.conteudo }}
      </div>
    </div>
    <input v-model="newMessage" placeholder="Digite sua mensagem..." />
    <button @click="sendMessage">Enviar</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute(); // Obtém a rota atual
    const chatId = route.params.id; // Extrai o ID do chat da rota
    const messages = ref([]);
    const newMessage = ref('');

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/mensagens/chat/${chatId}`);
        messages.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
      }
    };

    const sendMessage = async () => {
      if (newMessage.value.trim() === '') return; // Verifica se a mensagem não está vazia

      const message = {
        autor: 'Usuário', // Pode ser alterado conforme necessário
        conteudo: newMessage.value,
        chatId: chatId
      };

      try {
        const response = await axios.post('/api/mensagens/enviarmensagem', message);
        messages.value.push(response.data);
        newMessage.value = ''; // Limpa o campo de entrada
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    };

    onMounted(() => {
      fetchMessages(); // Carrega as mensagens ao montar a view
    });

    return {
      chatId,
      messages,
      newMessage,
      sendMessage
    };
  }
};
</script>

<style scoped>
/* Estilos para a view de chat */
.chat-view {
  padding: 20px;
}
</style>
