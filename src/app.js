const express = require('express');
const productsRouter = require('./routes/products.router');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

/* Adicionamos o registro das rotas para o CRUD de pessoas passageiras */
app.use('/products', productsRouter);

module.exports = app;