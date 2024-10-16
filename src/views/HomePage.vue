<template>
  <div>
    <h1 class="titulo-home">Abra o Menu para selecionar uma conversa</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: ''
    };
  },
  mounted() {
    axios.get('/api/teste')
      .then(response => {
        this.message = response.data; 
      })
      .catch(error => {
        console.error("Houve um erro!", error);
        this.message = 'Erro requisitando mensagem';
      });
  }
};
</script>
  

<style scoped>
  .titulo-home {
    font-size: 1.9rem;
  }
</style>
