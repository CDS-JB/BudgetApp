<template>
  <div class="page">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          
          <!-- /* START OF SMALL TABS */ -->
          <div class="container">
            <div class="row">
              <div class="col-6">
                <div class="shadow p-3 mb-5 bg-white rounded tabSmall">
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
              </div>

              <div class="col-6">
                <div class="shadow p-3 mb-5 bg-white rounded tabSmall">
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
              </div>
            </div>
          </div>

          <div class="container">
            <div class="row">
              <div class="col-6">
                <div class="shadow p-3 mb-5 bg-white rounded tabSmall">
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
              </div>

              <div class="col-6">
                <div class="shadow p-3 mb-5 bg-white rounded tabSmall">
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
            </div>
          </div>
          <!-- /* END OF SMALL TABS */ -->

          <div class="row desktopTips">
            <div class="col-12 ">
              <div class="shadow p-3 mb-5 bg-white rounded tabSmall">
                <div class="container">
                  <div
                    id="carouselContent"
                    class="carousel slide"
                    data-ride="carousel"
                    data-interval="5000"
                  >
                  <h3 class="tipHeader">Tips<img src="/images/rocket.svg" alt=""></h3>
                    <div class="carousel-inner" role="listbox">
                      <div class="carousel-item active text-center p-4">
                        <p>Put aside regular savings</p>
                      </div>
                      <div class="carousel-item text-center p-4">
                        <p>Don't gamble!</p>
                      </div>
                      <div class="carousel-item text-center p-4">
                        <p>Plan your money before you spend it</p>
                      </div>
                      <div class="carousel-item text-center p-4">
                        <p>Create money pots for different saving goals</p>
                      </div>
                      <div class="carousel-item text-center p-4">
                        <p>Create an emergency fund</p>
                      </div>
                    </div>
                    <a
                      class="carousel-control-prev"
                      href="#carouselContent"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a
                      class="carousel-control-next"
                      href="#carouselContent"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- /* START OF CHART */ -->
        <div class="col-lg-6">
          <div class="reportChart">
            <!-- <div>
              <button ref="chartswap" type="button" class="btn btn-income" @click="showIncome = true">Income</button>
              <button ref="chartswap" type="button" class="btn btn-expense" @click="showIncome = false">Expenses</button>
            </div> -->
            <div class="shadow p-3 mb-5 bg-white rounded" style="margin: 10px">
              <!-- <h4>Chart Overview</h4> -->
              <div style="text-align: -webkit-center">
                <div style="max-width: 500px">
                    <!-- <line-time-chart :chart-data="showIncome ? incomeLineChartData : expensesLineChartData"></line-time-chart> -->
                    <pie-chart :chart-data="pieChartData"></pie-chart>
                </div>
              </div>
            </div>
          </div>
          <!-- /* END OF CHART */ -->

          <div class="row mobileTips">
            <div class="col-12 ">
              <div class="shadow p-3 mb-5 bg-white rounded tabSmall">
                <div class="container">
                  <div
                    id="carouselContent"
                    class="carousel slide"
                    data-ride="carousel"
                    data-interval="5000"
                  >
                  <h3 class="tipHeader">Tips<img src="/images/rocket.svg" alt=""></h3>
                    <div class="carousel-inner" role="listbox">
                      <div class="carousel-item active text-center p-4">
                        <p>Put aside regular savings</p>
                      </div>
                      <div class="carousel-item text-center p-4">
                        <p>Don't gamble!</p>
                      </div>
                      <div class="carousel-item text-center p-4">
                        <p>Plan your money before you spend it</p>
                      </div>
                      <div class="carousel-item text-center p-4">
                        <p>Create money pots for different saving goals</p>
                      </div>
                      <div class="carousel-item text-center p-4">
                        <p>Create an emergency fund</p>
                      </div>
                    </div>
                    <a
                      class="carousel-control-prev"
                      href="#carouselContent"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a
                      class="carousel-control-next"
                      href="#carouselContent"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import lineTime from "../charts/line-time";
import pieChart from "../charts/pieChart";

