import { useEffect, useState } from "react"
import { organizeByDate, renderTotalResults } from "../../../lib/date_utils"


function AllTotals({ meetHistory }){

    return(
        <div className="bg-secondary-500 p-6 rounded-lg flex flex-col flex-auto overflow-hidden shadow-lg">          
            {meetHistory? 
            renderTotalResults(organizeByDate(meetHistory), meetHistory)   
            :
            <h1>no meet history</h1>}
        </div>
           
    )
    
}

export default AllTotals