const ContactModel = require('../models/ContactModel');

module.exports = {
  list(req, res, next) {
    ContactModel.find().exec()
      .then(contacts => res.json(contacts))
      .catch(next);
  },

  show(req, res, next) {
    ContactModel.findById(req.params.id).exec()
      .then(contact => res.json(contact))
      .catch(next);
  },

  create(req, res, next) {
    const { avatar, name, occupation } = req.body;
    const contact = new ContactModel({ avatar, name, occupation }).save()
      .then(contact => res.json(contact))
      .catch(next);
  },

  update(req, res, next) {
    const { avatar, name, occupation } = req.body;

    ContactModel.findOneAndUpdate(
      { _id: req.params.id },
      { avatar, name, occupation },
      { new: true, runValidators: true }
    ).exec()
      .then(contact => res.json(contact))
      .catch(next);
  },

  remove(req, res, next) {
    ContactModel.findOneAndRemove({ _id: req.params.id }).exec()
      .then(contact => res.json(contact))
      .catch(next);
  }
};
