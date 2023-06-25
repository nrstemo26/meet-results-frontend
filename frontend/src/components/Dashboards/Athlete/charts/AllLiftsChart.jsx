import { Chart, Scatter } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import {useSelector } from  'react-redux'
import 'chartjs-adapter-date-fns'; 
import { enUS } from 'date-fns/locale'; 
import {getHighestMake, filterLift, createChartTotals} from '../../../../lib/chart_utils'

function AllLiftsChart(){
    const {data: { chart_data: {attempt_history_chart: chart} } } = useSelector((state)=>state.athlete)
    let snMakes = getHighestMake(chart["Snatch"].Make)
    let cjMakes = getHighestMake(chart["Clean & Jerk"].Make)
   
    const filteredSnMakes = filterLift(snMakes, cjMakes)
    const filteredCJMakes = filterLift(cjMakes, filteredSnMakes)

    const totalData = createChartTotals(filteredSnMakes, filteredCJMakes)

    const historyData = {
        datasets:[
            {
                label:'total' ,
                backgroundColor:'rgba(255, 0, 0)',
                data: totalData
                
            },
            {
                label:'cj make',
                backgroundColor:'rgba(0, 150, 255)',
                data: Object.keys(chart["Clean & Jerk"].Make).map((el)=>{
                    return {
                    x: new Date(chart["Clean & Jerk"].Make[el][0]),
                    y: chart["Clean & Jerk"].Make[el][1]
                    }
                })
            },
            {
                label:'cj miss',
                backgroundColor:'rgba(255, 0, 0)',
                data:  Object.keys(chart["Clean & Jerk"].Miss).map((el)=>{
                    return {
                      x: new Date(chart["Clean & Jerk"].Miss[el][0]),
                      y: chart["Clean & Jerk"].Miss[el][1]
                    }
                })
            },{
                label:'sn make',
                backgroundColor:'rgb(0, 255, 0)',
                data: Object.keys(chart["Snatch"].Make).map((el)=>{
                    return {
                    x: new Date(chart["Snatch"].Make[el][0]),
                    y: chart["Snatch"].Make[el][1]
                    }
                })
            },
            {
                label:'sn miss',
                backgroundColor:'rgba(255, 192, 203)',
                data:  Object.keys(chart["Snatch"].Miss).map((el)=>{
                    return {
                      x: new Date(chart["Snatch"].Miss[el][0]),
                      y: chart["Snatch"].Miss[el][1]
                    }
                })
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
            }
        }
    }    
    
    return (
        <div className="chart-wrapper ">
            
            {/* <Chart  type="scatter" data="Clean & JerkMeetMakes}  options={meetOptions}/> */}
            <Chart  type="scatter" data={historyData}  options={options}/>
        </div>
    )
}

export default AllLiftsChart;
