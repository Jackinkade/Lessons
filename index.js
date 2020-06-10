let money = +prompt("Ваш месячный доход:");
let income = "Продажа самогона";
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
let deposit = confirm("Есть ли у вас депозит в банке?");
let mission = 500000;
let period = 11;
let expenses1 = prompt("Введите обязательную статью расходов");
let amount1 = +prompt("Во сколько это обойдется");
let expenses2 = prompt("Введите обязательную статью расходов");

let amount2 = +prompt("Во сколько это обойдется");


let budgetMonth = money -(amount1 - amount2 );


let budgetDay = money/30;
console.log("money: ", typeof money);
console.log("income: ", typeof income);
console.log("deposite: ", typeof deposit );
console.log('Длина строки "addExpenses" равно:' 
  + addExpenses.length);
console.log("Период равен " + period + " месяцев. " + 
  "\nЦель заработать " + mission + " рублей" );
console.log(addExpenses.toLowerCase().split(', '));

console.log("Бюджет на день " + Math.floor(budgetDay) + "тенге");
console.log("Месячный бюджет", budgetDay);
console.log( budgetDay)
console.log("Цель будет достигнута за ", +Math.ceil(mission/budgetMonth) );

if (budgetDay >= 1200){
  console.log("У вас высокий уровень дохода");
}else if (budgetDay >600){
  console.log("У вас средний уровень дохода");
}else if (budgetDay <= 600 || budgetDay >1){
  console.log("К сожалению у вас уровень дохода ниже среднего");
}else if (budgetDay ===0 || budgetDay <0){
  console.log("Что то пошло не так");
}
