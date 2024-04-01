const Town = require('../model/town')
const cities = require('../bdd/cities.json')


exports.getTowns = async (req, res) => {
    try {
        citiesArray = cities
        town = [];
        citiesArray["cities"].forEach(city => {
            if(city.label.includes(req.params.name.toLowerCase())) {
              
                town.push(new Town(
                    city.city_code,
                    city.zip_code,
                    city.label,
                    city.latitude,
                    city.longitude,
                    city.department_name,
                    city.department_number,
                    city.region_name,
                    city.region_geojson_name
                ))
           
               
            }
           
        });
        if(town != []) {
            res.json({'towns' : town})
        }
    } catch(err) {
        console.log(err)
        res.status(400).json({
            err: err.message
        })
    }
}

exports.getTown = async (req, res) => {
    try {
        citiesArray = cities
        town = [];
        citiesArray["cities"].forEach(city => {
            if(city.label == req.params.name.toLowerCase()) {
              
                town.push(new Town(
                    city.city_code,
                    city.zip_code,
                    city.label,
                    city.latitude,
                    city.longitude,
                    city.department_name,
                    city.department_number,
                    city.region_name,
                    city.region_geojson_name
                ))
           
               
            }
           
        });
        if(town != []) {
            res.json({'towns' : town})
        }
    } catch(err) {
        console.log(err)
        res.status(400).json({
            err: err.message
        })
    }
}