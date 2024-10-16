<template>
  <div class="titulo-home-pai">
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
    axios.get('/api/sidebar')
      .then(response => {
        this.message = response.data; 
      })
      .catch(error => {
        console.error("Houve um erro!", error);
        this.message = 'Erro acessando porta 8080 (back-end)';
      });
  }
};
</script>
  

<style scoped>

  .titulo-home-pai {
    display: flex;
    position: relative;
    justify-content: center;
    top: 9vh;
  }
  .titulo-home {
    font-size: 1.9rem;
  }
</style>
