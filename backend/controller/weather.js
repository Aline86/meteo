const Weather = require('../model/weather');


exports.getMap = (req, res) => {

  let weather = undefined;
  weather = fetch('http://api.weatherapi.com/v1/forecast.json?key=c04fe2e1748e473da1181653243103&' + new URLSearchParams({
      q: req.params.latitude + ',' + req.params.longitude ,
      day: '7'
  }).toString(),  {
      method: "GET", 
      mode: "no-cors", 
      cache: "no-cache", 
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
    })
    .then(response => response.json())
    .then(function(data) {
      data = data.data
      return res.send(JSON.stringify(new Weather(
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
      )))
    })
    .catch(err => console.error(err));
  
  
  }
  

  