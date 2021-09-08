'use strict';
const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
const axios = require('axios');
app.use(cors());

// a server endpoint 
require('dotenv').config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const Movie_API_KEY = process.env.Movie_API_KEY;

const weather = require('./data/weather.json')
app.get('/', // our endpoint name
    function (req, res) { // callback function of what we should do with our request
        res.send('Hello World') // our endpoint function response
    })
class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }

}
app.get('/weather', async (req, res) => {
    // console.log(request);

    // let city_name = req.query.city_name;
    let lat = req.query.lat;
    let lon = req.query.lon;

    const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
    //    res.send(weather[0].lat);

    //  && item.lat === lat && item.lon === lon item.city_name.toLowerCase() === city_name.toLowerCase()
try{
    const weatherBitResponse = await axios.get(`${weatherBitUrl}?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`); 
    // console.log(weatherBitResponse);
    // console.log(weatherBitResponse.data);
    const returnArray = weatherBitResponse.data.data.map((item) => {
       
        return new Forecast(item.datetime, item.weather.description);
        // if ( item.lat === lat && item.lon === lon) {

        //     return item;
        // }
    });
     console.log(returnArray);
    // response.json(weatherBitResponse.data);
   
    // if (returnArray){
    //     // let arrayOfReturn= returnArray.data;
    //     let newArr = returnArray.data.map((item) => {
    //         return new Forecast(item.datetime, item.weather.description);
    //     })
    //     res.json(newArr);
    // }
    // else{
    //     res.json('data not found')
    // }
res.json(returnArray);
}

catch (error) {
    res.json(error);
  }
    

});

class Movie {
    constructor(title, overview,vote_average,vote_count,poster_path,popularity,release_date) {
        this.title = title;
        this.overview = overview;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
        this.poster_path = poster_path;
        this.popularity = popularity;
        this.release_date = release_date;
    }

}

app.get('/movies', async (req, res) => {
try{
    let city_name = req.query.query;
    const movieUrl = 'https://api.themoviedb.org/3/search/movie';
    const movieResponse = await axios.get(`${movieUrl}?api_key=${Movie_API_KEY}&query=${city_name}`);
  
        let newArray=movieResponse.data.results.map((element)=>{
            return new Movie(element.title,element.overview,element.vote_average,element.vote_count,element.poster_path,element.popularity,element.release_date);
           
    })
    res.json(newArray);
}catch(error){
    res.json(error);
  }
});

// console.log("hello");
app.listen(3001,()=>{
    console.log(" is working from port");
}) // kick start the express server to work
