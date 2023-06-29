import { useSelector } from "react-redux"

function Insights (){
    return(
        <div className="bg-secondary-500 p-6 rounded-lg flex flex-col flex-auto overflow-hidden shadow-lg">
          <h1 className="text-lg text-primary-950 font-bold">Insights</h1>
          <div className='text-left flex flex-col gap-2'>
              <a className="text-gray-700 border-2 p-1 border-secondary rounded-lg">Insight 1: Make %</a>
              <a className="text-gray-700 border-2 p-1 rounded-lg border-secondary">Insight 2: Avg Jump</a>
              <a className="text-gray-700 border-2 p-1 rounded-lg border-secondary">Insight 3: Weightclass Data</a>
              <a className="text-gray-700 border-2 p-1 rounded-lg border-secondary">Insight 4: Male vs Female</a>
              <a className="text-gray-700 border-2 p-1 rounded-lg border-secondary">Insight 5: Random Facts</a>
          </div>
        </div>
    )
}

export default Insights;
