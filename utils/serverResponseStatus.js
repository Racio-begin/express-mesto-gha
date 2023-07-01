/* *** Статусы успешного запроса *** */

// Запрос успешно прошёл
const OK_STATUS = 200;

// Ресуср был успешно создан на сервере
const CREATED_STATUS = 201;

/* *** Статусы ошибок *** */

// Невалидный запрос
const BAD_REQUEST_ERROR = 400;

// Страница/сущность не найдена
const NOT_FOUND_ERROR = 404;

// Общий статус для ошибок на стороне сервера
const INTERNAL_SERVER_ERROR = 500;

const defaultError = (res) => {
  res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка по умолчанию.' });
};

module.exports = {
  OK_STATUS,
  CREATED_STATUS,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
  defaultError,
};
