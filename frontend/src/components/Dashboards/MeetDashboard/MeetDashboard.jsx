import MeetChart from "./MeetChart";
import TopSinclairs from "./TopSinclairs";
import Insights from './Insights'
import Insight2 from "./Insight2"


function MeetDashboard(){
    return (
        <>
          <div className="grid-dash bg-secondary-500 p-5 rounded-xl">
            <h1 className="text-center text-orange-100 text-3xl font-medium">Dashboard: 2016 Dummy Meet Open</h1>
            <MeetChart ></MeetChart>
          </div>

        
        {/* <div className="my-2 flex flex-wrap gap-2 justify-evenly"> */}
        
        {/* <div className="my-2 flex flex-row flex-wrap gap-2 "> */}
          <TopSinclairs className='grid-sinclair'></TopSinclairs>
          {/* <Insights className='grid-insight flex-auto'></Insights> */}
          <Insights className='grid-insight'></Insights>
          <Insight2 className='grid-insight'></Insight2>
          {/* <Insights className='grid-insight-2'></Insights> */}
        
        </>
    )
}

export default MeetDashboard;