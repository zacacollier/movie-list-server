const mongoose = require('mongoose')

const moviesSchema = new mongoose.Schema({
        imdbID: {
            type: String,
            required: true,
        },
        Title: {
            type: String,
            required: true,
        },
        Poster: {
            type: String,
            required: true,
        },
})

module.exports = mongoose.model('Movies', moviesSchema)
