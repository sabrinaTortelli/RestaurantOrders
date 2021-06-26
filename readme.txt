- Instalar node na maquina
(os proximos passos a principio criam e modificam arquivos que ja criei e ja estão modifcados, mas é bom rodar para garantir que tudo está sendo linkado. Antes de rodar o comando vejam o package.json, todas as dependencias e scripts devem estar lá. Todos os comandos são rodados dentro da pasta do projeto)
- Depois de copiar a pasta do projeto, navegar até ela no terminal e digitar npm init
- rodar npm install express --save para instalar a dependencia do express
- rodar npm install nodemon --save-dev para instalar nodemon (ai não precisa ficar subindo e descendo o server, ele aplica as mudanças quando salvamos nos arquivos) para subir o server que vai estar no localhost:3000 é só digitar nodemon server.js no terminal
- rodar npm install body-parser --save para podermos ler o texto que estamos passando no submit do form
- rodar npm install mongodb --save para instalar mongo
- rodar npm install ejs --save (esse que permite que a gente sirva html dinamico, se formos ter outra pagina, acredito que devemos fazer o html em outro arquivo.ejs tipo menu.ejs dentro da pasta views, se ver no app.get no server.js estamos servindo o index.ejs e não o index.html) nos arquivos ejs nós podemos usar variávei entre as tags <%= %> e código entre <% %>, o código é igual ao JS