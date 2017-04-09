
<script>

    import Chart from 'chart.js'

    export default {
        template: '<canvas width="600" height="400"></canvas>',

        props: {
            labels: {},
            values: {},
            color: {
                default: 'rgba(220,220,220,0.2)'
            }
        },

        mounted() {
            var data = {
                labels: this.labels,

                datasets: [
                    {
                        backgroundColor: "rgba(153,255,51,0.4)",
                        strokeColor: "#Aff445",
                        pointColor: "#Aff445",
                        pointStrokeColor: "#fff",
                        borderWidth: 0,
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: this.values
                    },
                ]
            };


            new Chart( this.$el.getContext('2d'), { type: "line", data: data });
        }
    }

</script>