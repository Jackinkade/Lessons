"use strict";
class First{
  constructor(sentence){
    this.sentence = "Привет я метод родителя!";
  }
  hello() { console.log(this.sentence); }
}
class Second extends First{
  
hello (){
  super.hello();
  console.log("А я наследуемый метод!");}
}
const second = new Second();

setTimeout(second.hello(), 200);
