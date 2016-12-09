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

router.get('/:id', MoviesController.show);

router.post('/', authMiddleware, MoviesController.create);

router.put('/:id', authMiddleware, MoviesController.update);

router.delete('/:id', authMiddleware, MoviesController.remove);

module.exports = router;
