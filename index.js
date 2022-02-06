require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');

const productsRouter = require('./routers/productsRouter');
const salesRouter = require('./routers/salesRouter');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
