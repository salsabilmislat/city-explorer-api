'use strict';
const axios = require('axios');
require('dotenv').config();
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

const Movie = require('../models/movie.model');

const Cache = require('../helper/cache.helper');
let cacheObject = new Cache();


const getMovie = async (req, res) => {
    let city_name = req.query.query;

    const dayInMilSec = 50000;
    const oneDayPassed = (Date.now() - cacheObject.timeStamp) > dayInMilSec;
    if (oneDayPassed) {
      console.log('Cache Reset');
      cacheObject = new Cache();
    }
    const foundData = cacheObject.movies.find(movie => movie.city_name === city_name);
    if (foundData) {
        res.json(foundData.data);
    } else {
        const movieUrl = 'https://api.themoviedb.org/3/search/movie';

        try {
            const movieResponse = await axios.get(`${movieUrl}?api_key=${MOVIE_API_KEY}&query=${city_name}`);

            let newArray = movieResponse.data.results.map((element) => {
                return new Movie(element.title, element.overview, element.vote_average, element.vote_count, element.poster_path, element.popularity, element.release_date);

            });

            cacheObject.movies.push({
                "city_name": city_name,
                "data": newArray
            });

            res.json(newArray);

        } catch (error) {
            return error
        }
    }

}
module.exports = getMovie;