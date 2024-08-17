const Weather = require('../model/weather')


exports.getMap = async (req, res) => {
  try {  
    let data = '';
    const request = await fetch('http://api.weatherapi.com/v1/forecast.json?key=c04fe2e1748e473da1181653243103&q=' + req.params.latitude + ',' + req.params.longitude + '&days=7', (response, err) => {
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        data = JSON.parse(data);
        let weather = {};
        weather = new Weather(
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
        response.send(JSON.stringify( weather))
      }); 
    });
  } catch(err) {
    console.log(err)
  }
  
};
  