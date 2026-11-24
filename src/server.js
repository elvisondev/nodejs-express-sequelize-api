const app = require('./app.js');

app.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${process.env.PORT}`);
});