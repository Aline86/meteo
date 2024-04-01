let town = class Weather {

    constructor(
        temp_c, 
        is_day, 
        text, 
        icon, 
        wind_mph, 
        wind_dir, 
        precip_mm,
        humidity, 
        cloud,
        uv,
        forecast
    ) 
    {
        
        this.temp_c = temp_c;
        this.text = text;
        this.icon = icon;
        this.wind_mph = wind_mph;
        this.wind_dir = wind_dir;
        this.precip_mm = precip_mm;
        this.humidity = humidity;
        this.cloud = cloud;
        this.uv = uv;
        this.next_days = this.next_week_days(forecast);
        
    }

    next_week_days = (forecast) => {
        let days = {};
        let i = 0;
        let name = ""
        let inter_name = [];
        forecast.forecastday.forEach(element => {
            let day = {};
            day.date = element.date;
            day.date_epoch = element.date_epoch;
            day.maxtemp_c = element.day.maxtemp_c;
            day.mintemp_c = element.day.mintemp_c;
            day.avgtemp_c = element.day.avgtemp_c;
            day.maxwind_mph = element.day.maxwind_mph;
            day.totalprecip_mm = element.day.totalprecip_mm;
            day.text = element.day.condition.text;
            day.icon = element.day.condition.icon;
       
            inter_name.push(day)
         
            i++;
        });
      
        for ( var index in inter_name ) {
         
            days[index] = inter_name[index]; 
          
         }
       return days;
    }
}

module.exports = town;