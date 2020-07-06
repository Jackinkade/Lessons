
const isNumber = function(n) {
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
    targetMonthValue = document.getElementsByClassName("target_month-value")[0], //target_month-value может


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
    incomeItem = document.querySelectorAll(".income-items"),
    checkInputText = document.querySelectorAll('[placeholder="Наименование"]'),
  	checkInputNumber = document.querySelectorAll('[placeholder="Сумма"]');


start.disabled = true;

const appData = {
    budget: 0, //switched to 0 from money
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
    start() {
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

    monthAmmountValue() {
        if (salaryAmount.value === "" || salaryAmount.value === null) {
            alert("Ошибка, поле'Месячный доход' должно быть заполнено");
            start.disabled = true;
            return;
        } else {
            start.disabled = false;
        }
    },

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(", ");
        additionalIncomeValue.value = this.addIncome.join(", ");
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
    },
    addIncomeBlock() {
        const cloneExpensesItem = incomeItem[0].cloneNode(true);
        const cloneExpensesItem2 = cloneExpensesItem.children;
        for (let i = 0; i < cloneExpensesItem2.length; i++) {
            cloneExpensesItem2[i].value = "";
        }
        incomeItem[0].parentNode.insertBefore(cloneExpensesItem, incomeAdd);
        incomeItem = document.querySelectorAll(".income-items");

        if (incomeItem.length === 3) {
            incomeAdd.style.display = "none";
        }
    },

    addExpensesBlock() { //
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        const cloneExpensesItem2 = cloneExpensesItem.children;
        for (let i = 0; i < cloneExpensesItem2.length; i++) {
            cloneExpensesItem2[i].value = "";
        }
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll(".expenses-items");

        if (expensesItems.length === 3) {
            expensesAdd.style.display = "none";
        }
    },

    getExpenses() { //
        const _this = this;
        expensesItems.forEach(items => {
            const itemExpenses = items.querySelector('.expenses-title').value;
            const cashExpenses = items.querySelector('.expenses-amount').value;
            if (itemExpenses !== "" && cashExpenses !== "") {
                _this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },

    getIncome() {
        const _this = this;
        incomeItem.forEach(item => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = +cashIncome;
            }
        });
    },

    getIncomeMonth() {
        let sum = 0;
        for (const key in this.income) {
            sum += +this.income[key];
        }
        return sum;
    },

    getAddIncome() {
        const _this = this;
        additionalIncomeItem.forEach(item => {
            const itemValue = item.value.trim();
            if (itemValue !== "") {
                _this.addIncome.push(itemValue);
            }
        });
    },

    getAddExpenses() {
        const _this = this;
        const addExpenses = additionalExpensesItem.value.split(", ");
        addExpenses.forEach(item => {

            item = item.trim();
            if (item !== "") {
                _this.addExpenses.push(item);
            }
        });
    },

    getExpensesMonth() {
        let sum = 0;
        for (const key in this.expenses) {
            sum += +this.expenses[key];// был +
        }
        this.expensesMonth = sum;
        return sum;
    },

    getBudget() {
        this.budgetMonth = this.budget + this.getIncomeMonth() - this.getExpensesMonth();
        this.budgetDay = Math.floor(appData.budgetMonth / 30);
        return appData.budgetMonth;
    },

    getPeriod() {
        periodAmount.value = periodSelect.value;
        periodAmount.textContent = periodSelect.value;
	      },

    getTargetMonth() {

        return Math.ceil(targetAmmount.value / this.getBudget());
    },

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    },

    reset() {
        const deleteText = document.querySelectorAll("[type=text]");
        deleteText.forEach(items => {

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
    }
};

// const checlInputNumber = () => {
//   if ()
// };

const startBind = function() {
    this.start();
};

periodSelect.addEventListener("input", event => {
    periodAmount.textContent = periodSelect.value;

});
start.addEventListener('click', startBind.bind(appData));
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriod);
salaryAmount.addEventListener('input', appData.monthAmmountValue);
cancel.addEventListener('click', appData.reset);

checkInputText.forEach(check => {
    check.addEventListener('input', () => {
        check.value = check.value.replace(/[^а-я]/, '');
    });
});
checkInputNumber.forEach(check => {
    check.addEventListener('input', () => {
        check.value = check.value.replace(/[^0-9]/, '');
    });
});

