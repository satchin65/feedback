<script>
    import { Line } from 'vue-chartjs'

    export default Line.extend({
        data: function () {
            return {
                ///running: false,
                dataLabels: '0',
                stats: '0'
            }
        },
        mounted () {
            axios.get('/stats/orders/get_labels')
                .then(function (response) {
                    this.dataLabels = response.data;
                }.bind(this));

            axios.get('/stats/orders/get_stats')
                .then(function (response) {
                    this.stats = response.data;
                    this.renderTheChart();
                }.bind(this));

            // Overwriting base render method with actual data.
        },
        methods: {
            renderTheChart () {
                this.renderChart({
                    labels: this.dataLabels,
                    datasets: this.stats
                }, {
                    responsive: true,
                    labelColor: '#ccc',
                    tooltipFontSize: '20px',
                    title: { display:false },
                    legend: { display:false },
                    tooltips: {
                        enabled: true,
                        xPadding: 10,
                        yPadding: 10,
                        mode: 'index',
                        titleSpacing: 12,
                        bodySpacing: 12,
                    }
                })
            }
        }
    })
</script>