'use strict';
const axios = require('axios');
require('dotenv').config();


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const Forecast = require('../models/weather.model');

const getWeather= async (req, res) => {
   
    let lat = req.query.lat;
    let lon = req.query.lon;

    const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
   
try{
    const weatherBitResponse = await axios.get(`${weatherBitUrl}?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`); 
    
    const returnArray = weatherBitResponse.data.data.map((item) => {
       
        return new Forecast(item.datetime, item.weather.description);
        
    });
     console.log(returnArray);
    
res.json(returnArray);
}

catch (error) {
    res.json(error);
  }
    

}
module.exports = getWeather;