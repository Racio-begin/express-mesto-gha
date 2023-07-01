const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { NOT_FOUND_ERROR } = require('./utils/serverResponseStatus');
const { PORT, DB_URL } = require('./utils/env');

const app = express();

mongoose.connect(DB_URL);

app.use((req, res, next) => {
  req.user = {
    _id: '649db82fee1145c0c41b7f26', // временная мера, вставим сюда _id пользователя из бд (Пётр)
  };

  next();
});

// защитить приложение от веб-уязвимостей
app.use(helmet());

// применить для всех роутов bodyParser (чтение тела запроса)
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}! :)`);
});
