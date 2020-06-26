'use strict';

const article = document.querySelector("article");
let text = prompt("Введите название для вашего нового элемента");
const DomElement = {
  selector : text,
  height : 100,
  width : 1000,
  bg: "#9A8DE1",
  fontSize: 50,

    createElement : function() {
     
        if(this.selector[0] === "."){
            let div = document.createElement("div");
              div.textContent = text;
              div.classListAdd = this.selector.slice(1);

              div.style.cssText = "color" + this.bg + "height= " + this.height + "px" + 
                "width= " + this.width +"px" + "font-size= " + this.fontSize + "px";

          article.appendChild(div);
        
        }else if(this.selector[0] === "#"){
            let p = document.createElement("p");
              p.textContent = text;
              p.classListAdd = this.selector.slice(1);

              p.style.cssText = "color" + this.bg + "height= " + this.height + "px" + 
                "width= " + this.width +"px" + "font-size= " + this.fontSize + "px";

          article.appendChild(p);

        }
    }

};

let newElement = Object.create(DomElement);

newElement.createElement();