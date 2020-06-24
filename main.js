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
    
   
start.disabled = true;

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

            this.budget = +salaryAmount.value;
            this.getExpenses();//from max's lesson 11
            this.getIncome();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getBudget();

            this.showResult();
            	start.style.display = 'none';
	          	cancel.style.display = 'block';
	          	cancel.style.marginLeft = '150px';
	
	
             },
         monthAmmountValue : function(){

            if(salaryAmount.value === "" || salaryAmount.value === null) {
              alert("Ошибка, поле'Месячный доход' должно быть заполнено");
              start.disabled = true;
              return;
            }else{
              start.disabled = false;
              }
            },
        
      showResult: function(){

          budgetMonthValue.value = this.budgetMonth;
          budgetDayValue.value = this.budgetDay;
          expensesMonthValue.value = this.expensesMonth;
          additionalExpensesValue.value = this.addExpenses.join(", ");
          additionalIncomeValue.value = this.addIncome.join(", ");
          targetMonthValue.value = this.getTargetMonth();
          incomePeriodValue.value = this.calcSavedMoney();

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
                appData.expenses[itemExpenses] = +cashExpenses;
                }
              } );
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

      getIncomeMonth: function () {

            let sum = 0;
            for (let key in this.income) {
                sum += +this.income[key];
            }
              return sum;
          },

      getAddIncome: function () {

            additionalIncomeItem.forEach(function(item){
              let itemValue = item.value.trim();
              if(itemValue !== ""){
                appData.addIncome.push(itemValue);
              }
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
        
      getExpensesMonth : function (){
      let sum = 0;
            for (let key in this.expenses) {
                sum += +this.expenses[key];// был +
              }
              this.expensesMonth = sum;
              return sum;
            },
      
      getBudget : function() {

        appData.budgetMonth = this.budget + this.getIncomeMonth() - this.getExpensesMonth(); 
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
          return appData.budgetMonth;
         },
             
      getPeriod: function () {

          periodAmount.value = periodSelect.value;
          periodAmount.textContent = periodSelect.value;
	      },

      getTargetMonth : function() {

         return Math.ceil(targetAmmount.value / this.getBudget());        
         },
  
   

      calcSavedMoney: function(){
      
        return this.budgetMonth * periodSelect.value;
         },
           	reset : function(){
		let deleteText = document.querySelectorAll("[type=text]");
		    deleteText.forEach(function(items){
         items.disabled = false;
          items.value = '';
     });
     
		start.style.display = 'none';
    cancel.style.display = 'none';
    
    start.disabled = true;
    } 
      };
       
  let startBind = function() {  
    appData.start();
      };
   
periodSelect.addEventListener("input", function(event){
    periodAmount.textContent = periodSelect.value;
    
});
  // appData.reset = function (elem) {
  //   let inputTextData = document.querySelectorAll('.data input[type = text]'),
  //       inputTypeText = document.querySelectorAll('.result input[type=text]');
  //    
     

      
    // };

  
start.addEventListener('click', startBind.bind(appData));
// cancel.addEventListener('click', function() {    //jquery $
//     (appData).closest(appData).find('input[type=text]').remove('');
// });
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriod);
salaryAmount.addEventListener('input', appData.monthAmmountValue);
cancel.addEventListener('click', appData.reset);
