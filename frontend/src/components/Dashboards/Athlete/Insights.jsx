import { useSelector } from "react-redux"

function Insights (){
    const { data:{stats} } = useSelector((state) => state.athlete)

    if(stats){

        return(
            (!stats? <div className="text-gray-700">No stats for athlete.</div>:
        (        
        <div className="bg-secondary-500 p-6 rounded-lg flex flex-col flex-auto overflow-hidden shadow-lg">
          <h1 className="text-lg text-primary-950 font-bold">Insights</h1>
          <div className="text-left flex flex-col gap-1">
              <a className="text-primary-950 border-2 border-secondary rounded-lg">Weight Class(es): <span className="font-mono text-gray-700 text-l">{stats["Weight Class(es)"]}kg</span></a>
              <a className="text-primary-950 border-2 border-secondary rounded-lg">Meets Entered: <span className="font-mono text-gray-70 text-l">{stats["Meets Entered"]}</span></a>
              <a className="text-primary-950 border-2 border-secondary rounded-lg">Meets Totaled: <span className="font-mono text-gray-700 text-l">{stats["Meets Totaled"]}</span></a>
              <a className="text-primary-950 border-2 border-secondary rounded-lg">Snatch Make Rate: <span className="font-mono text-gray-700 text-l">{stats["Snatch Make %"]}</span></a>
              <a className="text-primary-950 border-2 border-secondary rounded-lg">C&J Make Rate: <span className="font-mono text-gray-700 text-l">{stats["C&J Make %"]}</span></a>
              <a className="text-primary-950 border-2 border-secondary rounded-lg">Overall Make Rate: <span className="font-mono text-gray-700 text-l">{stats["Overall Make %"]}</span></a>
          </div>
          
        </div>
    ))
    
    
    )
    }
}

export default Insights;