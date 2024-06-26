import { Caroussel } from "./public/javascript/carousel.js";


class Weather {
    constructor(){
        this.carousel = new Caroussel();
    }
    weatherEvent = () => {
        self = this;
        document.getElementById("input_name").addEventListener("keyup", function(e){
            if(e.target.value.length >= 3) {
                document.getElementById("input_value").innerHTML = ""
                document.querySelector(".container-of-the-cards-container").style.display = "none"
                self.getTowns(e.target.value).then(response => response.json())
                .then(response => response.towns.forEach(elem => {
                    let div = self.createTounLineData(elem);
                    div.addEventListener("click", function(e){
                        self.emptyDivs();
                        self.getTown(e.target.getAttribute('data-attribute')).then(response => response.json())
                        .then(response => response.towns.forEach(elem => {
                            self.createWeather(elem)
                            self.createTown(elem)
                            self.carousel.reinit()
                        }))
                    })
                }))
            }
            else {
                document.getElementById("input_value").innerHTML = "" 
            }
        })
        document.querySelector(".left").addEventListener("click", this.carousel.moveRight)
        document.querySelector(".right").addEventListener("click", this.carousel.moveLeft)
    }

    emptyDivs = () => {
        document.getElementById("input_value").innerHTML = ""
        document.querySelector(".card-container").innerHTML = ""
    }
    createTounLineData = (elem) => {
        let div = document.createElement("div");
        div.setAttribute("class", "town")
        div.setAttribute("data-attribute", elem.label)
        let labelStr = elem.label
        div.innerText = labelStr.charAt(0).toUpperCase() + labelStr.slice(1);
        document.getElementById("input_value").appendChild(div)
        return div;
    }
    getTowns = async (name) => 
        await fetch(`http://localhost:3000/towns/${name}`)

    getTown = async (name) => 
        await fetch(`http://localhost:3000/town/${name}`)

    getWeather = async (latitude, longitude) => 
        await fetch(`http://localhost:3000/showmap/${latitude}/${longitude}`)

    createWeather = (elem) => {
        let latitude = elem.latitude;
        let longitude = elem.longitude;

        let data = this.getWeather(latitude, longitude).then(response => response.json()).then(response => Object.entries(response.next_days).forEach(entry => {
            const [key, value] = entry;
            const elem = value;

            let div = document.createElement("div");
            div.setAttribute("class", "card")

            let jour = document.createElement("div");
            jour.setAttribute("class", "date date-data")
            jour.innerText = this.createDate(elem.date_epoch)

            let maxtemp_c = this.createNormalElement(elem, "maxtemp_c maxtemp_c-data", "Maximale  : " + elem.maxtemp_c + " C°");

            let mintemp_c = this.createNormalElement(elem, "mintemp_c mintemp_c-data", "Minimale  : " + elem.mintemp_c + " C°");

            let avgtemp_c =  this.createNormalElement(elem, "avgtemp_c avgtemp_c-data", "Température du jour  : " + elem.avgtemp_c);

            let maxwind_mph = this.createNormalElement(elem, "maxwind_mph maxwind_mph-data", "Vent  : " + elem.maxwind_mph);

            let totalprecip_mm = this.createNormalElement(elem, "totalprecip_mm totalprecip_mm-data", "Précipitations : " + elem.totalprecip_mm + " mm");

            let icon = document.createElement("img");
            icon.setAttribute("src", elem.icon)

            div.appendChild(jour)
            div.appendChild(icon)
            div.appendChild(avgtemp_c)
            div.appendChild(maxtemp_c)
            div.appendChild(mintemp_c)
            div.appendChild(maxwind_mph)
            div.appendChild(totalprecip_mm)
            
            document.querySelector(".card-container").appendChild(div)  
            document.querySelector(".container-of-the-cards-container").style.display = "flex"
        }))
    }
    
    createNormalElement = (elem, classes, innertext) => {
        let name = document.createElement("div");
        name.setAttribute("class", classes)
        name.innerText = innertext
        
        return name;
    }

    createTown = (elem) => {
        let div = document.createElement("div");
        div.setAttribute("class", "one_town town-data")

        let label = document.createElement("span");
        label.setAttribute("class", "label town-data")
        let labelStr = elem.label
        label.innerText = labelStr.charAt(0).toUpperCase() + labelStr.slice(1);

        let zip_code = document.createElement("span");
        zip_code.setAttribute("class", "zip_code town-data")
        zip_code.innerText = " " + elem.zip_code

        let department_name = document.createElement("span");
        department_name.setAttribute("class", "department_name town-data")
        let department = elem.department_name
        department_name.innerText = " " + department.charAt(0).toUpperCase() + department.slice(1);
    
        let region_name = document.createElement("span");
        region_name.setAttribute("class", "region_name town-data")
        let region = elem.region_name
        region_name.innerText = " " + region.charAt(0).toUpperCase() + region.slice(1);

        div.appendChild(label)
        div.appendChild(department_name)
        div.appendChild(region_name)
        div.appendChild(zip_code)

        document.getElementById("input_value").appendChild(div)
    }

    createDate = (timestamp) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(timestamp * 1000);
        const datevalues = [
            date.getFullYear(),
            date.getMonth()+1,
            date.getDate(),
        ];
        let dateStr = date.toLocaleDateString("fr-FR", options);

        return dateStr.charAt(0).toUpperCase() + dateStr.slice(1); 
    }
}
    
const weather = new Weather();

weather.weatherEvent()


    


  
  


