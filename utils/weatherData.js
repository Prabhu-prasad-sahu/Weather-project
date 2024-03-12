const request = require("request")


const weatherData = (address, callback) => {
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
    const API_KEY = '0583d77688267bb17939d9737bf50a62';

    let url = `${BASE_URL}${encodeURIComponent(address)}&APPID=${API_KEY}`;

    request({ url, json: true }, (err, response) => {
        if (err) {
            callback(true, "Unable to fetch the data. Please try again: " + err);
        } else if (response.body.cod !== 200) {
            callback(true, `Error: ${response.body.message}`);
        } else {
            callback(false, response.body);
        }
    });
};

module.exports = weatherData