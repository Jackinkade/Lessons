"use strict";
class First{
  constructor(sentence){
    this.sentence = "Привет я метод родителя!";
  }
  hello() { console.log(this.sentence); }
}
class Second extends First{

newHello (){console.log("А я наследуемый метод!");}
}

const first = new First();
first.hello();
const second = new Second();
second.hello();
setTimeout(second.newHello(), 200);
