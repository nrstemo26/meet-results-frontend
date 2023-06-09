import { Chart, Scatter } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import {useSelector } from  'react-redux'
import 'chartjs-adapter-date-fns'; 
import ChartjsPluginWatermark from 'chartjs-plugin-watermark'
import { enUS } from 'date-fns/locale';
import watermark from '../../../../assets/avatar_face_navy.png' 

function SnatchHistChart(){
    const {data: { chart_data:{attempt_history_chart: chart} } } = useSelector((state)=>state.athlete)
    
    const snatchHistoryData = {
        datasets:[
            {
                label:'make',
                backgroundColor:'rgba(0, 150, 255)',
                data: Object.keys(chart["Snatch"].Make).map((el)=>{
                    return {
                    x: new Date(chart["Snatch"].Make[el][0]),
                    y: chart["Snatch"].Make[el][1]
                    }
                })
            },
            {
                label:'miss',
                backgroundColor:'rgba(255, 0, 0)',
                data:  Object.keys(chart["Snatch"].Miss).map((el)=>{
                    return {
                      x: new Date(chart["Snatch"].Miss[el][0]),
                      y: chart["Snatch"].Miss[el][1]
                    }
                })
            },

        ]
    }
    const dateMakeOptions =  {
        responsive : true, 
        maintainAspectRatio : false,
        plugins:{
            title:{
                display: true,
                text:'Snatch Attempts'
            },
            legend:{
                position: 'bottom'
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month'
                },
                adapters:{
                    date: {
                        locale: enUS
                    }
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
            <Chart  type="scatter" data={snatchHistoryData}  options={dateMakeOptions}/>
        </div>
    )
}

export default SnatchHistChart;

