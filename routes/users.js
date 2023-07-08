const usersRouter = require('express').Router();

const {
  getUserJoiValidation,
  updateUserInfoJoiValidation,
  updateUserAvatarJoiValidation,
} = require('../middlewares/JoiValidator');

const {
  getAllUsers,
  getUser,
  getUserInfo,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUser);
usersRouter.get('/me', getUserJoiValidation, getUserInfo);
usersRouter.patch('/me', updateUserAvatarJoiValidation, updateUser);
usersRouter.patch('/me/avatar', updateUserInfoJoiValidation, updateAvatar);

module.exports = usersRouter;
