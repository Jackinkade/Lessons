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
  return !isNaN(parseFloat(n)) && isFinite(n) && n !=="" && n !== null;
};


let money,
start = function () {
  do{
    money = +prompt("Ваш месячный доход", "100000");
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
  mission: 600000,
  period: 4,
  percentDeposit: 0,
  moneyDeposit: 0,
      income: {},
      addIncome: [],
      expenses: {},
      addExpenses: [],
      deposit: false,
      asking: function () {
        if(confirm("Есть ли у вас дополнительный заработок?")){
          let itemIncome;
          let cashIncome;
          do{
             itemIncome = prompt("Какой у вас есть дополнительный заработок?", "Продажа самагона");
        }while(itemIncome === null || itemIncome === "" || isNumber(itemIncome)
          ); // не работает typeof itemIncome === "string"
         do{ 
            cashIncome = prompt("Сколко в месяц зарабатываете на этом?", "30000");
        }while(!isNumber(cashIncome));// нужно только это 

          appData.income[itemIncome] = cashIncome;
        }

     
        let addExpenses = (prompt("Перечислите возможные расходы через запятую")).trim();
      while(!isNumber(addExpenses)){
     addExpenses = (prompt("Перечислите возможные расходы через запятую")).trim();
      }
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
          appData.deposit = confirm('Есть ли у вас депозит в банке?');
        


      for (let i = 0; i < 2; i++) {
      
      let itemExpenses = prompt("Введите обязательную статью расходов","Прогулки с друзьями");
    let cashExpenses;
    do {
      cashExpenses = prompt("Во сколько это обойдется", 10000);
    }
    while (!isNumber(cashExpenses) || cashExpenses === "" || cashExpenses === null);
    appData.expenses[itemExpenses] = +cashExpenses;
       }
     
     },
       
       getExpensesMonth : function (){
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
         }
         },
       
        getBudget : function(){
           appData.budgetMonth = appData.budget - appData.expensesMonth; 
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
              
            },
        getTargetMonth : function(){
            return appData.mission / appData.budgetMonth;
                
        },

     

    //accumulatedMonth : getAccumulatedMonth(money, getExpensesMonth(amount2, amount1)),
  
   

    getStatusIncome : function(){
     
  if (appData.budgetDay >= 1200){
      return("У вас высокий уровень дохода");
    }else if (appData.budgetDay > 600){
      return("У вас средний уровень дохода");
    }else if (appData.budgetDay < 600 ){
      return("К сожалению у вас уровень дохода ниже среднего");
    }else if (appData.budgetDay === 0 || appData.budgetDay < 0){
      return "Что то пошло не так";
    }
  },
    getInfoDeposite: function(){
      if(appData.deposit){
        do{        
            appData.moneyDeposit = +prompt("Какая сумма заложена", 10000);
       // }while(isNumber(appData.percentDeposit) && isNumber(appData.moneyDeposit));
        }while(!isNumber(appData.moneyDeposit));
        do{
            appData.percentDeposit = +prompt('Какой процент?', 10);
        }while (!isNumber(appData.percentDeposit));
      }
    },
    
    // addExpenses2: function (appData.addExpenses){
    //   let appData.addExpenses = str;
    //   return str.replace(/(^|\s)\S/g, function(a) {return a.toUpperCase()})
    // },
 
      calcSavedMoney: function(){
       do{ return appData.budgetMonth * appData.period;
      }while(!isNumber(appData.budgetMonth) && !isNumber(appData.period));
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
console.log("aaaa", appData.addExpenses);



appData.asking();
appData.getInfoDeposite();
appData.calcSavedMoney();
appData.getBudget();
appData.getExpensesMonth();

console.log("Расходы за месяц ", appData.expensesMonth);
console.log("Уровень дохода", appData.getStatusIncome());

if (appData.getTargetMonth() < 0) {
    console.log('Цель не будет достигнута');
}else {
    console.log('Цель будет достигнута за: ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
}
allinformation();

