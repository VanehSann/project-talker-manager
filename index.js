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

// Requisito 8
app.get('/talker/search', authorizationMiddleware, async (request, response) => {
   const results = await readFIle();
   const newResults = results.filter((talker) => talker.name.includes(request.query.q));
   if (request.query.q === '' || !request.query.q) return response.status(200).json(results);
  return response.status(200).json(newResults);
 });
 
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

// Requisito 6
app.put('/talker/:id', authorizationMiddleware, nameMiddleware,
ageMiddleware,
talkMiddleware,
watchedAtMiddleware,
rateMiddleware, async (request, response) => {
  const { id } = request.params;
  const results = await readFIle();
  const resultIndex = results.findIndex((req) => req.id === Number(id));
  results[resultIndex] = { ...results[resultIndex], ...request.body };
  writeFIle(results);
 return response.status(200).json(results[resultIndex]);
});

// Requisito 7
app.delete('/talker/:id', authorizationMiddleware, async (request, response) => {
  const { id } = request.params;
  const results = await readFIle();
  const newResults = results.find((req) => req.id !== Number(id));
  writeFIle(newResults);
 return response.status(204).json(newResults);
});

// não remova esse endpoint, é para o avaliador funcionar 
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
