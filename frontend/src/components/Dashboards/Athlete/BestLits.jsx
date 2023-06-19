import { useSelector } from "react-redux"


function BestLifts(){
    const { data:{stats} } = useSelector((state) => state.athlete)
    console.log(stats)

    if(stats){

        return(
            (!stats? <div>no stats</div>:
        (        
            <div className="bg-slate-500 p-6 border-2 rounded-lg border-slate-500 flex flex-col flex-auto overflow-hidden shadow-lg">
          <h1 className="text-lg font-bold">Best Snatch</h1>
          <div className="text-center flex flex-col gap-2">
              <a className="bg-white border-2 p-1 px-1 border-orange-700 rounded-lg">Best Snatch: {stats["Best Snatch"]}kg</a>
          </div>
          <h1 className="text-lg font-bold">Best Clean and Jerk</h1>
          <div className="text-center flex flex-col gap-2">
              <a className="bg-white border-2 p-1 px-1 border-orange-700 rounded-lg">Best Clean and Jerk: {stats["Best C&J"]}kg</a>
          </div>
          <h1 className="text-lg font-bold">Best Total</h1>
          <div className="text-center flex flex-col gap-2">
              <a className="bg-white border-2 p-1 px-1 border-orange-700 rounded-lg">Best Total: {stats["Best Total"]}kg</a>
          </div>
          <h1 className="text-lg font-bold">Best Sinclair</h1>
          <div className="text-center flex flex-col gap-2">
              <a className="bg-white border-2 p-1 px-1 border-orange-700 rounded-lg">Best Sinclair: {stats["Best Sinclair Total"]}</a>
          </div>
          
        </div>
    ))
    
    
    
    )
    }
}

export default BestLifts