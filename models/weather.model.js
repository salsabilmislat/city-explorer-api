'user strict';

class Forecast {
    constructor(date, description,low_temp,high_temp) {
        this.date = date;
        this.description = description;
        this.low_temp = low_temp;
        this.high_temp = high_temp;
    }

}

module.exports = Forecast;