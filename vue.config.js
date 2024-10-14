const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000, // Porta do fornt-end
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Porta do Spring Boot
        changeOrigin: true,
        pathRewrite: { '^/api': '' } 
      }
    }
  }
});
