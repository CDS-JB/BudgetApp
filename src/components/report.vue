<template>
    <div>
        <div>Current Balance: {{display.balance}}</div>
        <div>
            <div>Income: {{display.income}}</div>
            <div>Expenses: {{display.expenses}}</div>
            <div>Remaining: {{display.remaining}}</div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
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
            selectedMonth: 10
        }
    },

    methods: {
        calcBalance(){
            // get EndBalance of most recent transaction
            this.display.balance = this.round(this.transactions[this.transactions.length - 1].EndBalance)
        },
        
        calcIncome(){
            var income = 0

            this.transactions.filter(t => {
                return t.Type == "Income"
            }).forEach(t => {
                income += t.Amount
            })

            this.display.income = this.round(income)
        },

        calcExpenses(){
            var expenses = 0

            this.transactions.filter(t => {
                return t.Type == "Expense"
            }).forEach(t => {
                expenses += t.Amount
            })

            this.display.expenses = this.round(expenses)
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