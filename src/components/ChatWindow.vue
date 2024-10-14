<template>
  <div class="chat-window">
    <div class="chat-box">
      <div v-for="(message, index) in messages" :key="index" class="message" :class="{'user': message.sender === 'user', 'ai': message.sender === 'ai'}">
        <p>{{ message.text }}</p>
      </div>
    </div>
    <div class="input-area">
      <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="Digite sua mensagem..."/>
      <button @click="sendMessage">Enviar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMessage: '',    // Armazena a mensagem do usuário
      messages: []        // Histórico de mensagens
    };
  },
  methods: {
    async sendMessage() {
      if (this.userMessage.trim() === '') return; // Evita mensagens vazias

      // Adiciona a mensagem do usuário ao histórico
      this.messages.push({ sender: 'user', text: this.userMessage });

      const userMessageCopy = this.userMessage;
      this.userMessage = '';  // Limpa o campo de input

      try {
        // Envia a mensagem para o backend (simulação de IA)
        const response = await fetch('/api/send-message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessageCopy })
        });
        const data = await response.json();

        // Adiciona a resposta da IA ao histórico
        this.messages.push({ sender: 'ai', text: data.response });
      } catch (error) {
        this.messages.push({ sender: 'ai', text: 'Erro ao enviar mensagem.' });
      }
    }
  }
}
</script>

<style scoped>
.chat-window {
  width: 35vw;
  margin: 0 auto;
  border: 1px solid #ddd;
  padding: 3vh 2vw;
  display: flex;
  flex-direction: column;
}
.chat-box {
  flex-grow: 1;
  overflow-y: auto;
  max-height: 400px;
  margin-bottom: 10px;
}
.message {
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}
.message.user {
  background-color: #d1e7dd;
  text-align: right;
}
.message.ai {
  background-color: #f8d7da;
  text-align: left;
}
.input-area {
  display: flex;
  justify-content: space-between;
}
input {
  flex-grow: 1;
  padding: 5px;
}
button {
  margin-left: 10px;
}
</style>
