<template>
  <div class="chat-container">
    <div class="chat-header">
      <h2>{{ chatUser }}</h2>
    </div>
    <transition-group name="fade" tag="div" class="messages">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message"
        :class="{ 'sent': message.isSent }"
      >
        <p>{{ message.text }}</p>
      </div>
    </transition-group>
    <div class="input-container">
      <input
        type="text"
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Digite sua mensagem..."
      />
      <button @click="sendMessage">Enviar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chatUser: {
      type: String,
      required: true
    },
    messages: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      newMessage: ''
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() === '') return;

      // Emit a new message to the parent component
      this.$emit('sendMessage', {
        text: this.newMessage,
        isSent: true
      });

      // Clear the input field
      this.newMessage = '';
    }
  }
};
</script>

<style scoped>
.chat-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  height: 400px;
}

.chat-header {
  background-color: #f1f1f1;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.message {
  margin: 5px 0;
}

.sent {
  text-align: right;
}

.input-container {
  display: flex;
  padding: 10px;
}

input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  margin-left: 5px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.fade-enter {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-leave-to {
  opacity: 0;
}
</style>