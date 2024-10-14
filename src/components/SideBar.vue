<template>
  <div class="sidebar" :class="{ open: isVisible }">
    <button class="close-btn" @click="closeSidebar">Fechar</button>
    <div class="content">
      <h2>Menu</h2>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closeSidebar() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: -300px; /* Inicialmente fora da tela */
  top: 0;
  width: 300px;
  height: 100%;
  background-color: #333;
  transition: left 0.3s ease;
  z-index: 101; /* Acima do backdrop */
}

.sidebar.open {
  left: 0; /* Quando visível, move-se para a esquerda */
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
</style>
