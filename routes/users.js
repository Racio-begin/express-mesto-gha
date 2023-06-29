const usersRouter = require('express').Router();

const {
  createUser,
  getUser,
  getAllUsers,
} = require('../controllers/users');

usersRouter.post('/', createUser);
usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUser);

module.exports = usersRouter;
