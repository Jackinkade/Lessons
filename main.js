'use strict';
let color1 = document.getElementById("color1");
let color2 = document.getElementById("color2");
let body = document.querySelector("body");


function syncColors(){
  body.style.background = "linear-gradient(to right," + 
    color1.value + ", " + color2.value;
 
}
syncColors();
color1.addEventListener("change", syncColors);
color1.addEventListener("change", syncColors);


let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
start = function () {
  do{
    money = +prompt("Ваш месячный доход", "");
  }while (!isNumber(money));
    if (money < 0){
      return start();
    }
};
start();



/*let income = "Продажа самогона";
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "кредит, курсы");
let deposit = confirm("Есть ли у вас депозит в банке?");
let mission = 500000;

let expenses1 = prompt("Введите обязательную статью расходов", "кредит"),
    amount1 = +prompt("Во сколько это обойдется", 10000),
    expenses2 = prompt("Введите обязательную статью расходов", "налог"),
    amount2 = +prompt("Во сколько это обойдется", 10000);*/

let appData = {
  budget:  money,
  budgetDay: 0,
	budgetMonth: 0,
 expensesMonth:0,
  mission:600000,
  period: 4,
      income: {},
      addIncome: [],
      expenses: {},
      addExpenses: [],
      deposit: false,
      asking: function () {
		let addExpenses;
		do {
			addExpenses = prompt("Перечислите возможные расходы через запятую",	"Курсы, игры");
		} while (addExpenses === null);

		appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    
    


		let question, qanswer;
      for (let i = 0; i < 2; i++) {
        do {
          question = prompt('Введите обязательную статью расходов через запятую');
        } while(question === null);
            qanswer = +prompt('Во сколько это обойдется?', "10000");
          while(!isNumber(qanswer) || qanswer === 0) 
          {
            qanswer = +prompt('Во сколько это обойдется?', "10000");
        }
        appData.expenses[question] = qanswer;
      }
      while(Object.keys(appData.expenses).length === 1) {
        alert('Новые расходы');
        question = prompt('Введите обязательную статью расходов через запятую');
        qanswer = +prompt('Во сколько это обойдется?', "10000");
        appData.expenses[question] = qanswer;
    }
  },
       
       getExpensesMonth : function (){
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
       
    getBudget : function(a, b){
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        appData.budgetMonth = appData.budget - appData.expensesMonth;     
        },
getTargetMonth : function(){
    return appData.mission / appData.budgetMonth;
        
},

     

    //accumulatedMonth : getAccumulatedMonth(money, getExpensesMonth(amount2, amount1)),
  
   

    getStatusIncome : function(){
     
  if (appData.budget >= 1200){
      return("У вас высокий уровень дохода");
    }else if (appData.budget >600){
      return("У вас средний уровень дохода");
    }else if (appData.budget <= 600 || appData.budget >1){
      return("К сожалению у вас уровень дохода ниже среднего");
    }else if (appData.budget === 0 || appData.budget < 0){
      return "Что то пошло не так";
    }
  }
  
 

};
let allinformation = function () {
    for(let key in appData) {
      console.log(
        "Наша программа включает в себя данные:",
        key,
        appData[key]
      );
     
    
      
      }
};

appData.asking();
appData.getBudget();
appData.getExpensesMonth();
appData.getTargetMonth();
appData.getStatusIncome();



//console.log("Статус Вашего дохода: ", appData.getStatusIncome());

console.log("Расходы за месяц ", appData.expensesMonth);
console.log("Уровень дохода", appData.getStatusIncome());

if (appData.getTargetMonth() < 0) {
    console.log('Цель не будет достигнута');
}else {
    console.log('Цель будет достигнута за: ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
}
allinformation();