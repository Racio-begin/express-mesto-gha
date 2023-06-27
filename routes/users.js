// eslint-disable-next-line import/no-extraneous-dependencies
const usersRouter = require('express').Router();

// usersRouter.post('/', createUser);
// eslint-disable-next-line no-console
usersRouter.post('/', () => { console.log('Ес-с-сть запрос!'); });

module.exports = usersRouter;
