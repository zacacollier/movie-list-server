const express = require('express');
const ContactsController = require('../controllers/ContactsController');

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isAuthorized = req.headers.authorization === process.env.AUTH_SECRET;

  if (isProduction && !isAuthorized) {
      return next('Wrong secret');
  }

  return next();
};

router.get('/', ContactsController.list);

router.get('/:id', ContactsController.show);

router.post('/', authMiddleware, ContactsController.create);

router.put('/:id', authMiddleware, ContactsController.update);

router.delete('/:id', authMiddleware, ContactsController.remove);

module.exports = router;
