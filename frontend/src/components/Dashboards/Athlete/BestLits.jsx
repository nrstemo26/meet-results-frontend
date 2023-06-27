import { useSelector } from "react-redux"


function BestLifts(){
    const { data:{stats} } = useSelector((state) => state.athlete)

    if(stats){

        return(
            (!stats? <div>no stats</div>:
        (        
        <div className="bg-primary-200 text-primary-950 p-6 border-2 rounded-lg border-primary-200 shadow flex flex-col flex-auto overflow-hidden shadow-lg">
          <h1 className="text-lg font-bold">Best Snatch</h1>
          <div className="text-center flex flex-col gap-2">
              <a className="bg-white border-2 p-1 px-1 border-orange-700 rounded-lg text-xl font-semibold">{stats["Best Snatch"]}kg</a>
          </div>
          <h1 className="text-lg font-bold">Best Clean and Jerk</h1>
          <div className="text-center flex flex-col gap-2">
              <a className="bg-white border-2 p-1 px-1 border-orange-700 rounded-lg text-xl font-semibold">{stats["Best C&J"]}kg</a>
          </div>
          <h1 className="text-lg font-bold">Best Total</h1>
          <div className="text-center flex flex-col gap-2">
              <a className="bg-white border-2 p-1 px-1 border-orange-700 rounded-lg text-xl font-semibold">{stats["Best Total"]}kg</a>
          </div>
          <h1 className="text-lg font-bold">Best Sinclair</h1>
          <div className="text-center flex flex-col gap-2">
              <a className="bg-white border-2 p-1 px-1 border-orange-700 rounded-lg text-xl font-semibold">{stats["Best Sinclair Total"]}kg</a>
          </div>
          
        </div>
    ))
    
    
    )
    }
}

export default BestLifts