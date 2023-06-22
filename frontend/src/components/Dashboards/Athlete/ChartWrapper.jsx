import AllLiftsChart from "./charts/AllLiftsChart";
import CjHistChart from "./charts/CjHistChart";
import SnatchHistChart from "./charts/SnatchHistChart";
import { useState } from "react";



function ChartWrapper(){
    const [selected, setSelected] = useState('all')
    
    return (
        <div >
            <label htmlFor="charts">Choose a chart:</label> 
            <select value={selected} onChange={(e)=> setSelected(e.target.value)}  > 
                <option value="all">All</option> 
                <option value="cj">Clean and Jerk</option> 
                <option value="sn">Snatch </option> 
            </select>

            {selected === 'all' && <AllLiftsChart/>}
            {selected === 'sn' && <SnatchHistChart/>}
            {selected === 'cj' && <CjHistChart/>}
           show charts
        </div>
    )
}

export default ChartWrapper;

