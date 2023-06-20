import { Chart, Scatter } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import {useSelector } from  'react-redux'
import 'chartjs-adapter-date-fns'; 
import { enUS } from 'date-fns/locale'; 

function SnatchHistChart(){
    const {data: { chart_data } } = useSelector((state)=>state.athlete)
    
    //might need labels??
    // const meetSnMissLabels = [... new Set(Object.keys(meetSnMiss).map((el) => meetSnMiss[el][2]))] 

    const snatchHistoryData = {
        datasets:[
            {
                label:'make',
                backgroundColor:'rgba(0, 150, 255)',
                data: Object.keys(chart_data["Snatch"].Make).map((el)=>{
                    return {
                    x: new Date(chart_data["Snatch"].Make[el][0]),
                    y: chart_data["Snatch"].Make[el][1]
                    }
                })
            },
            {
                label:'miss',
                backgroundColor:'rgba(255, 0, 0)',
                data:  Object.keys(chart_data["Snatch"].Miss).map((el)=>{
                    return {
                      x: new Date(chart_data["Snatch"].Miss[el][0]),
                      y: chart_data["Snatch"].Miss[el][1]
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
            }
        }
    }
    

    
    
    return (
        <div className="chart-wrapper ">
            {/* <Chart  type="scatter" data={snatchMeetMakes}  options={meetOptions}/> */}
            <Chart  type="scatter" data={snatchHistoryData}  options={dateMakeOptions}/>
        </div>
    )
}

export default SnatchHistChart;


// const snatchMeetMakes = {
//     datasets:[{
//         label: 'scatter dataset',
//         backgroundColor:'rgba(255,99,132)',
//         data:meetSnArr
//     }]
// }
// const meetOptions =  {
//     scales: {
//     x: {
//         type: 'category',
//     }
//     }
// }