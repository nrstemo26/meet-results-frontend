import { organizeByNewestDate, renderTotalResults } from "../../../lib/date_utils"
import { useSelector } from "react-redux"


function AllTotals(){
    const { data:{meet_history} } = useSelector( (state)=> state.athlete )|| 'blah';
   

    return(
        <div className="bg-secondary-500 p-6 rounded-lg flex flex-col flex-auto overflow-hidden shadow-lg">          
            {meet_history? 
            renderTotalResults(organizeByNewestDate(meet_history), meet_history)   
            :
            <h1>no meet history</h1>}
        </div>   
    )
}

export default AllTotals