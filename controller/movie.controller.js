'use strict';
const axios = require('axios');
require('dotenv').config();
const Movie_API_KEY = process.env.Movie_API_KEY;

const Movie = require('../models/movie.model');



const getMovie = async (req, res) => {
    try {
        let city_name = req.query.query;
        const movieUrl = 'https://api.themoviedb.org/3/search/movie';
        const movieResponse = await axios.get(`${movieUrl}?api_key=${Movie_API_KEY}&query=${city_name}`);

        let newArray = movieResponse.data.results.map((element) => {
            return new Movie(element.title, element.overview, element.vote_average, element.vote_count, element.poster_path, element.popularity, element.release_date);

        })
        res.json(newArray);
    } catch (error) {
        res.json(error);
    }
}
module.exports = getMovie;