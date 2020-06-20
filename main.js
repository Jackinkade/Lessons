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
    targetMonthValue = document.getElementsByClassName("target_month")[0],//target_month-value может 

    
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
    
   


// replace start function
let appData = {
  budget: 0,//switched to 0 from money
  budgetDay: 0,
	budgetMonth: 0,
  expensesMonth: 0,
  incomeMonth: 0,
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
          
            appData.budget = +salaryAmount.value;
           
            appData.getExpenses();//from max's lesson 11
            appData.getIncome();
            appData.getExpensesMonth();
            appData.getAddExpenses();
            appData.getAddIncome();
      
            appData.getBudget();
            appData.showResult();
          },
//
      showResult: function(){
          budgetMonthValue.value = appData.budgetMonth;
          budgetDayValue.value = appData.budgetDay;
          expensesMonthValue.value = appData.expensesMonth;
          additionalExpensesValue.value = appData.addExpenses.join(", ");
          additionalIncomeValue.value = appData.addIncome.join(", ");
          targetMonthValue.value = Math.ceil(appData.getTargetMonth());
          incomePeriodValue.value = appData.calcPeriod();
          
          periodSelect.addEventListener('change', function () {
			    incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
		});
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
		for (let i = 0; i < addBlockItems2.length; i++) {

			addBlockItems2[i].value = '';
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
      let sum = 0;
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
          }return sum;
         },
       
    getBudget : function(){
        appData.budgetMonth = appData.budget + appData.getIncomeMonth() - appData.getExpensesMonth(); 
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
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

    // getInfoDeposite: function(){

    //   if(appData.deposit){
    //     do{        
    //       appData.moneyDeposit = +prompt("Какая сумма заложена", 10000);
    //    // }while(isNumber(appData.percentDeposit) && isNumber(appData.moneyDeposit));
    //     }while (!isNumber(appData.moneyDeposit));

    //     do{
    //       appData.percentDeposit = +prompt('Какой процент?', 10);
    //     }while (!isNumber(appData.percentDeposit));
    //   }
    // },
    calcPeriod: function () {
      return appData.budgetMonth * periodSelect.value;
    },

    calcSavedMoney: function(){
      
       return appData.budgetMonth * appData.period;
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
periodAmount.addEventListener("input", function(event){
  periodSelect.textContent = event.target.value;
});
start.addEventListener('click', appData.start);
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);

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




