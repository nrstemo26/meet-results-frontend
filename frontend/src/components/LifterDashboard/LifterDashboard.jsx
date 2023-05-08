import TopSinclairs from "../MeetDashboard/TopSinclairs";
import Insights from '../MeetDashboard/Insights'
import LifterChart from "./LifterChart";



function LifterDashboard(){
    return (
        <div className="p-3 m-4 overflow-hidden shadow-lg">
          
          <h1 className="text-center text-2xl font-bold">John Bars Lifter Dashboard</h1>
          <LifterChart/>

        
        <div className="my-2 flex justify-evenly">
          <TopSinclairs ></TopSinclairs>
          <Insights></Insights>
          <Insights></Insights>
        </div>
        </div>
    )
}

export default LifterDashboard;