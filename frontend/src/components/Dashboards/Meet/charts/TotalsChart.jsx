import { Chart, Scatter } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import {useSelector } from  'react-redux'
import 'chartjs-adapter-date-fns'; 
import ChartjsPluginWatermark from 'chartjs-plugin-watermark'
import { enUS } from 'date-fns/locale'; 
import {getHighestMake, filterLift, createChartTotals} from '../../../../lib/chart_utils'
import watermark from '../../../../assets/avatar_face_navy.png'


function MeetTotalsChart () {
    const {data: { chart_data: {totals_chart: chart} } } = useSelector((state)=>state.meet)
}

export default MeetTotalsChart;