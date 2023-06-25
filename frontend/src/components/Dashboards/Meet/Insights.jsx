

function Insights (){
    return(
        <div className="bg-secondary-500 p-6 border-2 rounded-lg border-primary-950 flex flex-col flex-auto overflow-hidden shadow-lg">
          <h1 className="text-lg font-bold">Insights</h1>
          <div className='text-center flex flex-col gap-2'>
              <a className="bg-white border-2 p-1 border-secondary rounded-lg">Insight 1: Make %</a>
              <a className="bg-white border-2 p-1 rounded-lg border-secondary">Insight 2: Avg Jump</a>
              <a className="bg-white border-2 p-1 rounded-lg border-secondary">Insight 3: Weightclass Data</a>
              <a className="bg-white border-2 p-1 rounded-lg border-secondary">Insight 4: Male vs Female</a>
              <a className="bg-white border-2 p-1 rounded-lg border-secondary">Insight 5: Random Facts</a>
          </div>
        </div>
    )
}

export default Insights;