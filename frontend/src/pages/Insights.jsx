import OracleRatings from "../components/Widgets/OracleRatings"
import MeetTable from "../components/Widgets/MeetTable"

function Insights(){
    return(
      <div>
        {/* <MeetTable /> */}
        <h2>Insights and more stuff</h2>
        <div className="md:fixed md:right-0 mt-8 md:m-8 md:w-1/3">
          <OracleRatings />
          
        </div>
        
      </div>
    )
}

export { Insights }