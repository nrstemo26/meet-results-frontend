import AllLiftsChart from "./charts/AllLiftsChart";
import CjHistChart from "./charts/CjHistChart";
import SnatchHistChart from "./charts/SnatchHistChart";
import WatchlistBtn from "./WatchlistBtn";
import { useState } from "react";
import { useViewport } from "../../../hooks/useViewport";


function ChartWrapper({toggleWatchlist, inWatchlist}){
    const [selected, setSelected] = useState('all')
    const { width } = useViewport();

    
    return (
        <div>
            <div className={`${width > 540? 'flex flex-row-reverse justify-between items-center':'text-center'}`}>
                <WatchlistBtn toggleWatchlist={toggleWatchlist} inWatchlist={inWatchlist}/>
                <div>
                    <label htmlFor="charts" className="text-primary-950 mb-2">Choose a chart:</label> 
                    <select value={selected} onChange={(e)=> setSelected(e.target.value)}  className="bg-primary-50 ml-2 mb-2"> 
                        <option value="all">All</option> 
                        <option value="cj">Clean and Jerk</option> 
                        <option value="sn">Snatch </option> 
                    </select>
                </div>
            </div>

            {selected === 'all' && <AllLiftsChart/>}
            {selected === 'sn' && <SnatchHistChart/>}
            {selected === 'cj' && <CjHistChart/>}
        </div>
    )
}

export default ChartWrapper;