export default {
  components: {
    "line-time-chart": lineTime,
    "pie-chart": pieChart
  },

  data() {
    return {
      user: { TargetDate: this.$session.get("BudgetTargetDate") },
      transactions: [],
      payments: [],
      display: {
        balance: 0.0,
        income: 0.0,
        expenses: 0.0,
        remaining: 0.0,
      },
      selectedMonth: 10,
      pieChartData: {
        datasets: [{
          data: [9926.10, 4248.21, 5677.89],
          borderWidth: 5,
          backgroundColor: ['#53ed60', '#ed5353', '#5391ed'],
          hoverBackgroundColor: ['#47cc54', '#cc4747', '#477ccc']
        }],
        labels: ['Income', 'Expenses', 'Remaining']
      },
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
      ).toFixed(2);
    },

    //--------------------- CALCULATE INCOME----------------------------- \\

    // Calculates income balances
    calcPaymentIncomeBalances() {
      var balance = 0;

      this.payments
        .filter((p) => {
          return (
            p.PaymentType == "Income" &&
            p.FrequencyType == "Balance" &&
            p.IncInBudget == true
          );
        })
        .forEach((p) => {
          balance += p.Amount;
        });
      return (this.display.balance = this.round(balance));
      // this.incomeLineChartData = data;
    },

    // Calculates Lump sum income
    calcPaymentIncomeLumpSum() {
      var income = 0;

      this.payments
        .filter((p) => {
          return (
            p.PaymentType == "Income" &&
            p.FrequencyType == "Lump sum" &&
            p.IncInBudget == true &&
            moment(p.PaymentStart) > moment()
          );
        })
        .forEach((p) => {
          income += parseFloat(p.Amount);
        });

      return (this.display.income = this.round(income));
    },

    // Caclulate Weekly Income
    calcPaymentIncomeWeekly() {
      var income = 0;

      this.payments
        .filter((p) => {
          return (
            p.PaymentType == "Income" &&
            p.FrequencyType == "Weekly" &&
            p.IncInBudget == true &&
            p.PaymentEnd > moment().format()
          );
        })
        .forEach((p) => {
          var StartDate = moment(p.PaymentStart);
          var EndDate = moment(p.PaymentEnd);
          var TargetDate = moment(this.user.TargetDate);

          if (TargetDate < EndDate) {
            EndDate = TargetDate;
          }

          //  console.log(StartDate)
          //  console.log(EndDate)
          //  console.log(EndDate.diff(StartDate, 'days'))

          income += (p.Amount * EndDate.diff(StartDate, "weeks")) / p.Frequency;
          //income = EndDate.diff(StartDate, 'days')
        });
      return (this.display.income = this.round(income));
    },

    // Calculates Monthly Income
    calcPaymentIncomeMonthly() {
      var income = 0;

      this.payments
        .filter((p) => {
          return (
            p.PaymentType == "Income" &&
            p.FrequencyType == "Monthly" &&
            p.IncInBudget == true &&
            p.PaymentEnd > moment().format()
          );
        })
        .forEach((p) => {
          var StartDate = moment(p.PaymentStart);
          var EndDate = moment(p.PaymentEnd);
          var TargetDate = moment(this.user.TargetDate);

          if (TargetDate < EndDate) {
            EndDate = TargetDate;
          }

          income +=
            (p.Amount * EndDate.diff(StartDate, "months")) / p.Frequency;
        });
      return (this.display.income = this.round(income));
    },

    // Calculates total income
    calcPaymentIncomeTotal() {
      var income = 0;
      var Balances = this.calcPaymentIncomeBalances();
      var Lumpsums = this.calcPaymentIncomeLumpSum();
      var WeeklyIncome = this.calcPaymentIncomeWeekly();
      var MonthlyIncome = this.calcPaymentIncomeMonthly();

      var income =
        parseFloat(Balances) +
        parseFloat(Lumpsums) +
        parseFloat(WeeklyIncome) +
        parseFloat(MonthlyIncome);

      return (this.display.income = this.round(income));
    },

    //--------------------- CALCULATE OUTCOME ----------------------------- \\

    // Calculates outcome debt
    calcPaymentOutcomeDebt() {
      var expenses = 0;

      this.payments
        .filter((p) => {
          return (
            p.PaymentType == "Outcome" &&
            p.FrequencyType == "Debt" &&
            p.IncInBudget == true
          );
        })
        .forEach((p) => {
          expenses += p.Amount;
        });
      return (this.display.expenses = this.round(expenses));
    },

    // Calculates Lump sum outcome
    calcPaymentOutcomeLumpSum() {
      var expenses = 0;

      this.payments
        .filter((p) => {
          return (
            p.PaymentType == "Outcome" &&
            p.FrequencyType == "Lump sum" &&
            p.IncInBudget == true &&
            moment(p.PaymentStart) > moment().format()
          );
        })
        .forEach((p) => {
          expenses += parseFloat(p.Amount);
        });
      return (this.display.expenses = this.round(expenses));
    },

    // Caclulate Weekly Outgoings
    calcPaymentOutcomeWeekly() {
      var expenses = 0;

      this.payments
        .filter((p) => {
          return (
            p.PaymentType == "Outcome" &&
            p.FrequencyType == "Weekly" &&
            p.IncInBudget == true &&
            p.PaymentEnd > moment().format()
          );
        })
        .forEach((p) => {
          var StartDate = moment(p.PaymentStart);
          var EndDate = moment(p.PaymentEnd);
          var TargetDate = moment(this.user.TargetDate);

          if (TargetDate < EndDate) {
            EndDate = TargetDate;
          }

          expenses +=
            (p.Amount * EndDate.diff(StartDate, "weeks")) / p.Frequency;
        });
      return (this.display.expenses = this.round(expenses));
    },

    // Calculates Monthly Outcome
    calcPaymentOutcomeMonthly() {
      var expenses = 0;

      this.payments
        .filter((p) => {
          return (
            p.PaymentType == "Outcome" &&
            p.FrequencyType == "Monthly" &&
            p.IncInBudget == true &&
            p.PaymentEnd > moment().format()
          );
        })
        .forEach((p) => {
          var StartDate = moment(p.PaymentStart);
          var EndDate = moment(p.PaymentEnd);
          var TargetDate = moment(this.user.TargetDate);

          if (TargetDate < EndDate) {
            EndDate = TargetDate;
          }

          expenses +=
            (p.Amount * EndDate.diff(StartDate, "months")) / p.Frequency;
        });
      return (this.display.expenses = this.round(expenses));
    },

    // Calculates total outcome
    calcPaymentOutcomeTotal() {
      var expenses = 0;
      var Balances = this.calcPaymentOutcomeDebt();
      var Lumpsums = this.calcPaymentOutcomeLumpSum();
      var WeeklyOutcome = this.calcPaymentOutcomeWeekly();
      var MonthlyOutcome = this.calcPaymentOutcomeMonthly();

      var expenses =
        parseFloat(Balances) +
        parseFloat(Lumpsums) +
        parseFloat(WeeklyOutcome) +
        parseFloat(MonthlyOutcome);

      return (this.display.expenses = this.round(expenses));
    },

    //--------------------- CALCULATE BUDGET ----------------------------- \\

    // Calculates income - outcome
    calcPaymentRemainingTotal() {
      var remaining = 0;
      var Income = this.calcPaymentIncomeTotal();
      var Outcome = this.calcPaymentOutcomeTotal();

      var remaining = Income - Outcome;

      return (this.display.remaining = this.round(remaining));
    },

    // Calculates Months remaining until target date
    calcPaymentRemainingMonths() {
      var remaining = 0;
      var TargetDate = moment(this.user.TargetDate);
      var CurrentDate = moment().format();

      var remaining = TargetDate.diff(CurrentDate, "months");

      return (this.display.remaining = this.round(remaining));
    },

    // Calculates weeks remaining until target date
    calcPaymentRemainingWeeks() {
      var remaining = 0;
      var TargetDate = moment(this.user.TargetDate);
      var CurrentDate = moment().format();

      var remaining = TargetDate.diff(CurrentDate, "weeks");

      return (this.display.remaining = this.round(remaining));
    },

    // Calculates maximum weekly budget
    calcPaymentWeeklyBudget() {
      var remaining = 0;
      var IncomeMinusOutcome = this.calcPaymentRemainingTotal();
      var WeeksRemaining = this.calcPaymentRemainingWeeks();

      var remaining = IncomeMinusOutcome / WeeksRemaining;

      return (this.display.remaining = this.round(remaining));
    },

    // Calculates maximum monthly budget
    calcPaymentMonthlyBudget() {
      var remaining = 0;
      var IncomeMinusOutcome = this.calcPaymentRemainingTotal();
      var MonthsRemaining = this.calcPaymentRemainingMonths();

      var remaining =
        parseFloat(IncomeMinusOutcome) / parseFloat(MonthsRemaining);

      return (this.display.remaining = this.round(remaining));
    },
  },

  mounted() {
    axios.get("/api/payments").then((res) => {
      // this.transactions = res.data.transactions;
      res.data.payments.forEach((p) => {
        p.Amount = parseFloat(p.Amount).toFixed(2);
        if (p.Frequency == null) {
          p.Frequency = "NaN";
        }
      });

      this.payments = res.data.payments;
      //this.calcBalance();
      //this.calcExpenses();
      //this.calcRemaining();

      // Balances (Income)
      this.calcPaymentIncomeBalances();

      // Income Methods
      // this.calcPaymentIncomeLumpSum();
      //this.calcPaymentIncomeWeekly();
      //this.calcPaymentIncomeMonthly();
      this.calcPaymentIncomeTotal();

      // Outcome Methods
      //this.calcPaymentOutcomeDebt();
      //this.calcPaymentOutcomeLumpSum();
      //this.calcPaymentOutcomeWeekly();
      //this.calcPaymentOutcomeMonthly();
      this.calcPaymentOutcomeTotal();

      // Budget Methods
      this.calcPaymentRemainingTotal();
      //this.calcPaymentRemainingMonths();
      //this.calcPaymentRemainingWeeks();
      //this.calcPaymentMonthlyBudget();
      //this.calcPaymentWeeklyBudget();
    });
  },
};
</script>