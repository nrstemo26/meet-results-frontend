import OracleRatings from "../components/Widgets/OracleRatings"

function Insights(){
    return(
      <div>
        <h2>Insights and more stuff</h2>
        <div className="md:fixed md:right-0 mt-8 md:m-8 md:w-1/4">
          <OracleRatings />
        </div>
        
      </div>
    )
}

export { Insights }