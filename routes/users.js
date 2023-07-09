const usersRouter = require('express').Router();

const {
  getUserJoiValidation,
  updateUserInfoJoiValidation,
  updateUserAvatarJoiValidation,
} = require('../middlewares/JoiValidator');

const {
  getAllUsers,
  getUserInfo,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getUserInfo);
usersRouter.get('/:userId', getUserJoiValidation, getUser);
usersRouter.patch('/me', updateUserAvatarJoiValidation, updateUser);
usersRouter.patch('/me/avatar', updateUserInfoJoiValidation, updateAvatar);

module.exports = usersRouter;
