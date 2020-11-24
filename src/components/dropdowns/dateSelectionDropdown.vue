<template>
    <div class="form-row">
        <div class="form-group col-md-4">
            <label>Day</label>
            <day-dropdown :custom-options="options.day" @select="(day) => this.select('day', day)"></day-dropdown>
        </div>
        <div class="form-group col-md-4">
            <label>Month</label>
            <month-dropdown :custom-options="options.month" @select="(month) => this.select('month', month)"></month-dropdown>
        </div>
        <div class="form-group col-md-4">
            <label>Year</label>
            <year-dropdown :custom-options="options.year" @select="(year) => this.select('year', year)"></year-dropdown>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import dropdown from './dropdown';
import Dropdown from './dropdown.vue';

export default {
    props: ['yearOptions'],

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
                }
            },
        }
    },

    methods: {
        select(key, selection) {
            this.selected[key] = selection

            if(this.selected.day !== '' && this.selected.month !== '' && this.selected.year !== ''){
                if(key !== 'day'){
                    this.updateDayOptions()
                }

                this.validateDate()
            }
        },
        
        updateDayOptions() {
            // Update possible day options to currently selected month/year, if day isn't valid then set to '-'
        },

        validateDate() {
            // Validate if the selected date is valid, else set day to '-'
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
        
    }
}
</script>