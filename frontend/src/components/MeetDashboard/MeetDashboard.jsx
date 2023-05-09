import MeetChart from "./MeetChart";
import TopSinclairs from "./TopSinclairs";
import Insights from './Insights'



function MeetDashboard(){
    return (
        <div className="p-3 m-4 overflow-hidden shadow-lg">
          
          <h1 className="text-center text-2xl font-bold">Dashboard: 2016 Dummy Meet Open</h1>
          <MeetChart ></MeetChart>

        
        {/* <div className="my-2 flex flex-wrap gap-2 justify-evenly"> */}
        <div className="bg-red-200 my-2 flex flex-row flex-wrap gap-2 ">
          <TopSinclairs></TopSinclairs>
          <Insights className='flex-auto'></Insights>
          <Insights className='flex-auto'></Insights>
        </div>
        </div>
    )
}

export default MeetDashboard;