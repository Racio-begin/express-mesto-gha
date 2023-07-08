// Подключим модуль для хэширования пароля
const bcrypt = require('bcryptjs');

// Подключим модуль для создания и проверки токенов
const jwt = require('jsonwebtoken');

// Импортировать модель пользователя
const User = require('../models/user');

const SECRET_KEY = require('../utils/sk');

// Импортировать ошибку
const {
  OK_STATUS,
  CREATED_STATUS,
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} = require('../utils/OtherResponseStatuses');

const SALT_ROUNDS = 10;

const createUser = (req, res) => {
  // Получим из объекта запроса имя, описание и аватар пользователя
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  // Вызвать метод create, передаем данные на вход для создания пользователя,
  // создадим документ на основе пришедших данных
  bcrypt.hash(
    password,
    SALT_ROUNDS,
  )
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    // в случае успеха (resolve) приходит новая запись с новым пользователем, отправляем её на фронт
    .then((user) => {
      res.status(CREATED_STATUS).send(user);
    })
    // в случае провала (req) приходит ошибка и отпраляется на фронт для обозначения проблемы
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

const getAllUsers = (req, res) => {
  // Вызвать метод find, возвращает все сущности, т.к. передаем ему пустой массив
  User.find({})
    // в случае успеха (resolve) приходит список всех пользователей в бд
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
    });
};

// todo: реализовать orFail() для реализации всех ошибок в .catch
const getUser = (req, res) => {
  // Вызвать метод findById, возвращает пользователя по id, если он есть
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(OK_STATUS).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные при запросе пользователя.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

const getUserInfo = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    // .then((user) => {
    // if (!user) {
    //   res.status(NOT_FOUND_ERROR).send({ message: 'Такого пользователя не существует.' });
    // }
    // res.status(OK_STATUS).send({ data: user });
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      // if (err.name === 'CastError') {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные при запросе пользователя.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

// todo: настроить Postman для проверки
const updateUser = (req, res) => {
  // Вызвать метод findByIdAndUpdate, ищет пользователя по id и обновляет указанные поля
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, {
    // обработчик then получит на вход обновлённую запись
    new: true,
    // данные будут валидированы перед изменением
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, {
    // обработчик then получит на вход обновлённую запись
    new: true,
    // данные будут валидированы перед изменением
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.send({ token });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
    })
    .catch(() => {
      res.status(UNAUTHORIZED_ERROR).send({ message: 'Ошибка авторизации' });
    });
};

// Разобрать тему: Способы хранения JWT в браузере

// https://practicum.yandex.ru/trainer/web/lesson/573dc76f-d62e-46f0-9413-9948caed8ec6/?searchedText=httpOnly

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  getUserInfo,
  updateUser,
  updateAvatar,
  login,
};
