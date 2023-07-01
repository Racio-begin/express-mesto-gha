// eslint-disable-next-line no-unused-vars
const Card = require('../models/card');

const { BAD_REQUEST_ERROR, NOT_FOUND_ERROR } = require('../utils/serverResponseStatus');

// eslint-disable-next-line no-unused-vars
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      res.status(BAD_REQUEST_ERROR).send(err);
    });
};

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      res.status(BAD_REQUEST_ERROR).send(err);
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Карточка с указанным id не найдена' });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      res.status(BAD_REQUEST_ERROR).send(err);
    });
};

// const likeCard = (req, res) => Card.findByIdAndUpdate(
//   req.params.cardId,
//   { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
//   { new: true },
// );

// const dislikeCard = (req, res) => Card.findByIdAndUpdate(
//   req.params.cardId,
//   { $pull: { likes: req.user._id } }, // убрать _id из массива
//   { new: true },
// );

module.exports = {
  createCard,
  getAllCards,
  deleteCard,
  // likeCard,
  // dislikeCard,
};
