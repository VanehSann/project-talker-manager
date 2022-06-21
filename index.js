const express = require('express');
const bodyParser = require('body-parser');
const readFIle = require('./helpers/readFile');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Requisito 1
app.get('/talker', async (_request, response) => {
 const result = await readFIle();
  response.status(HTTP_OK_STATUS).send(result);
});

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
