import { useState } from 'react'
import { Chart, Scatter } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'


function AthleteChart(){
    const meetSnData = [
        {
            x:'Meet 1',
            y:110,
      },
        {
            x:'Meet 1',
            y:115,
      },
        {
            x:'Meet 1',
            y:120,
      },
        {
            x:'Meet 2',
            y:113,
      },
        {
            x:'Meet 2',
            y:118,
      },
        {
            x:'Meet 2',
            y:123,
      },
        {
            x:'Meet 3',
            y:115,
      },
        {
            x:'Meet 3',
            y:120,
      },
        {
            x:'Meet 3',
            y:125,
      },
        {
            x:'Meet 4',
            y:125,
      },
        {
            x:'Meet 4',
            y:130,
      },
        {
            x:'Meet 4',
            y:133,
      },]
    const meetCJData = [
        {
            x:'Meet 1',
            y:135,
      },
        {
            x:'Meet 1',
            y:140,
      },
        {
            x:'Meet 1',
            y:140,
      },
        {
            x:'Meet 2',
            y:133,
      },
        {
            x:'Meet 2',
            y:138,
      },
        {
            x:'Meet 2',
            y:143,
      },
        {
            x:'Meet 3',
            y:140,
      },
        {
            x:'Meet 3',
            y:145,
      },
        {
            x:'Meet 3',
            y:150,
      },
        {
            x:'Meet 4',
            y:144,
      },
        {
            x:'Meet 4',
            y:148,
      },
        {
            x:'Meet 4',
            y:152,
    },]
    const bestCJ = [140,143,150,148];
    const bestSn = [120,118,125,125];
    const totals = [260,261,275,273];
      
    const labels = ['Meet 1', 'Meet 2', 'Meet 3','Meet 4'];
      

    const [meetData] = useState({
            labels,
            datasets: [
            {
                type: 'line',
                label: 'Best Snatch',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                pointRadius:2,
                hoverRadius:4,
                fill: false,
                data: bestSn,
            },
            {
                type: 'line',
                label: 'Total',
                borderColor: 'green',
                borderWidth: 2,
                pointRadius:2,
                hoverRadius:4,
                fill: false,
                data: totals,
            },
            {
                type: 'line',
                label: 'Best CJ',
                borderColor: '#cc5500',
                borderWidth: 2,
                pointRadius:2,
                hoverRadius:4,
                fill: false,
                data: bestCJ,
            },
            {
                type: 'scatter' ,
                label: 'Snatch attempts',
                backgroundColor: 'rgb(75, 192, 192)',
                // data: labels.map(() => (Math.random() * 200)),
                data: meetSnData,
                pointRadius:2,
                hoverRadius: 4,
                borderColor: 'black',
                borderWidth: 1,
                pointStyle:'triangle',
            },
            {
                type: 'scatter' ,
                label: 'CJ attempts',
                backgroundColor: '#cc5500',
                data: meetCJData,
                pointRadius:2,
                hoverRadius: 4,
                borderColor: 'black',
                borderWidth: 1,
            },
          ],
    }) 

    const options={
        responsive : true, 
        maintainAspectRatio : false,
    }
    
    return (
        <div className="chart-wrapper ">
            <Chart  type="scatter" data={meetData} options={options} />
        </div>
    )
}

export default AthleteChart;