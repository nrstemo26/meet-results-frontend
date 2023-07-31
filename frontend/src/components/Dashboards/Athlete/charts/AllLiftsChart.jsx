import { Chart, Scatter } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import {useSelector } from  'react-redux'
import 'chartjs-adapter-date-fns'; 
import ChartjsPluginWatermark from 'chartjs-plugin-watermark'
import { enUS } from 'date-fns/locale'; 
import {getHighestMake, filterLift, createChartTotals} from '../../../../lib/chart_utils'
import watermark from '../../../../assets/avatar_face_navy.png'


function AllLiftsChart(){
    const {data: { chart_data:  chart}  } = useSelector((state)=>state.athlete)
    // let snMakes = getHighestMake(chart.attempt_history_chart["Snatch"].Make)
    // let cjMakes = getHighestMake(chart.attempt_history_chart["Clean & Jerk"].Make)
    // const filteredSnMakes = filterLift(snMakes, cjMakes)
    // const filteredCJMakes = filterLift(cjMakes, filteredSnMakes)

    // const totalData = createChartTotals(filteredSnMakes, filteredCJMakes)
    const totals = chart.totals_chart.map((subArray) => ({
        x: new Date(subArray[1]), 
        y: subArray[3],
        label: subArray[0],
        bw: subArray[2]
    }));

    const historyData = {
        datasets:[
            {
                label:'Total' ,
                backgroundColor:'#069af3',
                data:  totals,
                pointRadius: 4,
                
            },
            {
                label:'C&J Make',
                backgroundColor:'#00ad43',
                data: Object.keys(chart.attempt_history_chart["Clean & Jerk"].Make).map((el)=>{
                    return {
                    x: new Date(chart.attempt_history_chart["Clean & Jerk"].Make[el][0]),
                    y: chart.attempt_history_chart["Clean & Jerk"].Make[el][1],
                    label: chart.attempt_history_chart["Clean & Jerk"].Make[el][2]
                    }
                }),
                pointRadius: 4
            },
            {
                label:'C&J Miss',
                backgroundColor:'#fd411e',
                data:  Object.keys(chart.attempt_history_chart["Clean & Jerk"].Miss).map((el)=>{
                    return {
                      x: new Date(chart.attempt_history_chart["Clean & Jerk"].Miss[el][0]),
                      y: chart.attempt_history_chart["Clean & Jerk"].Miss[el][1],
                      label: chart.attempt_history_chart["Clean & Jerk"].Miss[el][2]
                    }
                })
            },{
                label:'Snatch Make',
                backgroundColor:'#4BFA8E',
                data: Object.keys(chart.attempt_history_chart["Snatch"].Make).map((el)=>{
                    return {
                    x: new Date(chart.attempt_history_chart["Snatch"].Make[el][0]),
                    y: chart.attempt_history_chart["Snatch"].Make[el][1],
                    label: chart.attempt_history_chart["Snatch"].Make[el][2]
                    }
                }),
                pointRadius: 4
            },
            {
                label:'Snatch Miss',
                backgroundColor:'#FD806A',
                data:  Object.keys(chart.attempt_history_chart["Snatch"].Miss).map((el)=>{
                    return {
                      x: new Date(chart.attempt_history_chart["Snatch"].Miss[el][0]),
                      y: chart.attempt_history_chart["Snatch"].Miss[el][1],
                      label: chart.attempt_history_chart["Snatch"].Miss[el][2]
                    }
                }),
                pointRadius: 4
            },

        ]
    }
    
    const options =  {
        responsive : true, 
        maintainAspectRatio : false,
        plugins:{
            title:{
                display: true,
                text: "All Results Over Time",
            },
            legend:{
                position: 'bottom'
            },
            tooltip:{
                callbacks: {
                    title: function(context) {
                        // console.log(context)
                    },
                    beforeLabel: function (context) {
                        return `${context.raw.label}`;
                    },
                    label: function (context) {
                        return `Weight: ${context.parsed.y}kg`;
                    },
                    afterLabel: function (context) {
                        return `BW: ${context.raw.bw}kg`;
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'year'
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
            {/* <Chart  type="scatter" data="Clean & JerkMeetMakes}  options={meetOptions}/> */}
            <Chart  type="scatter" data={historyData}  options={options}/>
        </div>
    )
}

export default AllLiftsChart;
