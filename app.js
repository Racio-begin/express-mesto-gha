// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');

const app = express();

const usersRouter = require('./routes/users');

// применить для всех роутов bodyParser (чтение тела запроса)
app.use(bodyParser.json());
app.use('/users', usersRouter);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен! :) ыыы');
});
