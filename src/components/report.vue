<template>
    <div>
        <div>Current Balance: {{display.balance}}</div>
        <div>
            <div>Income: {{display.income}}</div>
            <div>Expenses: {{display.expenses}}</div>
            <div>Remaining: {{display.remaining}}</div>
        </div>
        <div>
            <button ref="chartswap" type="button" class="btn" :class="showIncome ? 'btn-primary' : 'btn-outline-dark'" @click="showIncome = true">Income</button>
            <button ref="chartswap" type="button" class="btn" :class="showIncome ? 'btn-outline-dark' : 'btn-primary'" @click="showIncome = false">Expenses</button>
        </div>
        <div>
            <line-chart :chart-data="showIncome ? incomeLineChartData : expensesLineChartData" :chart-options="lineChartOptions"></line-chart>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import line from '../charts/line';

export default {
    components: {
        'line-chart': line
    },

    data(){
        return {
            user: {},
            transactions: [],
            display: {
                balance: 0.00,
                income: 0.00,
                expenses: 0.00,
                remaining: 0.00
            },
            selectedMonth: 10,
            incomeLineChartData: {
                labels: [],
                datasets: [{
                    label: 'Income',
                    lineTension: 0,
                    data: []
                }],
            },
            expensesLineChartData: {
                labels: [],
                datasets: [{
                    label: 'Expenses',
                    lineTension: 0,
                    data: []
                }],
            },
            lineChartOptions: {
                // bezierCurve: false,
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {unit: 'day'},
                        distribution: 'linear'
                    }]
                }
            },
            showIncome: true
        }
    },

    methods: {
        calcBalance(){
            // get EndBalance of most recent transaction
            this.display.balance = this.round(this.transactions[this.transactions.length - 1].EndBalance)
        },
        
        calcIncome(){
            var income = 0
            var data = Object.assign({}, this.incomeLineChartData)

            this.transactions.filter(t => {
                return t.Type == "Income"
            }).forEach(t => {
                income += t.Amount

                data.labels.push(moment(t.Date, 'YYYY-MM-DD'))
                data.datasets[0].data.push({t: moment(t.Date, 'YYYY-MM-DD'), y: t.Amount})
            })

            this.display.income = this.round(income)
            this.incomeLineChartData = data
        },

        calcExpenses(){
            var expenses = 0
            var data = Object.assign({}, this.expensesLineChartData)
            var oldDate = 0;

            this.transactions.filter(t => {
                return t.Type == "Expense"
            }).forEach(t => {
                expenses += t.Amount

                if (oldDate == moment(t.Date, 'YYYY-MM-DD')){
                    data.datasets[0].data.push({t: moment(t.Date, 'YYYY-MM-DD'), y: t.Amount})
                } else {
                    oldDate = moment(t.Date, 'YYYY-MM-DD')
                    data.labels.push(moment(t.Date, 'YYYY-MM-DD'))
                    data.datasets[0].data.push({t: moment(t.Date, 'YYYY-MM-DD'), y: t.Amount})
                }
                
            })

            this.display.expenses = this.round(expenses)
            this.expensesLineChartData = data
        },

        calcRemaining(){
            // get EndBalance of most recent transaction for currently displayed month            
            var filteredTransactions = this.transactions.filter(t => {return this.selectedMonth == moment(t.Date, 'YYYY-MM-DD').format('MM')})

            this.display.remaining = this.round(filteredTransactions[filteredTransactions.length - 1].EndBalance)
        },

        round(value, dec = 2){
            return parseFloat(Number(Math.round(value + 'e' + dec) + 'e-' + dec).toFixed(dec))
        },
    },

    mounted(){
        axios.get('/api/report').then(res => {
            this.user = res.data.user
            this.transactions = res.data.transactions

            this.calcBalance()
            this.calcIncome()
            this.calcExpenses()
            this.calcRemaining()
        })
    }
}
</script>