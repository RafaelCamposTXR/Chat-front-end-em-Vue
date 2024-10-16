<template>
  <div>
    <h1>Página Inicial</h1>
    <p>{{ message }}</p>
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
</style>
