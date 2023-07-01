// Импортировать модель
const User = require('../models/user');

const { BAD_REQUEST_ERROR } = require('../utils/serverResponseStatus');

const createUser = (req, res) => {
  // console.log(req.body);
  const { name, about, avatar } = req.body;

  // Вызвать метод create, передаем данные на вход для создания пользователя
  User.create({ name, about, avatar })
    // в случае успеха (resolve) приходит новая запись с новым пользователем, отправляем её на фронт
    .then((user) => {
      res.send(user);
    })
    // в случае провала (req) приходит ошибка и отпраляется на фронт для обозначения проблемы
    .catch((err) => {
      res.status(BAD_REQUEST_ERROR).send(err);
    });
};

const getAllUsers = (req, res) => {
  // Вызвать метод find, возвращает все сущности, т.к. передаем ему пустой массив
  User.find({})
    // в случае успеха (resolve) приходит список всех пользователей в бд
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(BAD_REQUEST_ERROR).send(err);
    });
};

const getUser = (req, res) => {
  // Вызвать метод findById, возвращает пользователя по id, если он есть
  User.findById(req.params.userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(BAD_REQUEST_ERROR).send(err);
    });
};

// const updateUser = (req, res) => {

// };

// const updateAvatar = (req, res) => {

// };

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  // updateUser,
  // updateAvatar,
};
