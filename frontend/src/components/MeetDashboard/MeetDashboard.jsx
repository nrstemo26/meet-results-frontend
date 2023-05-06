import MeetChart from "./MeetChart";
import TopSinclairs from "./TopSinclairs";
import Insights from './Insights'



function MeetDashboard(){
    return (
        <div className="p-3 m-4 overflow-hidden shadow-lg">
          
          <h1 className="text-center text-2xl font-bold">Dashboard: 2016 Dummy Meet Open</h1>
          <MeetChart ></MeetChart>

        
        <div className="my-2 flex justify-evenly">
          <TopSinclairs ></TopSinclairs>
          <Insights></Insights>
          <Insights></Insights>
        </div>
        </div>
    )
}

export default MeetDashboard;