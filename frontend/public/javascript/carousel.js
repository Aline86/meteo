export class Caroussel {
    constructor() {
        this.translateLeft = 0;
        this.translateRight = 0;
        this.direction = null;
        this.count = 0
    }
    moveLeft = (e) => {
        e.preventDefault();
        this.count--
        document.querySelector(".right").style.display = "none"
        document.querySelector(".container-of-the-cards").classList.add("remove-space-left")
        if(this.direction == null || this.direction == 'right') {
            this.direction = 'left';
            this.translateRight = this.translateLeft - (document.querySelector(".card-container").firstElementChild.clientWidth + 5);
            this.translateX(this.translateRight)
        }
        else {
            this.translateRight -= (document.querySelectorAll(".card")[0].clientWidth + 5);
            this.translateX(this.translateRight)
        }
        document.querySelector(".card-container").firstElementChild.addEventListener("transitionend", () => {
            this.afterTransitionEndLeft();
        })
    }
    moveRight = (e) => {
        e.preventDefault();
        this.count++
        document.querySelector(".left").style.display = "none"
        document.querySelector(".container-of-the-cards").classList.add("remove-space-right")
        let lastCard = document.querySelector(".card-container").lastChild;
        let p_prime = lastCard.cloneNode(true);
        let new_pos = (document.querySelector(".card-container").firstElementChild.clientWidth + 5) * this.count
        document.querySelector(".card-container").insertBefore(p_prime, document.querySelector(".card-container").firstElementChild);
        document.querySelector(".card-container").style.transform = "translate(" + -new_pos  + "px)";
        if(this.direction == null || this.direction == 'left') {
            this.direction = 'right';
            this.translateLeft = this.translateRight + (document.querySelector(".card-container").firstElementChild.clientWidth + 5); 
            this.translateX(this.translateLeft)
            document.querySelector(".card-container").addEventListener("transitionend", () => {
                lastCard.remove();
                this.removeClass(".left", "remove-space-right")
            })
        }
        else {
            this.translateLeft = (document.querySelector(".card-container").firstElementChild.clientWidth + 5) * this.count;
            this.translateX(this.translateLeft)
            document.querySelector(".card-container").lastChild.addEventListener("transitionend", () => {
                this.afterTransitionEndRight(lastCard)
            })
        }
    }  

    reinit = () => {
        document.querySelectorAll(".card").forEach(element => {
            element.style.transform = "none"
        });
        document.querySelector(".card-container").style.transform = "none"
        this.translateLeft = 0;
        this.translateRight = 0;
        this.direction = null;
        this.count = 0
    }

    translateX = (value) => {
        document.querySelectorAll(".card").forEach(element => {
            element.style.transform = "translate(" + value + "px)";
        });
    }

    afterTransitionEndLeft = () => {
        let firstCard =  document.querySelector(".card-container").firstElementChild
        let p_prime = firstCard.cloneNode(true);
        document.querySelector(".card-container").appendChild(p_prime);
        firstCard.remove();
        document.querySelector(".card-container").style.transform = "translate(" + -this.translateRight + "px)"
        this.removeClass(".right", "remove-space-left")
    }
    afterTransitionEndRight = (lastCard) => {
        lastCard.remove();
        document.querySelector(".left").style.display = "block"
        document.querySelector(".container-of-the-cards").classList.remove("remove-space-right")
    }
    
    removeClass = (classLeft, classRight) => {
        document.querySelector(classLeft).style.display = "block"
        document.querySelector(".container-of-the-cards").classList.remove(classRight)
    }
}



