import Insights from '../MeetDashboard/Insights'
import LifterChart from "./LifterChart";
import BestLifts from "./BestLits";
import AllTotals from "./AllTotals";



function LifterDashboard(){
    return (
        <div className="p-3 m-4 overflow-hidden shadow-lg">

          <div className='bg-secondary-500 p-5 rounded-xl'>
            <h1 className="text-center text-2xl font-bold">John Bars Lifter Dashboard</h1>
            <LifterChart/>
          </div>

        
        <div className="my-2 flex flex-wrap gap-2 justify-evenly">
          <BestLifts />
          <AllTotals />
          <Insights />
        </div>
        </div>
    )
}

export default LifterDashboard;