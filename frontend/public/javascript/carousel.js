class Caroussel {
    constructor() {
        this.translateLeft = 0;
        this.translateRight = 0;
        this.direction = null;
        this.count = 0
    }
    moveLeft = (e) => {
        e.preventDefault();
        this.count--
        if(this.direction == null || this.direction == 'right') {
            this.direction = 'left';
            this.translateRight = this.translateLeft - (document.querySelector(".card-container").firstElementChild.clientWidth + 5);
            document.querySelectorAll(".card").forEach(element => {
                element.style.transform = "translate(" + this.translateRight + "px)";
            });
        }
        else {
            this.translateRight -= (document.querySelectorAll(".card")[0].clientWidth + 5);
            document.querySelectorAll(".card").forEach(element => {
                element.style.transform = "translate(" + this.translateRight + "px)";
            });
        }
        document.querySelector(".card-container").firstElementChild.addEventListener("transitionend", () => {
            let firstCard =  document.querySelector(".card-container").firstElementChild
            let p_prime = firstCard.cloneNode(true);
            document.querySelector(".card-container").appendChild(p_prime);
            firstCard.remove();
            document.querySelector(".card-container").style.transform = "translate(" + -this.translateRight + "px)"
        })
    }
    moveRight = (e) => {
        e.preventDefault();
        this.count++
        let lastCard = document.querySelector(".card-container").lastChild;
        let p_prime = lastCard.cloneNode(true);
        let new_pos = (document.querySelector(".card-container").firstElementChild.clientWidth + 5) * this.count
        document.querySelector(".card-container").insertBefore(p_prime, document.querySelector(".card-container").firstElementChild);
        document.querySelector(".card-container").style.transform = "translate(" + -new_pos  + "px)";
        if(this.direction == null || this.direction == 'left') {
            this.direction = 'right';
            this.translateLeft = this.translateRight + (document.querySelector(".card-container").firstElementChild.clientWidth + 5); 
            document.querySelectorAll(".card").forEach(element => {
                element.style.transform = "translate(" + this.translateLeft + "px)";
            });
            document.querySelector(".card-container").addEventListener("transitionend", () => {
                lastCard.remove();
            })
        }
        else {
            this.translateLeft = (document.querySelector(".card-container").firstElementChild.clientWidth + 5) * this.count;
            document.querySelectorAll(".card").forEach(element => {
                element.style.transform = "translate(" + this.translateLeft + "px)";
            });
            document.querySelector(".card-container").lastChild.addEventListener("transitionend", () => {
                lastCard.remove();
            })
        }
    }  
}

let carousel = new Caroussel();
document.querySelector(".left").addEventListener("click", carousel.moveRight)
document.querySelector(".right").addEventListener("click", carousel.moveLeft)

