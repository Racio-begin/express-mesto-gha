// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const usersRouter = require('./routes/users');

const app = express();

app.use('/users', usersRouter);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен! :) ыыы');
});
