'use strict';
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };
 

let money = +prompt("Ваш месячный доход:", 100000);
let income = "Продажа самогона";
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "кредит, курсы");
let deposit = confirm("Есть ли у вас депозит в банке?");
let mission = 500000;

let expenses1 = prompt("Введите обязательную статью расходов", "кредит"),
    amount1 = +prompt("Во сколько это обойдется", 10000),
    expenses2 = prompt("Введите обязательную статью расходов", "налог"),
    amount2 = +prompt("Во сколько это обойдется", 10000);


let start = function () {
    do {
        money = prompt('Ваш месячный доход?', '');
    }
    while (!isNumber(money));
};
start();

let showTypeOf = function (items) {
  console.log(typeof items);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
//типы данных
let getExpensesMonth = function (n, m){
  return n + m ;
};
console.log("Сумма обзательных расходов " + isNumber(getExpensesMonth(amount1, amount2)));

let getAccumulatedMonth = function(a, b){
  return a - b;
};

console.log("Накопления за месяц " + getAccumulatedMonth(money, getExpensesMonth(amount2, amount1)));

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount2, amount1));

let getTargetMonth = function(x, y){
 
  
    let splitNumber = Math.ceil(x / y);
    if (splitNumber < 0) {
        return `Цель не будет достигнута!`;
    } else {
        return `Цель будет достигнута через: ${splitNumber}`;
    }

};
console.log(getTargetMonth(mission, accumulatedMonth));

let budgetDay = function (a) {
  return Math.floor(a / 30);
};
console.log("Дневной бюджет равен " + budgetDay(accumulatedMonth));

console.log('Длина строки "addExpenses" равно:' 
  + addExpenses.length);

console.log(addExpenses.toLowerCase().split(', '));

let getStatusIncome = function(budget){
 
    if (budget >= 1200){
      console.log("У вас высокий уровень дохода");
    }else if (budget >600){
      console.log("У вас средний уровень дохода");
    }else if (budget <= 600 || budget >1){
      console.log("К сожалению у вас уровень дохода ниже среднего");
    }else if (budget ===0 || budget <0){
      console.log("Что то пошло не так");
    }
    };
getStatusIncome(budgetDay(accumulatedMonth));
