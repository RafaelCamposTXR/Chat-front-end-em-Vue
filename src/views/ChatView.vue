<template>
  <div class="chat-view">
    <Chat
      v-if="selectedChat"
      :chatUser="selectedChat.user"
      :messages="selectedChat.messages"
      @sendMessage="addMessage"
    />
    <div class="chat-list">
      <h2>Conversas</h2>
      <ul>
        <li
          v-for="(chat, index) in chats"
          :key="index"
          @click="selectChat(chat)"
        >
          {{ chat.user }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Chat from '../components/ChatComponent.vue';

export default {
  components: {
    Chat
  },
  data() {
    return {
      chats: [
        {
          user: 'Usuário 1',
          messages: []
        },
        {
          user: 'Usuário 2',
          messages: []
        }
      ],
      selectedChat: null
    };
  },
  methods: {
    selectChat(chat) {
      this.selectedChat = chat;
    },
    addMessage(message) {
      if (this.selectedChat) {
        this.selectedChat.messages.push(message);
      }
    }
  }
};
</script>

<style scoped>
.chat-view {
  display: flex;
  height: 100vh;
}

.chat-list {
  width: 200px;
  border-right: 1px solid #ccc;
  padding: 10px;
}

.chat-list ul {
  list-style-type: none;
  padding: 0;
}

.chat-list li {
  padding: 10px;
  cursor: pointer;
}

.chat-list li:hover {
  background-color: #f1f1f1;
}

.chat {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>