import { Chart, Scatter } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import {useSelector } from  'react-redux'
import 'chartjs-adapter-date-fns'; 
import { enUS } from 'date-fns/locale'; 

function CjHistChart(){
    const {data: { chart_data } } = useSelector((state)=>state.athlete)
    
    //might need labels??
    // const meetSnMissLabels = [... new Set(Object.keys(meetSnMiss).map((el) => meetSnMiss[el][2]))] 

    const cjHistoryData = {
        datasets:[
            {
                label:'make',
                backgroundColor:'rgba(0, 150, 255)',
                data: Object.keys(chart_data["Clean & Jerk"].Make).map((el)=>{
                    return {
                    x: new Date(chart_data["Clean & Jerk"].Make[el][0]),
                    y: chart_data["Clean & Jerk"].Make[el][1]
                    }
                })
            },
            {
                label:'miss',
                backgroundColor:'rgba(255, 0, 0)',
                data:  Object.keys(chart_data["Clean & Jerk"].Miss).map((el)=>{
                    return {
                      x: new Date(chart_data["Clean & Jerk"].Miss[el][0]),
                      y: chart_data["Clean & Jerk"].Miss[el][1]
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
                text: "Clean & Jerk Attempts",
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
            {/* <Chart  type="scatter" data="Clean & JerkMeetMakes}  options={meetOptions}/> */}
            <Chart  type="scatter" data={cjHistoryData}  options={options}/>
        </div>
    )
}

export default CjHistChart;
