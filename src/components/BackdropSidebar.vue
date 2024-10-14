<template>
  <transition name="fade" @before-leave="beforeLeave">
    <div class="backdrop" @click="onClick">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: true
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #4c4f5c62;
  z-index: 100;
  backdrop-filter: blur(1.8px);
  cursor: default;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
