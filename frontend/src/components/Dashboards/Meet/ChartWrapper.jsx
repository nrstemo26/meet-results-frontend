import TotalsChart from "./charts/TotalsChart";
// import CjHistChart from "./charts/CjHistChart";
import SnatchChartFemale from "./charts/SnatchChartFemale";
import SnatchChartMale from "./charts/SnatchChartMale";
import CJChartFemale from "./charts/CJChartFemale";
import CJChartMale from "./charts/CJChartMale";
import { useState } from "react";



function ChartWrapper(){
    const [selected, setSelected] = useState('all')
    
    return (
        <div >
            <label htmlFor="charts" className="text-sm text-primary-950 mb-2">Choose a chart:</label> 
            <select value={selected} onChange={(e)=> setSelected(e.target.value)}  className="text-sm bg-primary-50 ml-2 mb-2"> 
                <option value="all">All Totals</option> 
                <option value="sn_m">Men's Snatch</option>
                <option value="sn_f">Women's Snatch</option> 
                <option value="cj_m">Men's Clean and Jerk</option>
                <option value="cj_f">Women's Clean and Jerk</option>  
            </select>

            {selected === 'all' && <TotalsChart/>}
            {selected === 'sn_f' && <SnatchChartFemale/>}
            {selected === 'sn_m' && <SnatchChartMale/>}
            {selected === 'cj_f' && <CJChartFemale/>}
            {selected === 'cj_m' && <CJChartMale/>}
        </div>
    )
}

export default ChartWrapper;