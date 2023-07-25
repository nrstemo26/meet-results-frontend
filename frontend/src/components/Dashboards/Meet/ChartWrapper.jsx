import TotalsChart from "./charts/TotalsChart";
// import CjHistChart from "./charts/CjHistChart";
// import SnatchHistChart from "./charts/SnatchHistChart";
import { useState } from "react";



function ChartWrapper(){
    const [selected, setSelected] = useState('all')
    
    return (
        <div >
            <label htmlFor="charts" className="text-primary-950 mb-2">Choose a chart:</label> 
            <select value={selected} onChange={(e)=> setSelected(e.target.value)}  className="bg-primary-50 ml-2 mb-2"> 
                <option value="all">All Totals</option> 
                <option value="sn_m">Snatch, Men's</option>
                <option value="sn_f">Snatch, Women's</option> 
                <option value="cj_m">Clean and Jerk Men's</option>
                <option value="cj_f">Clean and Jerk Women's</option>  
            </select>

            {selected === 'all' && <TotalsChart/>}
            {/* {selected === 'sn' && <SnatchHistChart/>}
            {selected === 'cj' && <CjHistChart/>} */}
        </div>
    )
}

export default ChartWrapper;