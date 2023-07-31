import { Chart } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { useSelector } from  'react-redux'
import ChartjsPluginWatermark from 'chartjs-plugin-watermark'
import watermark from '../../../../assets/avatar_face_navy.png'


function SnatchChartFemale () {
    const {data: chart } = useSelector((state)=>state.meet)

    const makes = chart.womens.chart_data.attempt_history_chart["Snatch"].Make.map((subArray) => ({
        x: subArray[1], 
        y: subArray[2],
        label: subArray[0] 
    }));

    const misses = chart.womens.chart_data.attempt_history_chart["Snatch"].Miss.map((subArray) => ({
        x: subArray[1], 
        y: subArray[2], 
        label: subArray[0] 
    }));

    const totalsData = {
        datasets:[
            {
                label: "Make",
                backgroundColor:'#069af3',
                data: makes,
                pointRadius: 4
            },
            {
                label: "Miss",
                backgroundColor:'#FD806A',
                data: misses,
                pointRadius: 4
            }
        ]
    }

    const options =  {
        responsive : true, 
        maintainAspectRatio : false,
        plugins:{
            title:{
                display: true,
                text: "Female Snatch Attempts",
            },
            legend:{
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    title: function(context) {
                        // console.log(context)
                    },
                    beforeLabel: function (context) {
                        return `${context.raw.label}`;
                    },
                    label: function (context) {
                        return `Snatch: ${context.parsed.y}kg`;
                    },
                    afterLabel: function (context) {
                        return `BW: ${context.parsed.x}kg`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Bodyweight (kg)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Weight (Kg)"
                }
            }
        },
        watermark: {

            image: watermark,
            x: "0%",
            y: "0%",
            width: 275,
            height: 206.25,
            opacity: 0.1,
            alignX: "middle",
            alignY: "middle",
            alignToChartArea: true,
            position: "back"
  
        }
    }

    ChartJS.register(ChartjsPluginWatermark);

    return (
        <div className="chart-wrapper">
            <Chart  type="scatter" data={totalsData}  options={options}/>
        </div>
    )
}

export default SnatchChartFemale;