/* *** Статусы успешного запроса *** */

// Запрос успешно прошёл (ОК)
const OK_STATUS = 200;

// Ресурс был успешно создан на сервере
const CREATED_STATUS = 201;

/* *** Статусы ошибок *** */

// Невалидный запрос
const BAD_REQUEST_ERROR = 400;

// Ошибка авторизации
const UNAUTHORIZED_ERROR = 401;

// Страница/сущность не найдена
const NOT_FOUND_ERROR = 404;

// Общий статус для ошибок на стороне сервера
const INTERNAL_SERVER_ERROR = 500;

// todo: реализовать defaultError
// const defaultError = (res, message) => {
/*   res.status(INTERNAL_SERVER_ERROR).send({
  message: `На сервере произошла Ошибка по умолчанию.. ${message}`
});
};
*/

module.exports = {
  OK_STATUS,
  CREATED_STATUS,
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
  // defaultError,
};
