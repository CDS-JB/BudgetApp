<template>
    <div class="page">
        <div class="settingsForm shadow p-3 mb-5 bg-white rounded">
            <form>
                <div class="form-group">
                    <label>Payment Type</label>
                    <dropdown :custom-options="paymentTypes" :set-selected="form.PaymentType" @select="selectPaymentType"></dropdown>
                    <small v-if="errors.PaymentType" class="form-text text-danger">Invalid Payment Type</small>
                </div>
                <div class="form-group">
                    <label>Source</label>
                    <dropdown :custom-options="sourceTypes" :set-selected="form.Source" @select="selectSource"></dropdown>
                    <small v-if="errors.Source" class="form-text text-danger">Invalid Source</small>
                </div>
                <div class="form-group">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" @click="checkIncInBudget()">
                        <label class="form-check-label">Include In Budget</label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Amount</label>
                    <input type="number" class="form-control" min="0" v-model="form.Amount">
                    <small v-if="errors.Amount" class="form-text text-danger">Invalid Amount</small>
                </div>
                <div class="form-group">
                    <label>Frequency Type</label>
                    <dropdown :custom-options="frequencyTypes" :set-selected="form.FrequencyType" @select="selectFrequencyType"></dropdown>
                    <small v-if="errors.FrequencyType" class="form-text text-danger">Invalid Frequency Type</small>
                </div>
                <hr>
                <div class="form-group">
                    <label><h4>Payment Start</h4></label>
                    <!-- start of time check box -->
                    <div class="form-check">
                        <input id="hasBeginningOfTimeCb" type="checkbox" class="form-check-input" @click="checkPaymentStart()">
                        <label class="form-check-label">No Start Date</label>
                    </div>
                    <date-dropdown @selectDate="selectPaymentStart" @errors="paymentStartError" :disabled="hasBeginningOfTime ? true : false"></date-dropdown>
                </div>
                <div class="form-group">
                    <label><h4>Payment End</h4></label>
                    <!-- end of time check box -->
                    <div class="form-check">
                        <input id="hasForeverCb" type="checkbox" class="form-check-input" @click="checkPaymentEnd()">
                        <label class="form-check-label">No End Date</label>
                    </div>
                    <date-dropdown @selectDate="selectPaymentEnd" @errors="paymentEndError" :disabled="hasForever ? true : false"></date-dropdown>
                </div>
                <hr>
                <div class="form-group">
                    <label>Frequency</label>
                    <input type="number" class="form-control" min="1" :disabled="hasForever ? true : false" v-model="form.Frequency">
                    <small v-if="errors.Frequency" class="form-text text-danger">Invalid Frequency</small>
                </div>
                <button type="button" class="btn btn-primary" @click="submit()">Submit</button>
            </form>
            <error-modal v-if="errorModal.display" :options="errorModal" @close="errorModal.display = false"></error-modal>
            <redirect-modal v-if="redirectModal.display" :options="redirectModal" @close="redirectModal.display = false"></redirect-modal>
        </div>
    </div>
</template>

<script>
import dropdown from '../dropdowns/dropdown'
import dateDropdown from '../dropdowns/dateSelectionDropdown'
import modal from '../modals/basicModal'
import redirectModal from '../modals/redirectModal'
import moment from "moment";

export default {
    beforeCreate: function () {
        if (!this.$session.exists()){
            console.error('Unauthenticated. Redirecting to Welcome')
            this.$router.push('/')
        }
    },

    components: {
        'dropdown': dropdown,
        'date-dropdown': dateDropdown,
        'error-modal': modal,
        'redirect-modal': redirectModal
    },

    data(){
        return {
            paymentTypes: {items: ['Income', 'Outcome']},
            sourceTypes: {items: ['Bank Balance', 'Bank of M&D', 'Credit Card', 'Example', 'Overdraft', 'Part-time work', 'Savings', 'Savings Goal', 'Student Finance', 'Tattoo']},
            frequencyTypes: {items: ['Balance', 'Debt', 'Lump sum', 'Monthly', 'Weekly']},
            errorModal: {
                display: false,
                type: 'Error',
                header: {text: 'Error'},
                body: {text: 'Failed to register due to the following error:', error: 'Debug Error'}
            },
            redirectModal: {
                display: false,
                header: {text: 'Success'},
                body: {text: 'Successfully created payment'},
                route: '/payments/index'
            },
            hasBeginningOfTime: true,
            hasForever: true,
            form: {
                PaymentType: '-',
                Source: '-',
                IncInBudget: false,
                Amount: 0,
                FrequencyType: '-',
                PaymentStart: moment([1970, 0, 1]).format(),
                PaymentEnd: moment([1970, 0, 1]).format(),
                Frequency: null
            },
            errors: {
                PaymentType: false,
                Source: false,
                IncInBudget: false,
                Amount: false,
                FrequencyType: false,
                PaymentStart: false,
                PaymentEnd: false,
                Frequency: false
            }
        }
    },

    methods: {
        checkPaymentStart(){
            this.hasBeginningOfTime = !this.hasBeginningOfTime

            if(this.hasPaymentStart){
                this.form.PaymentStart = moment([1970, 1, 1]).format()
                this.errors.PaymentStart = false;
            }
        },

        checkPaymentEnd(){
            this.hasForever = !this.hasForever

            if(this.hasForever){
                this.form.PaymentEnd = moment([1970, 1, 1]).format()
                this.form.Frequency = null
                this.errors.PaymentEnd = false
                this.errors.Frequency = false
            } else {
                this.form.Frequency = 1
            }
        },

        checkIncInBudget(){
            this.form.IncInBudget = !this.form.IncInBudget
        },

        selectPaymentType(type){
            this.form.PaymentType = type
            this.errors.PaymentType = false
        },

        selectSource(type){
            this.form.Source = type
            this.errors.Source = false
        },

        selectFrequencyType(type){
            this.form.FrequencyType = type
            this.errors.FrequencyType = false
        },

        selectPaymentStart(date){
            this.form.PaymentStart = date
        },

        paymentStartError(hasError){
            this.errors.PaymentStart = hasError
        },

        selectPaymentEnd(date){
            this.form.PaymentEnd = date
        },

        paymentEndError(hasError){
            this.errors.PaymentEnd = hasError
        },

        submit(){
            if(this.validateForm()){
                axios.post("/api/addpayment", this.form)
                    .then((res) => {
                        this.redirectModal.display = true;
                    }).catch((err) => {
                        this.errorModal.body.error = err.response.data.error;
                        this.errorModal.display = true;
                    })
            }
        },
        
        validateForm(){
            if(this.form.PaymentType == '-'){
                this.errors.PaymentType = true;
            }

            if(this.form.Source == '-'){
                this.errors.Source = true;
            }

            if(this.form.FrequencyType == '-'){
                this.errors.FrequencyType = true;
            }

            if(isNaN(parseFloat(this.form.Amount))){
                this.errors.Amount = true;
            }

            if(!this.hasForever && isNaN(parseFloat(this.form.Frequency))){
                this.errors.Frequency = true;
            }

            for(let [key, value] of Object.entries(this.errors)){
                if(this.errors[key]){
                    return false
                }
            }

            return true
        }
    },

    mounted(){
        $('#hasBeginningOfTimeCb').prop('checked', 'true')
        $('#hasForeverCb').prop('checked', 'true')
    }
}
</script>