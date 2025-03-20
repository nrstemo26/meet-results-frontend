import { Doughnut } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'; 
import PaywallOverlay from '../../../Widgets/PaywallOverlay';


function MakeRateDonut ({data, exercise="Snatch"}) {
    let chartData = {
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
                tooltip: {
                    callbacks: {
                        title: function(tooltipItems) {
                            let datasetIndex = tooltipItems[0].datasetIndex;
                            return chartData.data.datasets[datasetIndex].label;
                        },
                        label: function(tooltipItem) {
                            let label = chartData.data.labels[tooltipItem.dataIndex] || '';
                            let value = tooltipItem.raw || 0;
                            label = label.replace(' %', '');
                            return label + ': ' + value + '%';
                        }
                    }
                }
            }
        },
    }
    
    return (
        <PaywallOverlay buttonText='Unlock Make Rate Charts with Lift Oracle Pro' blur='blur-lg'>
            <div className="donut-wrapper">
                <Doughnut data={chartData.data} options={chartData.options} />
            </div>
        </PaywallOverlay>
    );
};

export default MakeRateDonut;