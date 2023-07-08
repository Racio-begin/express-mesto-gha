const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../utils/sk');
const { UNAUTHORIZED_ERROR } = require('../utils/serverResponseStatus');

const handleAuthError = (res) => {
  res.status(UNAUTHORIZED_ERROR).send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return handleAuthError(res);
  }

  // записываем пейлоуд в объект запроса
  req.user = payload;

  // пропускаем запрос дальше
  next();
};
