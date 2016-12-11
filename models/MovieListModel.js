const mongoose = require('mongoose');
const MoviesModel = require('../models/MoviesModel.js')

const movieListSchema = new mongoose.Schema({
    children: {
        type: Object,
        required: true,
        children: [
            MoviesModel,
        ]
    }
});

module.exports = mongoose.model('MovieList', movieListSchema);
