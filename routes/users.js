const usersRouter = require('express').Router();

const {
  getAllUsers,
  getUser,
  getUserInfo,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUser);
usersRouter.get('/me', getUserInfo);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
