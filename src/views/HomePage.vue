<template>
  <div class="home">
    <h1>Bem-vindo ao Chatbot!</h1>
    <p>Converse com a IA abaixo:</p>
    <ChatWindow />
  </div>
</template>

<script>

import ChatWindow from '../components/ChatWindow.vue';

export default {
  components: {
    ChatWindow
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  margin: 20px;
}

h1 {
  font-size: 2.5em;
}

p {
  font-size: 1.2em;
}
</style>
