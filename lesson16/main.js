'use strict';


const isNumber = function (n){
  return !isNaN(parseFloat(n) && isFinite(n));
};
let start = document.getElementById("start"),
    cancel = document.getElementById("cancel"),
    incomeAdd = document.getElementsByTagName("button")[0],
    expensesAdd = document.getElementsByTagName("button")[1],
    depositCheck = document.getElementById("deposit-check"),
    depositBank = document.querySelector(".deposit-bank"),
    depositAmount = document.querySelector(".deposit-amount"),
    depositPercent = document.querySelector(".deposit-percent"),
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
    periodSelect = document.querySelector(".period-select"),

    additionalExpensesItem = document.querySelector(".additional_expenses-item"),
    targetAmmount = document.querySelector(".target-amount"),
    incomeItem = document.querySelectorAll(".income-items");
    
   
start.disabled = true;

class AppData {
  constructor() {
  this.budget= 0;
  this.budgetDay= 0;
	this.budgetMonth= 0;
  this.expensesMonth= 0;
  this.incomeMonth= 0;
  this.percentDeposit= 0;
  this.moneyDeposit= 0;
  this.income= {};
  this.addIncome= [];
  this.expenses ={};
  this.addExpenses =[];
  this.deposit= false;
}
start() {
    this.budget = +salaryAmount.value;
    this.getExpenses();//from max's lesson 11
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
    start.style.display = 'none';
    cancel.style.display = 'block';
    cancel.style.marginLeft = '150px';
    let inputDel = document.querySelectorAll('[type="text"]');
     inputDel.forEach(function(item) {
         item.disabled = true; 
     });
}
    monthAmmountValue(){
            if(salaryAmount.value === "" || salaryAmount.value === null) {
              alert("Ошибка, поле'Месячный доход' должно быть заполнено");
                start.disabled = true;
                return;
            }else{
                start.disabled = false;
              }
            }
        
     showResult(){
          budgetMonthValue.value = this.budgetMonth;
          budgetDayValue.value = this.budgetDay;
          expensesMonthValue.value = this.expensesMonth;
          additionalExpensesValue.value = this.addExpenses.join(", ");
          additionalIncomeValue.value = this.addIncome.join(", ");
          targetMonthValue.value = this.getTargetMonth();
          incomePeriodValue.value = this.calcSavedMoney();
          
    periodSelect.addEventListener('input', () => {
      incomePeriodValue.value = this.calcSavedMoney();
    });
           }
        
  
	addIncomeBlock(){
          const cloneExpensesItem = incomeItem[0].cloneNode(true);
          const cloneExpensesItem2 = cloneExpensesItem.children;
            for (let i =0; i < cloneExpensesItem2.length; i++){
              cloneExpensesItem2[i].value = "";
            }
              incomeItem[0].parentNode.insertBefore(cloneExpensesItem, incomeAdd);
              incomeItem = document.querySelectorAll(".income-items");
              
              if(incomeItem.length === 3){
                incomeAdd.style.display = "none";   
              }
            }
      	addExpensesBlock() {//
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
              }
      
      getExpenses() {//
            const _this = this;
            expensesItems.forEach((items) => {
              const itemExpenses = items.querySelector('.expenses-title').value;
              const cashExpenses = items.querySelector('.expenses-amount').value;
                  if(itemExpenses !== "" && cashExpenses !== ""){
                    _this.expenses[itemExpenses] = +cashExpenses;
                    }
                  } );
              }
      	getIncome() {
            const _this = this;
            incomeItem.forEach((item) => {
              const itemIncome = item.querySelector('.income-title').value;
              const cashIncome = item.querySelector('.income-amount').value;

              if (itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = +cashIncome;
                }
              });
            }

      	getIncomeMonth() {
            let sum = 0;
            for (let key in this.income) {
                sum += +this.income[key];
            }
              return sum;
          }

      	getAddIncome() {
            const _this = this;
                additionalIncomeItem.forEach((item) =>{
                  let itemValue = item.value.trim();
                  if(itemValue !== ""){
                    _this.addIncome.push(itemValue);
                  }
                });
              }

      getAddExpenses() {	
            const _this = this;
                let addExpenses = additionalExpensesItem.value.split(", ");
                addExpenses.forEach((item) => {

                  item = item.trim();
                  if(item !== ""){
                    _this.addExpenses.push(item);
                    }
                  });
              }
            
