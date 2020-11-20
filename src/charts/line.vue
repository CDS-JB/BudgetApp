<script>
import {Line, mixins} from 'vue-chartjs'

const {reactiveProp} = mixins

export default {
    extends: Line,

    mixins: [reactiveProp],

    props: ['chart-options'],

    mounted(){
        console.log('rendered chart')
        this.renderChart(this.chartData, this.chartOptions)
    }
}
</script>