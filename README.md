<h2 align="center">Autenticação de usuário e sistema de posts e comentários</h2>

___




<h3 align="center">
  <a href="#information_source-sobre">Sobre</a>&nbsp;|&nbsp;
  <a href="#seedling-requisitos-mínimos">Requisitos</a>&nbsp;|&nbsp;
  <a href="#rocket-tecnologias-utilizadas">Tecnologias</a>&nbsp;|&nbsp;
  <a href="#link-como-contribuir">Rodando o código</a>&nbsp;|&nbsp;
</h3>

___


## :information_source: Sobre

Foi proposto para que os canditados façam um sistema de autenticação de usuários com web Tokens e um sistema de postagens de conteúdo e comentários de postagens partindo do principio que só será possível adicionar, editar ou excluir comentários ou postagens caso o token seja válido.


## :seedling: Requisitos Mínimos

Nodejs v16.15,
MySQL v2.3,
Workbench para importar o banco de dados,
Postman ou Insomnia para requisições das APIs.

## :rocket: Tecnologias Utilizadas 

O projeto foi desenvolvido utilizando as seguintes tecnologias

- Nodejs, Express, Sequelize, MySQL

## :link: Rodando o código

- Clone em sua maquina local, o repositorio do git.
- Importe o banco de dados no workbench
- Crie um arquivo .env para utilizar as váriaveis(eu subi este arquivo ao git para usar como exemplo mas tenho entendimento que esse arquivo geralmente não é publicado)
- dê npm install para que o ambiente seja preparado e em seguida npm start.
- Faça um commit com suas mudanças


## Rotas

- No arquivo de rotas, possui todas as rotas de GET, POST, PUT, DELETE de usuários, posts e comentários.

## Autenticação

- Para gerar um token deve primeiro:
    - Criar um usúario com Nome, E-mail e senha
    - Acessar a rota de /login passando e-mail e senha
    - Caso tenha passado e-mail e senha corretos, será gerado um token que ficará disponivel no headers em authorization
    - Será necessário copiar esse token e enviar em todos os cabeçalhos de todas as requisições.
    - Caso o token esteja errado, não será possivel listar, adicionar ou apagar posts e comentários.

- A unica rota que não será necessário autenticação é a rota de listagens de posts e quantidade de comentários por posts.
    - rota: "/listPosts".

# Suporte

- Caso precise de minha ajuda, meu e-mail é laysa.santos919@gmail.com.