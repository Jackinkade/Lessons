'use strict';
const bookSelection = document.querySelectorAll(".book");
console.log(bookSelection);

//delete add
const removeAdd  =document.querySelectorAll(".adv");
  removeAdd[0].remove();

//replacing book box
bookSelection[0].before(bookSelection[1]);
bookSelection[2].before(bookSelection[4]);
bookSelection[5].after(bookSelection[2]);
// changed place/number 2-->4 0-->1 1-->0 5=5
//change background image js
document.body.style.backgroundImage = "url(/image/you-dont-know-js.jpg)";

// rename 3rd box
let bookThreeName = bookSelection[4].querySelector("a");
  bookThreeName.innerText = "Книга 3. this и Прототипы Объектов";

// new li element in 6 box
let	book6Element = bookSelection[2].querySelectorAll("li");
let newLiElement = document.createElement("li");
  newLiElement.innerHTML = "Глава 8: За пределами ES6";
  book6Element[8].after(newLiElement); 

//Восстановить порядок глав во второй и пятой книге
let book2Element = bookSelection[0].querySelectorAll("li"),
    book5Element = bookSelection[5].querySelectorAll("li");
book5Element[2].before(book5Element[9]);
book5Element[4].after(book5Element[2]);
book5Element[7].after(book5Element[5]);
book2Element[2].before(book2Element[3]);
book2Element[2].before(book2Element[6]);
book2Element[9].after(book2Element[2]);
book2Element[8].after(book2Element[7]);
book2Element[4].before(book2Element[8]);


