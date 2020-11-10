<template>
    <div class="page">
        <div class="row">
            <div class="shadow p-3 mb-5 bg-white rounded tabSmall col-md">
                <div class="container">
                    <div class="row">
                        <div class="col-1 iconAlign">
                            <img src="/images/cash-stack.svg" alt="" width="40" height="40" title="Bootstrap">
                        </div>
                        <div class="col-2">
                        </div>
                        <div class="col-8">
                            Balance: <h3>£{{display.balance}}</h3>
                        </div>
                    </div>
                </div>    
            </div>
            <div class="shadow p-3 mb-5 bg-white rounded tabSmall col-md">
                <div class="container">
                    <div class="row">
                        <div class="col-1 iconAlign">
                            <img src="/images/wallet2.svg" alt="" width="40" height="40" title="Bootstrap">
                        </div>
                        <div class="col-2">
                        </div>
                        <div class="col-8">
                            Remaining: <h3>£{{display.remaining}}</h3>
                        </div>
                    </div>
                </div>    
            </div>
            <div class="shadow p-3 mb-5 bg-white rounded tabSmall col-md">
                <div class="container">
                    <div class="row">
                        <div class="col-1 iconAlign">
                            <img src="/images/graph-up.svg" alt="" width="40" height="40" title="Bootstrap">
                        </div>
                        <div class="col-2">
                        </div>
                        <div class="col-8">
                            Income: <h3>£{{display.income}}</h3>
                        </div>
                    </div>
                </div>    
            </div>
            <div class="shadow p-3 mb-5 bg-white rounded tabSmall col-md">
                <div class="container">
                    <div class="row">
                        <div class="col-1 iconAlign">
                            <img src="/images/graph-down.svg" alt="" width="40" height="40" title="Bootstrap">
                        </div>
                        <div class="col-2">
                        </div>
                        <div class="col-8">
                            Expenses: <h3>£{{display.expenses}}</h3>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
        
        
        <div>
            <button ref="chartswap" type="button" class="btn" :class="showIncome ? 'btn-income' : 'btn-income'" @click="showIncome = true">Income</button>
            <button ref="chartswap" type="button" class="btn" :class="showIncome ? 'btn-expense' : 'btn-expense'" @click="showIncome = false">Expenses</button>
        </div>
        <div class="shadow p-3 mb-5 bg-white rounded" style="max-width: 500px">
            <h4>Chart Overview</h4>
            <line-time-chart :chart-data="showIncome ? incomeLineChartData : expensesLineChartData"></line-time-chart>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import lineTime from '../charts/line-time';

export default {
    components: {
        'line-time-chart': lineTime
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
                    backgroundColor: 'rgba(10, 148, 35, 0.1)',
                    borderColor: 'rgba(10, 148, 35, 0.5)',
                    pointBackgroundColor: 'rgb(10, 148, 35)',
                    pointBorderColor: 'rgb(10, 148, 35)',
                    data: []
                }],
            },
            expensesLineChartData: {
                labels: [],
                datasets: [{
                    label: 'Expenses',
                    lineTension: 0,
                    backgroundColor: 'rgba(184, 4, 4, 0.1)',
                    borderColor: 'rgba(184, 4, 4, 0.5)',
                    pointBackgroundColor: 'rgb(184, 4, 4)',
                    pointBorderColor: 'rgb(184, 4, 4)',
                    data: []
                }],
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
            var prevDate = 0
            var totalAmount = 0

            this.transactions.filter(t => {
                return t.Type == "Income"
            }).forEach(t => {
                income += t.Amount

                var date = t.Date
                if(prevDate !== date){
                    if(prevDate !== 0){
                        data.labels.push(moment(prevDate, 'YYYY-MM-DD'))
                        data.datasets[0].data.push({t: moment(prevDate, 'YYYY-MM-DD'), y: totalAmount})
                    }

                    prevDate = date
                    totalAmount = t.Amount
                } else {
                    totalAmount = totalAmount + t.Amount
                }                
            })

            data.labels.push(moment(prevDate, 'YYYY-MM-DD'))
            data.datasets[0].data.push({t: moment(prevDate, 'YYYY-MM-DD'), y: totalAmount})

            this.display.income = this.round(income)
            this.incomeLineChartData = data
        },

        calcExpenses(){
            var expenses = 0
            var data = Object.assign({}, this.expensesLineChartData)
            var prevDate = 0
            var totalAmount = 0

            this.transactions.filter(t => {
                return t.Type == "Expense"
            }).forEach(t => {
                expenses += t.Amount

                var date = t.Date
                if(prevDate !== date){
                    if(prevDate !== 0){
                        data.labels.push(moment(prevDate, 'YYYY-MM-DD'))
                        data.datasets[0].data.push({t: moment(prevDate, 'YYYY-MM-DD'), y: totalAmount})
                    }

                    prevDate = date
                    totalAmount = t.Amount
                } else {
                    totalAmount = totalAmount + t.Amount
                }                
            })

            data.labels.push(moment(prevDate, 'YYYY-MM-DD'))
            data.datasets[0].data.push({t: moment(prevDate, 'YYYY-MM-DD'), y: totalAmount})

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