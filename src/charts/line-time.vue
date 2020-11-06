<script>
import {Line, mixins} from 'vue-chartjs'

const {reactiveProp} = mixins

export default {
    extends: Line,

    mixins: [reactiveProp],

    data(){
        return {
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {unit: 'day'},
                        distribution: 'linear'
                    }]
                }
            }
        }
    },

    mounted(){
        console.log('rendered chart')
        this.renderChart(this.chartData, this.options)
    }
}
</script>