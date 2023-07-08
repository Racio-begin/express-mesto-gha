const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const { NOT_FOUND_ERROR } = require('./utils/serverResponseStatus');
const { PORT } = require('./utils/env');

const app = express();

// защитить приложение от веб-уязвимостей
app.use(helmet());

app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// применить для всех роутов bodyParser (чтение тела запроса)
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.post('/signin', auth, login);
app.post('/signup', auth, createUser);

app.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Ресурс не найден. Проверьте правильность введенного URL.' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}! :)`);
});
