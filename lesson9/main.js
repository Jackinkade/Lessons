'use strict';

let start = document.getElementById("start"),
    incomeAdd = document.getElementsByTagName("button")[0],
    expensesAdd = document.getElementsByTagName("button")[1],
    depositCheck = document.querySelector("#deposit-check"),
    additionalIncomeItem = document.querySelectorAll(".additional_income-item"),

    budgetDayValue = document.getElementsByClassName("budget_day-value")[0], //not a result-budget_day
    budgetMonthValue = document.getElementsByClassName("budget_month-value")[0], // not a result-budget_month
    expensesMonthValue = document.getElementsByClassName("expenses_month-value")[0],
    additionalIncomeValue = document.getElementsByClassName("additional_income-value")[0],
    additionalExpensesValue = document.getElementsByClassName("additional_expenses-value")[0],
    incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
    targetMonthValue = document.getElementsByClassName("target_month-value")[0],

    salaryAmount = document.querySelector(".salary-amount"),
    incomeTitle = document.querySelector(".income-title"),
    incomeAmount = document.querySelector(".income-amount"),
    expensesTitle = document.querySelector(".expenses-title"),
    expensesItems = document.querySelector(".expenses-amount"),
    additionalExpenses = document.querySelector(".additional_expenses"),
    periodSelect = document.querySelector(".period-select");

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && n !=="" && n !== null;
    };

// replace start function
let appData = {
  budget: 0,//switched to 0 from money
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
      start: function () {

          if(salaryAmount.value === "") {
            alert("Ошибка, поле'Месячный доход' должно быть заполнено");
            return;
          }
            appData.budget = salaryAmount.value;
           
            appData.getExpenses();//from max's lesson 11
    // appData.asking();
    // appData.getExpensesMonth();
    // appData.getBudget();
          },
//код с урока аналогично которому нужно сделать дз
      addExpensesBlock: function () {

         
          let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
            expensesItems = document.querySelectorAll(".expenses-items");
            
            if(expensesItems.length === 3){
              expensesAdd.style.display = "none";
              
            }
          },

      getExpenses: function () {
         expensesItems.forEach(function(items)  {
            console.log(items);
         //  let itemExpenses = items.querySelector('.expenses-title').value;
          // let cashExpenses = items.querySelector('.expenses-amount').value;
            
          });
      },

      asking: function () {

        if(confirm( "Есть ли у вас дополнительный заработок?" )){
          let itemIncome;
          let cashIncome;

        do{
             itemIncome = prompt("Какой у вас есть дополнительный заработок?", "Продажа самагона");
        }while (itemIncome === null || itemIncome === "" || isNumber(itemIncome)
          );
           // не работает typeof itemIncome === "string"
        do{ 
            cashIncome = prompt("Сколко в месяц зарабатываете на этом?", "30000");
        }while (!isNumber(cashIncome));// нужно только это 

          appData.income[itemIncome] = cashIncome;
        }

     
      let addExpenses = (prompt("Перечислите возможные расходы через запятую", "Кино, игры")).trim();
        while (isNumber(addExpenses)){
            addExpenses = (prompt("Перечислите возможные расходы через запятую")).trim();
          }
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
  
      for (let i = 0; i < 2; i++) {
        let itemExpenses;
          do{
            let itemExpenses = prompt("Введите обязательную статью расходов","Прогулки с друзьями");
          }while (itemExpenses === "" || itemExpenses === null);
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
        }while (!isNumber(appData.moneyDeposit));

        do{
          appData.percentDeposit = +prompt('Какой процент?', 10);
        }while (!isNumber(appData.percentDeposit));
      }
    },
    
 
 
    calcSavedMoney: function(){
      
       do{ return appData.budgetMonth * appData.period;
      }while (!isNumber(appData.budgetMonth) && !isNumber(appData.period));
    }
};

let allinformation = function () {
    for (let key in appData) {
      console.log(
        "Наша программа включает в себя данные:",
        key,
        appData[key]  
      );
  }
  
};

start.addEventListener('click', appData.start);
expensesAdd.addEventListener('click', appData.addExpensesBlock);
// appData.asking();
// appData.getInfoDeposite();
// appData.calcSavedMoney();
// appData.getBudget();
// appData.getExpensesMonth();


// if (appData.getTargetMonth() < 0) {
//     console.log('Цель не будет достигнута');
// }else {
//     console.log('Цель будет достигнута за: ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
// }

// let newArr = [];
// for (let item of appData.addExpenses){
//   newArr.push(item[0].toUpperCase() + item.slice(1));
// }

//console.log("addExpenses in line: "+ newArr.join(", "));
//allinformation();







