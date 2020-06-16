'use strict';
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
start = function () {
  do{
    money = prompt("Ваш месячный доход", "");
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
  expensesMonth: 0,
  mission:600000,
      income: {},
      addIncome: [],
      expenses: {},
      addExpenses: [],
      deposit: true,
       
      getExpensesMonth : function (){
          let sum = 0;
            for (let key in appData.expenses) {
              sum += appData.expenses[key];
		}
		return sum;
      },
       getStatusIncome : function(){
   
    
    if (appData.budgetDay >= 1200){
      console.log("У вас высокий уровень дохода");
    }else if (appData.budgetDay >600){
      console.log("У вас средний уровень дохода");
    }else if (appData.budgetDay <= 600 || appData.budgetDay >1){
      console.log("К сожалению у вас уровень дохода ниже среднего");
    }else if (appData.budgetDay ===0 || appData.budgetDay <0){
      console.log("Что то пошло не так");
    }
    },


      getBudget : function(a, b){
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        appData.budgetMonth = appData.budget - appData.getExpensesMonth();
        if(this.budgetDay && this.budgetMonth <= 0){
           this.budgetDay =0;
          this.budgetMonth = 0;
    
        }
	        
    },
    //accumulatedMonth : getAccumulatedMonth(money, getExpensesMonth(amount2, amount1)),
  
      getTargetMonth : function(){
    
        let splitNumber = Math.ceil(appData.mission / appData.getBudget());
        if (splitNumber < 0) {
            return `Цель не будет достигнута!`;
        } else {
            return `Цель будет достигнута через: ${splitNumber}`;
        }

},
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
console.log(appData.getTargetMonth());
console.log("Расходы за месяц ", appData.getExpensesMonth());

allinformation();
