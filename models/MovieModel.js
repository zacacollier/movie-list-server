const mongoose = require('mongoose');
const moviesModel = require('../models/MoviesModel.js')

const movieListSchema = new mongoose.Schema({
    movieList: {
        type: Object,
        required: true,
        children: [
            {
                imdbID: {
                    type: String,
                    required: true,
                }
            },
            {
                Title: {
                    type: String,
                    required: true,
                },
            },
            {
                Poster: {
                    type: String,
                    required: true,
                },
            },
        ]
    }
});

module.exports = mongoose.model('Movie', movieListSchema);
