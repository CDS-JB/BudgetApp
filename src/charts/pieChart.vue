<script>
import {Pie, mixins} from 'vue-chartjs'

const {reactiveProp} = mixins

export default {
    extends: Pie,

    mixins: [reactiveProp],

    props: ['trigger'],

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

    methods: {
        render(){
            this.renderChart(this.chartData, this.options)
        }
    },

    mounted() {
        this.render()
    },

    watch: {
        trigger: function() {
            this.$data._chart.destroy()
            this.render()
        }
    }
}
</script>