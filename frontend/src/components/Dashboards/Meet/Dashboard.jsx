import MeetChart from "./MeetChart";
import TopSinclairs from "./TopSinclairs";
import Insights from './Insights'



function MeetDashboard(){
    return (
        <div className="dashboard-container">
          <div className="bg-secondary-500 p-5 rounded-xl">
            <h1 className="text-center text-orange-100 text-3xl font-medium">Dashboard: 2016 Dummy Meet Open</h1>
            <MeetChart ></MeetChart>
          </div>

        <div className="my-2 flex flex-row flex-wrap gap-2 ">
          <TopSinclairs></TopSinclairs>
          <Insights className='flex-auto'></Insights>
          <Insights className='flex-auto'></Insights>
        </div>
        </div>
    )
}

export default MeetDashboard;