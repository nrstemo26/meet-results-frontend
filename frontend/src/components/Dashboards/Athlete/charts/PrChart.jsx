import { Chart, Scatter } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import {useSelector } from  'react-redux'
import 'chartjs-adapter-date-fns'; 
import ChartjsPluginWatermark from 'chartjs-plugin-watermark'
import { enUS } from 'date-fns/locale';
import watermark from '../../../../assets/avatar_face_navy.png' 

function PrChart(){
    const data = useSelector((state)=>state.athlete.data.meet_history)
    const meet_history_array = Object.values(data).sort((a, b) => new Date(a.Date) - new Date(b.Date));
    let snatchPr = [];
    let cjPr = [];
    let totalPr = [];
    
    let maxSnatch = 0;
    let maxCj = 0;
    let maxTotal = 0;
    
    meet_history_array.forEach(item => {
      if (item["Best Snatch"] > maxSnatch) {
        maxSnatch = item["Best Snatch"];
        snatchPr.push({ date: item.Date, pr: maxSnatch });
      }
      if (item["Best C&J"] > maxCj) {
        maxCj = item["Best C&J"];
        cjPr.push({ date: item.Date, pr: maxCj });
      }
      if (item["Total"] > maxTotal) {
        maxTotal = item["Total"];
        totalPr.push({ date: item.Date, pr: maxTotal });
      }
    });

    const PrData = {
        datasets:[
            {
                label:'Snatch Pr',
                backgroundColor:'#069af3',
                data: snatchPr.map(item => {
                    return {
                    x: new Date(item.date),
                    y: item.pr,
                    label: item.pr
                    }}),
                pointRadius: 4
            },
            {
                label:'Cj Pr',
                backgroundColor:'#4caf50',
                data:  cjPr.map(item => {
                    return {
                    x: new Date(item.date),
                    y: item.pr,
                    label: item.pr
                    }}),
                pointRadius: 4
            },
            {
                label:'Total Pr',
                backgroundColor:'#ffc107',
                data:  totalPr.map(item => {
                    return {    
                    x: new Date(item.date),
                    y: item.pr,
                    label: item.pr
                }}),
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
                text: "Prs Over Time",
            },
            legend:{
                position: 'bottom'
            },
            tooltip:{
                callbacks: {
                    title: function(context) {
                        // console.log(context)
                    },
                    label: function (context) {
                        return `${context.parsed.y}kg`;
                    },
                }
            }
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
            <Chart  type="scatter" data={PrData}  options={options}/>
        </div>
    )
}

export default PrChart;
