const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const readFIle = require('./helpers/readFile');
const writeFIle = require('./helpers/writeFile');
const { 
  loginMiddleware,
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
  watchedAtMiddleware,
  rateMiddleware,
   } = require('./helpers/validations');
const authorizationMiddleware = require('./helpers/authorization');

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
app.get('/talker/:id', async (request, response) => {
    const { id } = request.params;
    const results = await readFIle();
    const result = results.find((talker) => talker.id === Number(id));
    if (result) return response.status(HTTP_OK_STATUS).send(result);
    return response.status(404).send({
      message: 'Pessoa palestrante não encontrada',
    });
});

// Requisito 3 e 4
app.post('/login', loginMiddleware, (_request, response) => {  
  const token = crypto.randomBytes(8).join('').substring(0, 16); 
 return response.status(200).json({ token });
});

// Requisito 5
app.post('/talker', authorizationMiddleware, nameMiddleware,
ageMiddleware,
talkMiddleware,
watchedAtMiddleware,
rateMiddleware, async (request, response) => {
  const results = await readFIle();
    results.push({ id: results.length + 1, ...request.body });
    writeFIle(results);
  return response.status(201).json({ id: results.length, ...request.body });
});

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
