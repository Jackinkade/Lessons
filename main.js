'use strict';
let isNumber = function (n){
  return !isNaN(parseFloat(n) && isFinite(n));
};
let start = document.getElementById("start"),
    cancel = document.getElementById("cancel"),
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
    targetMonthValue = document.getElementsByClassName("target_month-value")[0],//target_month-value может 

    
    salaryAmount = document.querySelector(".salary-amount"),
    incomeTitle = document.querySelector(".income-title"),
    incomeAmount = document.querySelector(".income-amount"),
    expensesTitle = document.querySelector(".expenses-title"),
    expensesItems = document.querySelectorAll(".expenses-items"),
    additionalExpenses = document.querySelector(".additional_expenses"),

    periodAmount = document.getElementsByClassName("period-amount")[0],
    periodSelect = document.getElementsByClassName("period-select")[0],

    additionalExpensesItem = document.querySelector(".additional_expenses-item"),
    targetAmmount = document.querySelector(".target-amount"),
    incomeItem = document.querySelectorAll(".income-items");
    
   
start.disabled = false;
cancel.disabled = false;
let appData = {
  budget: 0,//switched to 0 from money
  budgetDay: 0,
	budgetMonth: 0,
  expensesMonth: 0,
  incomeMonth: 0,
  percentDeposit: 0,
  moneyDeposit: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
      start: function () {

            appData.budget = +salaryAmount.value;
            appData.getExpenses();//from max's lesson 11
            appData.getIncome();
            appData.getExpensesMonth();
            appData.getAddExpenses();
            appData.getAddIncome();
            appData.getBudget();

            if(!isNumber(appData.budget)){
              cancel.disabled = true;
             return ; 
            }
            appData.showResult();
          },
         monthAmmountValue : function(){

             if(salaryAmount.value === "") {
            alert("Ошибка, поле'Месячный доход' должно быть заполнено");
            start.disabled = true;
            return;
             }else if(isNumber(salaryAmount.value)){
                alert("Введите число");
                start.disabled = true;
               return;
          }else{
            start.disabled = false;
          }
        },
        
      showResult: function(){
          budgetMonthValue.value = appData.budgetMonth;
          budgetDayValue.value = appData.budgetDay;
          expensesMonthValue.value = appData.expensesMonth;
          additionalExpensesValue.value = appData.addExpenses.join(", ");
          additionalIncomeValue.value = appData.addIncome.join(", ");
          targetMonthValue.value = Math.ceil(appData.getTargetMonth());
          incomePeriodValue.value = appData.calcPeriod();

      },
     
        
      getAddExpenses: function () {
          let addExpenses = additionalExpensesItem.value.split(", ");
          addExpenses.forEach(function (item) {

            item = item.trim();
            if(item !== ""){
              appData.addExpenses.push(item);
            }
          });
      },
      
      	getPeriod: function () {
		periodAmount.value = periodSelect.value;
		periodAmount.textContent = periodSelect.value;
	},
      getAddIncome: function () {
        additionalIncomeItem.forEach(function(item){
          let itemValue = item.value.trim();
          if(itemValue !== ""){
            appData.addIncome.push(itemValue);
          }
        });
      },
      addExpensesBlock: function () {//
   
          let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
            expensesItems = document.querySelectorAll(".expenses-items");
            
            if(expensesItems.length === 3){
              expensesAdd.style.display = "none";
              
            }
          },

      getExpenses: function () {//
         expensesItems.forEach(function(items)  {
            
           let itemExpenses = items.querySelector('.expenses-title').value;
           let cashExpenses = items.querySelector('.expenses-amount').value;
            if(itemExpenses !== "" && cashExpenses !== ""){
              appData.expenses[itemExpenses] = cashExpenses;
            }
          });
      },
      addIncomeBlock: function () {
		let addBlockItems1 = incomeItem[0].cloneNode(true);
		let addBlockItems2 = addBlockItems1.children;
		 {

			addBlockItems2.value = '';
		}
		incomeItem[0].parentNode.insertBefore(addBlockItems1, incomeAdd);
		incomeItem = document.querySelectorAll('.income-items');
    
    if (incomeItem.length === 3) {
			incomeAdd.style.display = 'none';
		}
	},
        getIncomeMonth: function () {
        let sum = 0;
        for (let key in appData.income) {
            sum += +appData.income[key];
        }
        return sum;
    },
      getIncome: function () {
     incomeItem.forEach(function (item) {
		
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				appData.income[itemIncome] = +cashIncome;
			}
    });
    

  },
       
    getExpensesMonth : function (){
   
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];// был +
          }
         },
      
    getBudget : function(){
        appData.budgetMonth = appData.budget + appData.getIncomeMonth - appData.getExpensesMonth; 
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        if(!isNumber(appData.budget)){
         return alert("Введите число");
        }
         },

    getTargetMonth : function(){
        return targetAmmount.value / appData.budgetMonth;        
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

  
    calcPeriod: function () {
      return appData.budgetMonth * periodSelect.value;
    },

    calcSavedMoney: function(){
      
       return appData.budgetMonth * periodSelect.value;
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
periodSelect.addEventListener("input", function(event){
    periodAmount.textContent = periodSelect.value;
    
});

start.addEventListener('click', appData.start);
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);




