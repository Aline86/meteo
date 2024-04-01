const Weather = require('../model/weather')

exports.getMap = (req, res) => {
    const http = require('http'); 
    let data = '';
    const request = http.get('http://api.weatherapi.com/v1/forecast.json?key=XXXXXXXXXXXX&q=' + req.params.latitude + ',' + req.params.longitude + '&days=7', (response) => {
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        data = JSON.parse(data);
        let weather = new Weather(
          data.current.temp_c, 
          data.current.is_day, 
          data.current.text, 
          data.current.icon, 
          data.current.wind_mph, 
          data.current.wind_dir, 
          data.current.precip_mm, 
      
          data.current.humidity, 
          data.current.cloud, 
          data.current.uv, 
          data.forecast
        )
          res.send(JSON.stringify( weather))
        });
    });
  
    // Log errors if any occur
    request.on('error', (error) => {
      console.error(error);
    });
  
    // End the request
    request.end();
  };
  