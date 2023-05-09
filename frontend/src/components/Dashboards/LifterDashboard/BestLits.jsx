
function BestLifts(){
    return(
        <div className="bg-slate-500 p-6 border-2 rounded-lg border-slate-500 flex flex-col flex-auto overflow-hidden shadow-lg">
          <h1 className="text-lg font-bold">Best Snatch</h1>
          <div className="text-center flex flex-col gap-2">
              <a className="bg-white border-2 p-1 px-1 border-orange-700 rounded-lg">143kg Date Meet Name</a>
          </div>
          <h1 className="text-lg font-bold">Best Clean and Jerk</h1>
          <div className="text-center flex flex-col gap-2">
              <a className="bg-white border-2 p-1 px-1 border-orange-700 rounded-lg">200kg Date Meet Name</a>
          </div>
          <h1 className="text-lg font-bold">Best Total</h1>
          <div className="text-center flex flex-col gap-2">
              <a className="bg-white border-2 p-1 px-1 border-orange-700 rounded-lg">334kg Date Meet Name</a>
          </div>
          
        </div>
    )
}

export default BestLifts