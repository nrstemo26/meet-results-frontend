import React, { useEffect, useRef } from 'react';
import { Chart, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, plugins } from 'chart.js/auto'
// import {useSelector } from  'react-redux'
import 'chartjs-adapter-date-fns'; 
import { enUS } from 'date-fns/locale'; 
import { id } from 'chartjs-plugin-watermark';
// import {getHighestMake, filterLift, createChartTotals} from '../../../../lib/chart_utils'


function SnMakeRateDonut ({data, exercise="Snatch"}) {

    console.log(exercise)
    let chartData = {
        type: 'doughnut',
        data: {
            labels:['Make %','Miss %'],
            datasets: [
                {
                    data: [parseFloat(data["Opener Make %"]), 100 - parseFloat(data["Opener Make %"])],
                    // data: `${parseFloat(data['Opener Make %'])}%` ,
                    backgroundColor: ['#2563eb', '#cde8fe'],
                    label: exercise +' 1'
                },
                {
                    data: [parseFloat(data["Attempt 2 Make %"]), 100 - parseFloat(data["Attempt 2 Make %"])],
                    // data: `${parseFloat(data['Opener Make %'])}%` ,
                    backgroundColor: ['#2563eb', '#cde8fe'],
                    label: exercise + ' 2'
                },
                {
                    data: [parseFloat(data["Attempt 3 Make %"]), 100 - parseFloat(data["Attempt 3 Make %"])],
                    // data: `${parseFloat(data['Opener Make %'])}%` ,
                    backgroundColor: ['#2563eb', '#cde8fe'],
                    label: exercise + ' 3'
                },
            ],
        },
        options: {
            plugins:{
                title:{
                    display:true,
                    text: exercise + ' Make Rate by Attempt',
                    font:{
                        size:20
                    }
                
                }
            }
        },
    }
    
    return (
        <div className="chart-wrapper">
            <Doughnut data={chartData.data} options={chartData.options} />
        </div>
    );
};

export default SnMakeRateDonut;