      getExpensesMonth(){
          let sum = 0;
                for (let key in this.expenses) {
                    sum += +this.expenses[key];// был +
                  }
                  this.expensesMonth = sum;
                  return sum;
                }
        getPeriod() {
          periodAmount.value = periodSelect.value;
          periodAmount.textContent = periodSelect.value;
	      }
    //     changeRange(){
    
    //         incomePeriodValue.value = this.getPeriod();
      getTargetMonth() {
          return Math.ceil(targetAmmount.value / this.getBudget());
      }
      calcSavedMoney(){
            return this.budgetMonth * periodAmount.value;
            }
    
      getInfoDeposit(){
          if(this.deposit){
              this.percentDeposit = depositPercent.value;
              this.moneyDeposit = depositAmount.value;

          }
      }
      changePercent(){
        const valueSelect  = this.value;
        
        if(valueSelect === 'other'){
            depositPercent.style.display = "inline-block";
        }else {
              depositPercent.value = valueSelect;
        }
      }
      depositHandler(){
       if(depositCheck.checked){
          depositBank.style.display = 'inline-block';
          depositAmount.style.display = 'inline-block';
          this.deposit = true;
          depositBank.addEventListener("change", this.changePercent);
          
        }else {
          depositBank.style.display = 'none';
          depositAmount.style.display = 'none';
          depositAmount.value = "";
          depositBank.value = "";
          this.deposit = false;
           depositBank.removeEventListener("change", this.changePercent);
        }
       
      }
       getBudget() {
            const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
            this.budgetMonth = Math.ceil(this.budget + this.getIncomeMonth() -
             this.getExpensesMonth() + monthDeposit); 
            this.budgetDay = Math.floor(this.budgetMonth / 30);
              return this.budgetMonth;
         }
        reset() {

         this.budget = 0;
         this.budgetDay = 0;
         this.budgetMonth = 0;
         this.expensesMonth = 0;
         this.incomeMonth = 0;
         this.percentDeposit = 0;
         this.moneyDeposit = 0;
         this.income = {};
         this.addIncome = [];
         this.expenses = {};
         this.addExpenses =[];
         this.deposit = false;
        

            const deleteText = document.querySelectorAll("[type=text]"),
            range = document.querySelectorAll('[type="range"]');
              deleteText.forEach((items) =>{
            
              incomePeriodValue.value = "1";
              periodAmount.textContent = "1";
              periodSelect.value = "1";
              periodAmount.value = "1";
              items.disabled = false;
              items.value = '';
              range.value = 1;
          });
            

            const input = document.querySelectorAll('input');
              input.forEach((item) => {
              item.value = '';
              cancel.style.display = 'none';
              start.style.display = 'inline'; 
               periodAmount.textContent = "1";
              periodSelect.value = "1";
              periodAmount.value = "1";
              range.value = 1;
            });
          
            let  expensesItems = document.querySelectorAll('.expenses-items');
             expensesItems.forEach((item, i) => {
                if (i !== 0) {
                    item.remove();
                }
            });
            if (depositCheck.checked) {
                depositAmount.value = '';
                depositPercent.value = '';
                depositBank.value = '';
                depositBank.style.display = 'none';
                depositAmount.style.display = 'none';
                depositPercent.style.display = 'none';
                
    }	
    

             
    } 
      
eventListeners () {
    start.addEventListener('click', this.start.bind(this));
    expensesAdd.addEventListener('click', this.addExpensesBlock);
    incomeAdd.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', this.changeRange);
    
    salaryAmount.addEventListener('input', this.monthAmmountValue);
    cancel.addEventListener('click', this.reset.bind(this));
    periodSelect.addEventListener("input", function(event){
    periodAmount.textContent = periodSelect.value;
    
 });
  depositCheck.addEventListener("change", this.depositHandler.bind(this));
 
  depositPercent.addEventListener("change", () => {
				if (!isNumber(depositPercent.value) || depositPercent.value < 0 || depositPercent.value > 100) {
            start.disabled = true;
            depositPercent.value = "";
            depositAmount.value = "";
              alert("Ведите корректные данные по процентам!");
              return;
				       
		  	}else if (!isNumber(depositAmount.value)){
                  start.disabled = true;
                  depositPercent.value = "";
                  depositAmount.value = "";
              alert("Ведите корректные данные!");
              return;
				      
			}else{
        start.disabled = false;
      }
    
		});
  }
}

const appData = new AppData();
appData.eventListeners();