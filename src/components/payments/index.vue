<template>
    <div class="page">
        <div>
            <table class="table shadow p-3 mb-5 bg-white rounded">
                <thead>
                    <tr>
                        <th scope="col" class="fit">Payment Type</th>
                        <th scope="col" class="fit">Source</th>
                        <th scope="col" class="hideMobile">Inc. In Budget</th>
                        <th scope="col">Amount</th>
                        <th scope="col" class="hideMobile">Freq. Type</th>
                        <th scope="col">Payment Start</th>
                        <th scope="col">Payment End</th>
                        <th scope="col" class="hideMobile">Freq.</th>
                        <th scope="col">
                            <i class="fas fa-trash"></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="payment in payments" :key="payment._id">
                        <td class="fit">{{payment.PaymentType}}</td>
                        <td class="fit">{{payment.Source}}</td>
                        <td class="hideMobile">{{payment.IncInBudget}}</td>
                        <td class="amount">{{payment.Amount}}</td>
                        <td class="hideMobile">{{payment.FrequencyType}}</td>
                        <td>{{payment.PaymentStart}}</td>
                        <td>{{payment.PaymentEnd}}</td>
                        <td class="hideMobile">{{payment.Frequency}}</td>
                        <td>
                            <button type="button" class="btn" style="padding: .375rem .75rem" @click="remove(payment._id)">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div></div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    data() {
        return {
            payments: []
        }
    },

    methods: {
        formatPayments(payments){
            payments.forEach((p) => {
                p.PaymentStart = moment(p.PaymentStart).format('YYYY-MM-DD')
                p.PaymentEnd = moment(p.PaymentEnd).format('YYYY-MM-DD')
                p.Amount = parseFloat(p.Amount).toFixed(2)
            })

            this.payments = payments
        },

        remove(id){
            axios.post('/api/removepayment', {paymentId: id})
                .then((res) => {
                    const index = (element) => element._id == id
                    this.payments.splice(this.payments.findIndex(index), 1)
                }).catch((err) => {
                    console.log(err.response.data.error)
                })
        }
    },

    mounted() {
        axios.get('/api/payments')
            .then((res) => {
                this.formatPayments(res.data.payments);
            }).catch((err) => {
                console.log(err.response.data.error)
            })
    }
}
</script>