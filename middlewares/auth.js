const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../utils/sk');

const UnauthorizedError = require('../errors/UnauthorizedError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  // записываем пейлоуд в объект запроса
  req.user = payload;

  // пропускаем запрос дальше
  next();
};

module.exports = { auth };
