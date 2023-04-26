const express = require('express');
const productController = require('./controllers/productController');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar 
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productController.getAllProducts);

app.get('/products/:id', productController.getProductById);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;