'use strict';
const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
app.use(cors())
// a server endpoint 

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



app.get('/weather', (req, res) => {
    // console.log(request);

    let city_name = req.query.city_name;
    let lat = req.query.lat;
    let lon = req.query.lon;

    //    res.send(weather[0].lat);

    //  && item.lat === lat && item.lon === lon

    const returnArray = weather.find((item) => {

        return (item.city_name.toLowerCase() === city_name.toLowerCase()) 
    });
    if (returnArray){
        // let arrayOfReturn= returnArray.data;
        let newArr = returnArray.data.map((item) => {
            return new Forecast(item.datetime, item.weather.description);
        })
        res.json(newArr);
    }
    else{
        res.json('data not found')
    }


    //     if (returnArray.length) {
    //         res.json(returnArray);
    //     } else {
    //         res.send('no data found :disappointed:')
    //     }
    //   } else {
    //     res.json(weather);
    //   }
    // );

});
// console.log("hello");
app.listen(3001) // kick start the express server to work