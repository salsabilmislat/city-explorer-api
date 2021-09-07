'use strict';
const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
const axios = require('axios');
app.use(cors());

// a server endpoint 
require('dotenv').config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

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
// console.log("hello");
app.listen(3001,()=>{
    console.log(" is working from port");
}) // kick start the express server to work