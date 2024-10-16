# Projeto de Prova de Conceito - Chat Local com Escolha de Usuário (front-end)

## Descrição

Este projeto é uma prova de conceito em andamento, executado localmente, utilizando Vue.js para o front-end e Java com o framework Spring Boot para o back-end. O back-end é estruturado segundo o padrão MVC, escolhido para facilitar a manutenção e escalabilidade da aplicação. O banco de dados integrado H2 é utilizado, proporcionando uma alternativa leve e de fácil conexão. Por se tratar de um projeto em pequena escala e executado localmente, certas funcionalidades são feitas de maneira mais simples, e não existem métodos de segurança robustos implementados. No front-end, um menu de conversas permite ao usuário selecionar o destinatário e o perfil que será assumido durante a interação. 

## Funcionalidades

- Seleção do destinatário e perfil de usuário para a conversa.
- Sincronização entre as conversas, enviando informações para as entidades de chat e conversa no back-end.
- Comunicação eficiente com o back-end utilizando Axios.
- 
- Funcionalidades em desenvolvimento:
  - Criação de novos chats.
  - Exclusão de chats existentes.
  - Edição de mensagens em andamento.

## Tecnologias Utilizadas

- **Front-end:** Vue.js
- **Back-end:** Java com Spring Boot
- **Banco de Dados:** H2
- **Comunicação:** Axios

## Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/)

### Configuração front-end:
1. Navegue até a pasta do front-end do projeto.
2. Instale as dependências:
npm install
3. Inicie o servidor de desenvolvimento (já configurado para não conflitar com o servidor local do back-end:
npm run serve

### Configuração Back-end:

Clone o Repositório back-end e deixe-o rodando localmente
