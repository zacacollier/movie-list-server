const express = require('express');
const MoviesController = require('../controllers/MoviesController');

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isAuthorized = req.headers.authorization === process.env.AUTH_SECRET;

  if (isProduction && !isAuthorized) {
      return next('Wrong secret');
  }

  return next();
};

router.get('/', MoviesController.list);

router.post('/', MoviesController.create);

router.get('/:id', MoviesController.show);

router.put('/:id',  MoviesController.update);

router.delete('/:id', MoviesController.remove);

module.exports = router;
