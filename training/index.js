'use strict';

const article = document.querySelector("article");

const DomElement = {
  selector : prompt("??") ,
  height : 300,
  width : 300,
  bg: "blue",
  fontSize: 60,

    createElement : function() {
      let text = prompt("Введите название для вашего нового элемента");
        if(this.selector[0] === "."){
         
            let div = document.createElement("div");
              div.textContent = text;
              div.classListAdd = this.selector.slice(1);

              div.style.cssText = 'color:' + this.bg + '; background-color: black; width: ' + 
              this.width + 'px; height: ' + this.height + 'px; font-size: ' + this.fontSize + 'px;';
            
          article.appendChild(div);
          div.classList.add(text);
        
        }else if(this.selector[0] === "#"){
          
            let p = document.createElement("p");
              p.textContent = text;
              p.classListAdd = this.selector.slice(1);

              p.style.cssText = 'color:' + this.bg + '; background-color: black; width: ' + 
              this.width + 'px; height: ' + this.height + 'px; font-size: ' + this.fontSize + 'px;';
            
          article.appendChild(p);
          p.id = text;
        }
    }

};

let newElement = Object.create(DomElement);

newElement.createElement();
