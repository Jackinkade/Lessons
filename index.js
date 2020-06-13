let isNumber = function(n){
  return !isNaN(parseFloat(n) && isFinite(n))
}

let start = function(){
  money = prompt("Ваш месячный доход", 90000);

  do{
      money = prompt('Ваш месячный доход', 90000);
  }while(!isNumber(money));

}
start();
isNumber();






let income = "Продажа самогона";
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "кредит, курсы");
let deposit = confirm("Есть ли у вас депозит в банке?");
let mission = 500000;

let expenses1 = prompt("Введите обязательную статью расходов", "кредит");
    amount1 = +prompt("Во сколько это обойдется", 10000);
    expenses2 = prompt("Введите обязательную статью расходов", "налог");
    amount2 = +prompt("Во сколько это обойдется", 10000);

let showTypeOf = function (i) {
  console.log(typeof i);
};

showTypeOf(income);
showTypeOf(deposit);

let getExpensesMonth = function (){
  return amount1 + amount2;
};
console.log("Сумма обзательных расходов " + isNumber(getExpensesMonth()) + getExpensesMonth());

let getAccumulatedMonth = function(){
  return money - (amount1 + amount2);
};
accumulatedMonth = getAccumulatedMonth();
console.log("Накопления за месяц " + getAccumulatedMonth());
let a = mission / accumulatedMonth;
let getTargetMonth = function(a){
 
  if(a > 0 ){
    console.log("Цель будет достигнута " );
    
  }else if (a < 0){
    console.log("Цель не будет достигнута");
  }
   console.log(mission / accumulatedMonth);
};
console.log("Цель будет достигнута через " + isNumber(getTargetMonth(a)));

let budgetDay = function () {
  return accumulatedMonth / 30;
};
console.log("Дневной бюджет равен " + budgetDay());

console.log('Длина строки "addExpenses" равно:' 
  + addExpenses.length);

console.log(addExpenses.toLowerCase().split(', '));
1200


let getStatusIncome = function(){
  return;
}
getStatusIncome();




if (budgetDay >= 1200){
  console.log("У вас высокий уровень дохода");
}else if (budgetDay >600){
  console.log("У вас средний уровень дохода");
}else if (budgetDay <= 600 || budgetDay >1){
  console.log("К сожалению у вас уровень дохода ниже среднего");
}else if (budgetDay ===0 || budgetDay <0){
 console.log("Что то пошло не так");
}
/*let n = 8;
do{
  n++;
  console.log
}while(n<5)*/
for(let i = 0; i <= 6; i+=2){
  if(i === 4){
    continue;
  }
  console.log(i);
}