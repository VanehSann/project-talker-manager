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

module.exports = { loginMiddleware };
