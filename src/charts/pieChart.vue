<script>
import {Pie, mixins} from 'vue-chartjs'

const {reactiveProp} = mixins

export default {
    extends: Pie,

    mixins: [reactiveProp],

    data() {
        return {
            options: {
                legend: {
                    labels: {
                        fontSize: 14
                    }
                }
            }
        }
    },

    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}
</script>