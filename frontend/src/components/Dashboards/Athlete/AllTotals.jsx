import { organizeByNewestDate, renderTotalResults } from "../../../lib/date_utils"
import { useSelector } from "react-redux"


function AllTotals(){
    const { data:{meet_history} } = useSelector( (state)=> state.athlete );
   

    return(
        <div className="bg-secondary-500 p-6 rounded-lg flex flex-col flex-auto overflow-hidden shadow-lg">
            <div className="text-center font-bold text-xl text-primary-950 mb-1"> Snatch / C&J / Total</div>          
            {meet_history? 
            renderTotalResults(organizeByNewestDate(meet_history), meet_history)   
            :
            <h1>no meet history</h1>}
        </div>   
    )
}

export default AllTotals