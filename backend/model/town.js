let town = class Town {
    constructor(
        city_code, 
        zip_code, 
        label, 
        latitude, 
        longitude, 
        department_name, 
        department_number,
        region_name, 
        region_geojson_name
    ) 
    {
        this.city_code = city_code;
        this.zip_code = zip_code;
        this.label = label;
        this.latitude = latitude;
        this.longitude = longitude;
        this.department_name = department_name;
        this.department_number = department_number;
        this.region_name = region_name;
        this.region_geojson_name = region_geojson_name;
    }
}



module.exports = town;