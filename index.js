const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const readFIle = require('./helpers/readFile');
const { loginMiddleware } = require('./helpers/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Requisito 1
app.get('/talker', async (_request, response) => {
 const result = await readFIle();
  response.status(HTTP_OK_STATUS).send(result);
});

// Requisito 2
app.get('/talker/:id', async (_request, response) => {
    const { id } = _request.params;
    const results = await readFIle();
    const result = results.find((talker) => talker.id === Number(id));
    if (result) return response.status(HTTP_OK_STATUS).send(result);
    return response.status(404).send({
      message: 'Pessoa palestrante não encontrada',
    });
});

// Requisito 3 e 4
app.post('/login', loginMiddleware, (request, response) => {  
  const token = crypto.randomBytes(8).join('').substring(0, 16); 
  if (request.body.email && request.body.password) return response.status(200).json({ token });
  response.status(200).json({ token });
});

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
