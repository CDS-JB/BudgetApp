<template>
  <div class="page">
    <div class="row">
      <div class="shadow p-3 mb-5 bg-white rounded tabSmall col-md">
        <div class="container">
          <div class="row">
            <div class="col-1 iconAlign">
              <img
                src="/images/cash-stack.svg"
                alt=""
                width="40"
                height="40"
                title="Bootstrap"
              />
            </div>
            <div class="col-2"></div>
            <div class="col-8">
              <span style="color: grey">Balance:</span>
              <h3>&#163;{{ display.balance }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="shadow p-3 mb-5 bg-white rounded tabSmall col-md">
        <div class="container">
          <div class="row">
            <div class="col-1 iconAlign">
              <img
                src="/images/wallet2.svg"
                alt=""
                width="40"
                height="40"
                title="Bootstrap"
              />
            </div>
            <div class="col-2"></div>
            <div class="col-8">
              <span style="color: grey">Remaining:</span>
              <h3>&#163;{{ display.remaining }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="shadow p-3 mb-5 bg-white rounded tabSmall col-md">
        <div class="container">
          <div class="row">
            <div class="col-1 iconAlign">
              <img
                src="/images/graph-up.svg"
                alt=""
                width="40"
                height="40"
                title="Bootstrap"
              />
            </div>
            <div class="col-2"></div>
            <div class="col-8">
              <span style="color: grey">Income:</span>
              <h3>&#163;{{ display.income }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="shadow p-3 mb-5 bg-white rounded tabSmall col-md">
        <div class="container">
          <div class="row">
            <div class="col-1 iconAlign">
              <img
                src="/images/graph-down.svg"
                alt=""
                width="40"
                height="40"
                title="Bootstrap"
              />
            </div>
            <div class="col-2"></div>
            <div class="col-8">
              <span style="color: grey">Expenses:</span>
              <h3>&#163;{{ display.expenses }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <button
        ref="chartswap"
        type="button"
        class="btn"
        :class="showIncome ? 'btn-income' : 'btn-income'"
        @click="showIncome = true"
      >
        Income
      </button>
      <button
        ref="chartswap"
        type="button"
        class="btn"
        :class="showIncome ? 'btn-expense' : 'btn-expense'"
        @click="showIncome = false"
      >
        Expenses
      </button>
    </div>
    <div class="shadow p-3 mb-5 bg-white rounded" style="max-width: 500px">
      <h4>Chart Overview</h4>
      <line-time-chart
        :chart-data="showIncome ? incomeLineChartData : expensesLineChartData"
      ></line-time-chart>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import lineTime from "../charts/line-time";

