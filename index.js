require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');

const ProductController = require('./controllers/ProductsController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductController.createProduct);

app.get('/products', ProductController.getAll);

app.get('/products/:id', ProductController.getProductById);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
