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

const AppData =  function() {
 
  this.budget = 0;//switched to 0 from money
  this.budgetDay = 0;
	this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.incomeMonth = 0;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
};
AppData.prototype.start =  function () {
   console.log(this);
      this.budget = +salaryAmount.value;
      this.getExpenses();//from max's lesson 11
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      this.showResult();
        start.style.display = 'none';
        cancel.style.display = 'inline';
        incomeAdd.disabled = true;
        expensesAdd.disabled = true; 
        
        };

AppData.prototype.showResult = function(){
    let _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    
    
    periodSelect.addEventListener("change", function(){
        incomePeriodValue.value = _this.budgetMonth * periodSelect.value;
    });
      };

AppData.prototype.addExpensesBlock = function () {//
   let cloneExpensesItem = expensesItems[0].cloneNode(true);
          let cloneExpensesItem2 = cloneExpensesItem.children;
          
          for (let i =0; i < cloneExpensesItem2.length; i++){
            cloneExpensesItem2[i].value = "";
          }
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
            expensesItems = document.querySelectorAll(".expenses-items");
            
            if(expensesItems.length === 3){
              expensesAdd.style.display = "none";   
            }
          };
AppData.prototype.addIncomeBlock = function(){
           let cloneExpensesItem = incomeItem[0].cloneNode(true);
          let cloneExpensesItem2 = cloneExpensesItem.children;
          for (let i =0; i < cloneExpensesItem2.length; i++){
            cloneExpensesItem2[i].value = "";
          }
            incomeItem[0].parentNode.insertBefore(cloneExpensesItem, incomeAdd);
            incomeItem = document.querySelectorAll(".income-items");
            
            if(incomeItem.length === 3){
              incomeAdd.style.display = "none";   
            }
          };
  AppData.prototype.getExpenses = function () {//
    let _this = this;
      expensesItems.forEach(function(items)  {
        let itemExpenses = items.querySelector('.expenses-title').value;
        let cashExpenses = items.querySelector('.expenses-amount').value;
          if(itemExpenses !== "" && cashExpenses !== ""){
            _this.expenses[itemExpenses] = +cashExpenses;
            }
          } );
      };

  AppData.prototype.getIncome = function () {
    let _this = this;
      incomeItem.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

        if (itemIncome !== '' && cashIncome !== '') {
          _this.income[itemIncome] = +cashIncome;
          }
        });
      };

  AppData.prototype.getIncomeMonth = function () {
      let sum = 0;
        for (let key in this.income) {
            sum += +this.income[key];
        }
          return sum;
      };

  AppData.prototype.getAddIncome = function () {
      let _this = this;
      	this.addExpenses = [];
        additionalIncomeItem.forEach(function(item){
          let itemValue = item.value.trim();
          if(itemValue !== ""){
            _this.addIncome.push(itemValue);
          }
        });
    };

  AppData.prototype.getAddExpenses = function () {

    let addExpenses = additionalExpensesItem.value.split(", ");
    let _this = this;
    	this.addExpenses = [];
      addExpenses.forEach(function (item) {
        item = item.trim();
        if(item !== ""){
          _this.addExpenses.push(item);
          }
        });
    };
  
AppData.prototype.getExpensesMonth = function (){
    let sum = 0;
      for (let key in this.expenses) {
          sum += +this.expenses[key];// был +
        }
          this.expensesMonth = sum;
          return sum;
      };

  AppData.prototype.getBudget = function() {
      this.budgetMonth = this.budget + this.getIncomeMonth() - this.getExpensesMonth(); 
      this.budgetDay = Math.floor(this.budgetMonth / 30);
        return this.budgetMonth;
        };
        
  AppData.prototype.getPeriod= function () {
      periodAmount.value = periodSelect.value;
      periodAmount.textContent = periodSelect.value;
    };

  AppData.prototype.getTargetMonth = function() {
      return Math.ceil(targetAmmount.value / this.getBudget());        
      };
  AppData.prototype.reset = function(){
     let deleteText = document.querySelectorAll("[type=text]");
            deleteText.forEach(function(items){
          
          depositCheck.checked = false;
          periodAmount.textContent = "1";
          periodSelect.value = "1";
         items.disabled = false;
          items.value = '';
     });
     budgetDayValue.disabled = true;
        budgetMonthValue.disabled = true;
        expensesMonthValue.disabled = true;
        additionalIncomeValue.disabled = true;
        additionalExpensesValue.disabled = true;
        incomePeriodValue.disabled = true;
        targetMonthValue.disabled = true;
        start.style.display = '';
    cancel.style.display = '';
    
    start.disabled = true;
  };
 AppData.prototype.calcSavedMoney= function(){
      return this.budgetMonth * periodSelect.value;
        };
    AppData.prototype.eventListeners = function() {
  
    start.addEventListener('click', this.start);
    cancel.addEventListener('click', this.reset);
    
    
    expensesAdd.addEventListener('input', this.addExpensesBlock);
    incomeAdd.addEventListener('input', this.addIncomeBlock);

    periodSelect.value = "1";
    periodAmount.textContent = "1";

};

const appData = new AppData();

// appData.start = appData.start.bind(appData);
// appData.reset = appData.reset.bind(appData);
// appData.getExpenses = appData.getExpenses.bind(appData); 
// appData.getIncome = appData.getIncome.bind(appData);
// appData.getAddExpenses = appData.getAddExpenses.bind(appData); 
// appData.getAddIncome = appData.getAddIncome.bind(appData);
// appData.getTargetMonth = appData.getTargetMonth.bind(appData);
// appData.getPeriod = appData.getPeriod.bind(appData);
// appData.calcSavedMoney = appData.calcSavedMoney.bind(appData);

appData.eventListeners();
console.log(appData);



 
