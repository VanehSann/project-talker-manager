// Requisito 4
// Regex 
// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email, response) => {
  if (!email || email === '') {
    return response.status(400).json(
      { message: 'O campo "email" é obrigatório' },
    ); 
}
  if (!emailRegex.test(email)) { 
    return response.status(400).json({ 
      message: 'O "email" deve ter o formato "email@email.com"', 
    }); 
  }
};

const validatePassword = (password, response) => {
  if (!password || password === '') {
 return response.status(400).json({
     message: 'O campo "password" é obrigatório', 
    }); 
  }
  if (password.length < 6) { 
    return response.status(400).json({
       message: 'O "password" deve ter pelo menos 6 caracteres', 
      }); 
  }
};

const loginMiddleware = (_request, response, next) => {
    const { email, password } = _request.body;
    validateEmail(email, response);
    validatePassword(password, response);
    next();
};

// Requisito 5

const nameMiddleware = (_request, response, next) => {
  const { name } = _request.body;
  
  if (!name || name === '') { 
    return response.status(400).json({
      message: 'O campo "name" é obrigatório',
      
    }); 
  }
  if (name.length < 3) {
    return response.status(400).json(
      {
        message: 'O "name" deve ter pelo menos 3 caracteres', 
      },
    ); 
}
  next();
};

const ageMiddleware = (_request, response, next) => {
  const { age } = _request.body;
  
  if (!age || age === '') { 
    return response.status(400).json({
      message: 'O campo "age" é obrigatório',
    }); 
  }
  if (age < 18) {
    return response.status(400).json(
      {
        message: 'A pessoa palestrante deve ser maior de idade',
      },
    ); 
}
  next();
};

const talkMiddleware = (_request, response, next) => {
  const { talk } = _request.body;
  
  if (!talk || talk === '') { 
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório',
    }); 
  }
  next();
};

const watchedAtMiddleware = (_request, response, next) => {
  const { talk: { watchedAt } } = _request.body;
  
  if (!watchedAt || watchedAt === '') { 
    return response.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    }); 
  }
 // Regex - 22.5 Express - Middlewares - Gabarito
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!dateRegex.test(watchedAt)) {
    return response.status(400).json(
      {
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      },
    ); 
}
  next();
};

const rateMiddleware = (_request, response, next) => {
  const { talk: { rate } } = _request.body;
  if (!rate || rate === '') { 
    return response.status(400).json({
      message: 'O campo "rate" é obrigatório',
    }); 
  }
  if (rate < 1 || rate > 5) {
    return response.status(400).json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      });
}

  next();
};

module.exports = { 
      loginMiddleware,
      nameMiddleware,
      ageMiddleware,
      talkMiddleware,
      watchedAtMiddleware,
      rateMiddleware,
       };
