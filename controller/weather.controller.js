'use strict';
const axios = require('axios');
require('dotenv').config();


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const Forecast = require('../models/weather.model');
const Cache = require('../helper/cache.helper');
let cacheObject = new Cache();

console.log('Cache instance created');
const getWeather = async (req, res) => {

    let lat = req.query.lat;
    let lon = req.query.lon;

    const dayInMilSec = 50000;
    const oneDayPassed = (Date.now() - cacheObject.timeStamp) > dayInMilSec;
    if (oneDayPassed) {
      console.log('Cache Reset');
      cacheObject = new Cache();
    }

    const foundData = cacheObject.foreCast.find(location => location.lat === lat && location.lon === lon);
    if (foundData) {
        res.json(foundData.data);
    } else {
        console.log('No Cache data found');
        const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';

        try {
            const weatherBitResponse = await axios.get(`${weatherBitUrl}?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`);

            const returnArray = weatherBitResponse.data.data.map((item) => {
                // `Low of ${data1.low_temp}, high of ${data1.high_temp} with ${data1.weather.description} `,
                // ` ${data1.datetime}`
                return new Forecast(item.datetime, item.weather.description,item.high_temp,item.low_temp);

            });
            // console.log(returnArray);
            console.log('Save data into cache');
            cacheObject.foreCast.push({
                "lat": lat,
                "lon": lon,
                "data": returnArray
            });
            console.log(cacheObject);
            res.json(returnArray);
        }

        catch (error) {
            return error
        }
    }




}
module.exports = getWeather;