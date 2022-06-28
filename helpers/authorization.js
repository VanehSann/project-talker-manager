const authorizationMiddleware = (_request, response, next) => {
  const { authorization } = _request.headers;
  if (!authorization) {
 return response.status(401).json({
    message: 'Token não encontrado',
  }); 
}
  if (authorization.length !== 16) {
 return response.status(401).json({
    message: 'Token inválido',
  }); 
}
  next();
};

module.exports = authorizationMiddleware;