let money = 40000;
let income = "Продажа самогона";
let addExpenses = "Коммуналка, развлечения, обучающие курсы ";
let deposit = true;
let mission = 500000;
let period = 11;
let budgetDay = money/30;

console.log("money: ", typeof money);
console.log("income: ", typeof income);
console.log("deposite: ", typeof deposit );
console.log('Длина строки "addExpenses" равно:' 
  + addExpenses.length);
console.log("Период равен " + period + " месяцев. " + 
  "\nЦель заработать " + mission + " рублей" );

m = addExpenses.toLowerCase();
m = m.split(", ");
console.log(typeof m);
console.log(m);

console.log("Дневной бюджет" + Math.floor(budgetDay) + " тенге");