// eslint-disable-next-line no-unused-vars
const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

const getAllCards = (req, res) => {

};

const deleteCard = (req, res) => {

};

const likeCard = (req, res) => {

};

const dislikeCard = (req, res) => {

};

module.exports = {
  createCard,
  getAllCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