export default {
  components: {
    "line-time-chart": lineTime,
  },

  data() {
    return {
      user: {},
      transactions: [],
      payments: [],
      display: {
        balance: 0.0,
        income: 0.0,
        expenses: 0.0,
        remaining: 0.0,
      },
      selectedMonth: 10,
      incomeLineChartData: {
        labels: [],
        datasets: [
          {
            label: "Income",
            lineTension: 0,
            backgroundColor: "rgba(10, 148, 35, 0.1)",
            borderColor: "rgba(10, 148, 35, 0.5)",
            pointBackgroundColor: "rgb(10, 148, 35)",
            pointBorderColor: "rgb(10, 148, 35)",
            data: [],
          },
        ],
      },
      expensesLineChartData: {
        labels: [],
        datasets: [
          {
            label: "Expenses",
            lineTension: 0,
            backgroundColor: "rgba(184, 4, 4, 0.1)",
            borderColor: "rgba(184, 4, 4, 0.5)",
            pointBackgroundColor: "rgb(184, 4, 4)",
            pointBorderColor: "rgb(184, 4, 4)",
            data: [],
          },
        ],
      },
      showIncome: true,
    };
  },

//--------------------- Transaction Calculations ----------------------------- \\
  methods: {
    calcBalance() {
      // get EndBalance of most recent transaction
      this.display.balance = this.round(
        this.transactions[this.transactions.length - 1].EndBalance
      );
    },

    calcIncome() {
      var income = 0;
      var data = Object.assign({}, this.incomeLineChartData);
      var prevDate = 0;
      var totalAmount = 0;

      this.transactions
        .filter((t) => {
          return t.Type == "Income";
        })
        .forEach((t) => {
          income += t.Amount;

          var date = t.Date;
          if (prevDate !== date) {
            if (prevDate !== 0) {
              data.labels.push(moment(prevDate, "YYYY-MM-DD"));
              data.datasets[0].data.push({
                t: moment(prevDate, "YYYY-MM-DD"),
                y: totalAmount,
              });
            }

            prevDate = date;
            totalAmount = t.Amount;
          } else {
            totalAmount = totalAmount + t.Amount;
          }
        });

      data.labels.push(moment(prevDate, "YYYY-MM-DD"));
      data.datasets[0].data.push({
        t: moment(prevDate, "YYYY-MM-DD"),
        y: totalAmount,
      });

      this.display.income = this.round(income);
      this.incomeLineChartData = data;
    },

    calcExpenses() {
      var expenses = 0;
      var data = Object.assign({}, this.expensesLineChartData);
      var prevDate = 0;
      var totalAmount = 0;

      this.transactions
        .filter((t) => {
          return t.Type == "Expense";
        })
        .forEach((t) => {
          expenses += t.Amount;

          var date = t.Date;
          if (prevDate !== date) {
            if (prevDate !== 0) {
              data.labels.push(moment(prevDate, "YYYY-MM-DD"));
              data.datasets[0].data.push({
                t: moment(prevDate, "YYYY-MM-DD"),
                y: totalAmount,
              });
            }

            prevDate = date;
            totalAmount = t.Amount;
          } else {
            totalAmount = totalAmount + t.Amount;
          }
        });

      data.labels.push(moment(prevDate, "YYYY-MM-DD"));
      data.datasets[0].data.push({
        t: moment(prevDate, "YYYY-MM-DD"),
        y: totalAmount,
      });

      this.display.expenses = this.round(expenses);
      this.expensesLineChartData = data;
    },

    calcRemaining() {
      // get EndBalance of most recent transaction for currently displayed month
      var filteredTransactions = this.transactions.filter((t) => {
        return this.selectedMonth == moment(t.Date, "YYYY-MM-DD").format("MM");
      });

      this.display.remaining = this.round(
        filteredTransactions[filteredTransactions.length - 1].EndBalance
      );
    },

    round(value, dec = 2) {
      return parseFloat(
        Number(Math.round(value + "e" + dec) + "e-" + dec).toFixed(dec)
      );
    },

//--------------------- CALCULATE INCOME----------------------------- \\

    // Calculates income balances
    calcPaymentIncomeBalances() {
      var balance = 0;

      this.payments.filter((p) => {
        return (
        p.PaymentType == "Income"
        && p.FrequencyType == 'Balance' 
        && p.IncInBudget == 'true'
        );
      }).forEach((p) => {
        balance += p.Amount
      })
      this.display.balance = this.round(balance);
     // this.incomeLineChartData = data;
    },
  

    // Calculates Lump sum income
    calcPaymentIncomeLumpSum() {
      var income = 0;

      this.payments.filter((p) => {
        return (
          p.PaymentType == "Income" 
          && p.FrequencyType == 'Lump sum' 
          && p.IncInBudget == 'true'
          && p.PaymentStart > moment().format()
          );
      }).forEach((p) => {
        income += p.Amount
      })
      this.display.income = this.round(income);
    },

    // Caclulate Weekly Income
    calcPaymentIncomeWeekly() {
      var income = 0;

      this.payments.filter((p) => {
        return (
        p.PaymentType == "Income" 
        && p.FrequencyType == 'Weekly' 
        && p.IncInBudget == 'true'
        && p.PaymentEnd > moment().format()
        );
      }).forEach((p) => {
        var StartDate = moment(p.PaymentStart)
        var EndDate = moment(p.PaymentEnd)
        var TargetDate = moment(p.TargetDate)

        if (p.TargetDate < p.PaymentEnd) {EndDate = TargetDate;}

      //  console.log(StartDate)
      //  console.log(EndDate)
      //  console.log(EndDate.diff(StartDate, 'days'))
        
        income += ((p.Amount * EndDate.diff(StartDate, 'weeks')) / p.Frequency)
        //income = EndDate.diff(StartDate, 'days')
      })
      this.display.income = this.round(income);
    },

    // Calculates Monthly Income
    calcPaymentIncomeMonthly() {
      var income = 0;

      this.payments.filter((p) => {
        return (
        p.PaymentType == "Income" 
        && p.FrequencyType == 'Monthly' 
        && p.IncInBudget == 'true'
        && p.PaymentEnd > moment().format()
        );
      }).forEach((p) => {
        var StartDate = moment(p.PaymentStart)
        var EndDate = moment(p.PaymentEnd)
        var TargetDate = moment(p.TargetDate)

        if (p.TargetDate < p.PaymentEnd) {EndDate = TargetDate;}

        income += ((p.Amount * EndDate.diff(StartDate, 'months')) / p.Frequency)
      })
      this.display.income = this.round(income);
    },

    // Calculates total income
    calcPaymentIncomeTotal() {
      var remaining = 0;
      var Balances = this.calcPaymentIncomeBalances();
      var Lumpsums = this.calcPaymentIncomeLumpSum();
      var sum = Balances + Lumpsums

      remaining = sum
      //+ this.calcPaymentIncomeWeekly()
      //+ this.calcPaymentIncomeMonthly();

      this.display.remaining = this.round(remaining);
    },

//--------------------- CALCULATE OUTCOME ----------------------------- \\

    // Calculates outcome debt
    calcPaymentOutcomeBalances() {
      var expenses = 0;

      this.payments.filter((p) => {
        return (
        p.PaymentType == "Outcome"
        && p.FrequencyType == 'Debt' 
        && p.IncInBudget == 'true'
        );
      }).forEach((p) => {
        expenses += p.Amount
      })
      this.display.expenses = this.round(expenses);
    },

    // Calculates Lump sum outcome
    calcPaymentOutcomeLumpSum() {
      var expenses = 0;

      this.payments.filter((p) => {
        return (
          p.PaymentType == "Outcome" 
          && p.FrequencyType == 'Lump sum' 
          && p.IncInBudget == 'true'
          && p.PaymentStart > moment().format()
          );
      }).forEach((p) => {
        expenses += p.Amount
      })
      this.display.expenses = this.round(expenses);
    },

    // Caclulate Weekly Outgoings
    calcPaymentOutcomeWeekly() {
      var expenses = 0;

      this.payments.filter((p) => {
        return (
        p.PaymentType == "Outcome" 
        && p.FrequencyType == 'Weekly' 
        && p.IncInBudget == 'true'
        && p.PaymentEnd > moment().format()
        );
      }).forEach((p) => {
        var StartDate = moment(p.PaymentStart)
        var EndDate = moment(p.PaymentEnd)
        var TargetDate = moment(p.TargetDate)

        if (p.TargetDate < p.PaymentEnd) {EndDate = TargetDate;}
        
        expenses += ((p.Amount * EndDate.diff(StartDate, 'weeks')) / p.Frequency)
        
      })
      this.display.expenses = this.round(expenses);
    },

    // Calculates Monthly Outcome
    calcPaymentOutcomeMonthly() {
      var expenses = 0;

      this.payments.filter((p) => {
        return (
        p.PaymentType == "Outcome" 
        && p.FrequencyType == 'Monthly' 
        && p.IncInBudget == 'true'
        && p.PaymentEnd > moment().format()
        );
      }).forEach((p) => {
        var StartDate = moment(p.PaymentStart)
        var EndDate = moment(p.PaymentEnd)
        var TargetDate = moment(p.TargetDate)

        if (p.TargetDate < p.PaymentEnd) {EndDate = TargetDate;}

        expenses += ((p.Amount * EndDate.diff(StartDate, 'months')) / p.Frequency)
      })
      this.display.expenses = this.round(expenses);
    }

  },

  mounted() {
    axios.get("/api/report").then((res) => {
      //var remaining = 0.0
      //var IncomeLumpSum = this.calcPaymentIncomeLumpSum();
      //var IncomeWeekly = this.calcPaymentIncomeWeekly();
      this.user = res.data.user;
      this.transactions = res.data.transactions;
      this.payments = res.data.payments;
      //this.calcBalance();
      this.calcPaymentIncomeBalances();
      //this.calcPaymentIncomeBalances();
      //this.calcPaymentIncomeLumpSum();
      //this.calcPaymentIncomeWeekly();
      this.calcPaymentIncomeMonthly();
      //this.calcExpenses();
      //this.calcPaymentOutcomeBalances();
      //this.calcPaymentOutcomeLumpSum();
      //this.calcPaymentOutcomeWeekly();
      this.calcPaymentOutcomeMonthly();
      this.calcRemaining();
      //remaining = IncomeLumpSum + IncomeWeekly;
    });
  },
};
</script>