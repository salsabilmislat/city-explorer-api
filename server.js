'use strict';
const express = require('express') 
const app = express() 
const cors = require('cors');
app.use(cors());
require('dotenv').config();

const getWeather = require('./controller/weather.controller');

const getMovie=require('./controller/movie.controller');
const getIndex= require('./controller/index.controller');
const weather = require('./data/weather.json');

app.get('/',getIndex)

app.get('/weather', getWeather );

app.get('/movies', getMovie);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    
    console.log(" is working from port");
}) 
