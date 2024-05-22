import { useSelector } from "react-redux"


function BestLifts(){
    const { data:{stats} } = useSelector((state) => state.athlete)

    if(stats){

        return(
            (!stats? <div className="text-gray-700">No stats for athlete.</div>:
        (        
        <div className="bg-primary-50 text-primary-950 p-6 border-2 rounded-lg border-cyan-50 shadow flex flex-col flex-auto overflow-hidden shadow-lg">
          <h1 className="text-lg font-bold">Best Snatch</h1>
          <div className="text-center flex flex-col gap-2">
              <a className="bg-white border-2 p-1 px-1 border-primary-950 rounded-lg text-gray-700 text-xl font-semibold font-mono">{stats["Best Snatch"]}kg</a>
          </div>
          <h1 className="text-lg font-bold">Best Clean and Jerk</h1>
          <div className="text-center flex flex-col gap-2">
              <a className="bg-white border-2 p-1 px-1 border-primary-950 rounded-lg text-gray-700 text-xl font-semibold font-mono">{stats["Best C&J"]}kg</a>
          </div>
          <h1 className="text-lg font-bold">Best Total</h1>
          <div className="text-center flex flex-col gap-2">
              <a className="bg-white border-2 p-1 px-1 border-primary-950 rounded-lg text-gray-700 text-xl font-semibold font-mono">{stats["Best Total"]}kg</a>
          </div>
          <h1 className="text-lg font-bold">Best Sinclair</h1>
          <div className="text-center flex flex-col gap-2">
              <a className="bg-white border-2 p-1 px-1 border-primary-950 rounded-lg text-gray-700 text-xl font-semibold font-mono">{stats["Best Sinclair Total"]}</a>
          </div>
          
        </div>
    ))
    
    
    )
    }
}

export default BestLifts