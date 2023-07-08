const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
// const { NOT_FOUND_ERROR } = require('./utils/serverR');
const { PORT } = require('./utils/env');
const NotFoundError = require('./errors/NotFoundError');
const { INTERNAL_SERVER_ERROR } = require('./utils/ServerResponseStatuses');

const app = express();

// защитить приложение от веб-уязвимостей
app.use(helmet());

app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// применить для всех роутов bodyParser (чтение тела запроса)
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.post('/signin', login);
app.post('/signup', createUser);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Ресурс не найден. Проверьте правильность введенного URL.'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR } = err;
  res.status(statusCode).send({ message: statusCode === INTERNAL_SERVER_ERROR ? 'на сервере произошла ошибка' : err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}! :)`);
});
