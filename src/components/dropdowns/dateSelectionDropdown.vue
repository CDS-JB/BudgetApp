<template>
    <div>
        <div class="form-row">
            <div class="form-group col-md-4">
                <label>Day</label>
                <day-dropdown :custom-options="options.day" :set-selected="selected.day" @select="(day) => this.select('day', day)" :disabled="options.disabled"></day-dropdown>
            </div>
            <div class="form-group col-md-4">
                <label>Month</label>
                <month-dropdown :custom-options="options.month" :set-selected="selected.month"  @select="(month) => this.select('month', month)" :disabled="options.disabled"></month-dropdown>
            </div>
            <div class="form-group col-md-4">
                <label>Year</label>
                <year-dropdown :custom-options="options.year" :set-selected="selected.year" @select="(year) => this.select('year', year)" :disabled="options.disabled"></year-dropdown>
            </div>
        </div>
        <small v-if="error.display" class="form-text text-danger">{{error.message}}</small>
    </div>    
</template>

<script>
import moment from "moment";
import dropdown from './dropdown';

export default {
    props: ['yearOptions', 'disabled'],

    components: {
        'day-dropdown': dropdown,
        'month-dropdown': dropdown,
        'year-dropdown': dropdown
    },

    data() {
        return {
            selected: {
                day: '-',
                month: '-',
                year: '-'
            },
            options: {
                day: {items: ['-']},
                month: {items: ['-', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']},
                year: {
                    items: ['-'],
                    asc: true,
                    minYear: 1900,
                    maxYear: 3000
                },
                disabled: false
            },
            error: {
                display: false,
                message: 'Invalid Date'
            }
        }
    },

    methods: {
        select(key, selection) {
            this.error.display = false
            this.selected[key] = selection

            if(this.selected.day !== '-' && this.selected.month !== '-' && this.selected.year !== '-'){
                this.validateDate()
            }
        },

        validateDate() {
            var date = moment([this.selected.year, moment().month(this.selected.month).month(), this.selected.day])
            
            if(date.isValid()){
                this.$emit('selectDate', date.format())
                this.$emit('errors', false)
            } else {
                this.$emit('errors', true)
                this.error.display = true
            }
        },

        setSelection(){
            if(this.options.disabled){
                for(let [key, value] of Object.entries(this.selected)){
                    this.select(key, '-');
                }
            }
        }
    },

    mounted() {
        for(var d = 1; d <= 31; d++){
            this.options.day.items.push(d)
        }

        for(let key in this.yearOptions){
            if(this.yearOptions[key] !== this.options.year[key]){
                this.options.year[key] = this.yearOptions[key]
            }
        }

        if(this.options.year.asc){
            for(var y = this.options.year.minYear; y <= this.options.year.maxYear; y++){
                this.options.year.items.push(y)
            }
        } else {
            for(var y = this.options.year.maxYear; y >= this.options.year.minYear; y--){
                this.options.year.items.push(y)
            }
        }
        
        if(this.disabled != null){
            this.options.disabled = this.disabled
        }
    },

    watch: {
        'disabled': function () {
            this.options.disabled = this.disabled
            this.setSelection()
        },
    }
}
</script>