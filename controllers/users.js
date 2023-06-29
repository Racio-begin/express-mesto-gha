// Импортировать модель
const User = require('../models/user');

const createUser = (req, res) => {
  // console.log(req.body);
  const { name, about, avatar } = req.body;

  // Вызвать метод create, передаем данные на вход для создания пользователя
  User.create({ name, about, avatar })
  // в случае успеха (resolve) приходит новая запись с новым пользователем и отправляем на фронт
    .then((user) => {
      res.send(user);
    })
    // в случае провала (req) приходит ошибка и отпраляется на фронт для обозначения проблемы
    .catch((error) => {
      res.status(400).send(error);
    });
};

const getAllUsers = (req, res) => {

};

const getUser = (req, res) => {

};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
};
