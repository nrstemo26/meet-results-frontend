import { Doughnut } from 'react-chartjs-2'
// import {Chart as ChartJS,} from 'chart.js';
import 'chartjs-adapter-date-fns'; 
import PaywallOverlay from '../../../Widgets/PaywallOverlay';



function MakeRateDonut ({data, average, exercise="Snatch"}) {
    const donutLabel = {
        id: 'donutLabel',
        afterDatasetsDraw: function(chart, args, plugins) {
            const {ctx, data} = chart;
            const centerX = chart.getDatasetMeta(0).data[0].x;
            const centerY = chart.getDatasetMeta(0).data[0].y;

            ctx.save();
            ctx.font = '1.15rem Open sans, Helvetica, Arial, sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`Avg. ${average}`, centerX, centerY);
        }
    }

    const chartData = {
        type: 'doughnut',
        data: {
            labels:['Make %','Miss %'],
            datasets: [
                {
                    data: [parseFloat(data["Opener Make %"]), 100 - parseFloat(data["Opener Make %"])],
                    backgroundColor: ['#172554', '#eff6ff'],
                    label: exercise +' 1'
                },
                {
                    data: [parseFloat(data["Attempt 2 Make %"]), 100 - parseFloat(data["Attempt 2 Make %"])],
                    backgroundColor: ['#172554', '#eff6ff'],
                    label: exercise + ' 2'
                },
                {
                    data: [parseFloat(data["Attempt 3 Make %"]), 100 - parseFloat(data["Attempt 3 Make %"])],
                    backgroundColor: ['#172554', '#eff6ff'],
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
                },
              
            }
        },
    }
    
    return (
        <PaywallOverlay buttonText='Unlock Make Rate Charts with Lift Oracle Pro' blur='blur-lg'>
            <div className="donut-wrapper">
                <Doughnut data={chartData.data} options={chartData.options} plugins={[donutLabel]} />
            </div>
        </PaywallOverlay>
    );
}

export default MakeRateDonut;