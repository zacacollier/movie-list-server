const MovieListModel = require('../models/MovieListModel');
const MoviesModel = require('../models/MoviesModel.js')

module.exports = {
  list(req, res, next) {
    MoviesModel.find().exec()
      .then(movies => res.json(movies))
      .catch(next);
  },

  show(req, res, next) {
    MoviesModel.findById(req.params.id).exec()
      .then(movie => res.json(movie))
      .catch(next);
  },

  create(req, res, next) {
    const { imdbID, Title, Poster } = req.body;
    const movie = new MoviesModel({ imdbID, Title, Poster }).save()
      .then(movie => res.json(movie))
      .catch(next);
  },

  update(req, res, next) {
    const { imdbID, Title, Poster } = req.body;

    MoviesModel.findOneAndUpdate(
      { _id: req.params.id },
      { imdbID, Title, Poster },
      { new: true, runValidators: true }
    ).exec()
      .then(movie => res.json(movie))
      .catch(next);
  },

  remove(req, res, next) {
    MoviesModel.findOneAndRemove({ _id: req.params.id }).exec()
      .then(movie => res.json(movie))
      .catch(next);
  }
};
