const cardsRouter = require('express').Router();

const {
  createCard,
  getAllCards,
  deleteCard,
  // likeCard,
  // dislikeCard,
} = require('../controllers/cards');

cardsRouter.post('/', createCard);
cardsRouter.get('/', getAllCards);
cardsRouter.delete('/:cardId', deleteCard);
// cardsRouter.put('/:cardId/likes', likeCard);
// cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
