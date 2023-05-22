import { useEffect, useState } from "react"


function AllTotals({ meetHistory  }){

    const organizeByDate = () =>{
        return Object.keys(meetHistory).sort((a,b)=>{
           a = meetHistory[a]['Date'].split(' ')[3] 
           b =  meetHistory[b]['Date'].split(' ')[3]
           return a < b;
        })
    }
    const renderResults = (arr) => {
        return arr.map((meet)=>{
            let meetData = meetHistory[meet]
            let [day, month, year] = meetData["Date"].split(' ').slice(1,4)
            return (
            <>    
                <h1 className="text-lg font-bold">{meet} on {month} {day}</h1>
                <div className="text-center flex flex-col gap-2">
                    <a className="bg-white border-2 p-1 px-1 border-orange-700 rounded-lg" key={meet}>{meetData["Best Snatch"]}/{meetData["Best C&J"]}/{meetData["Total"]}</a>
                </div>
            </>
            )
        })
    }

    return(
        <div className="bg-secondary-500 p-6 rounded-lg flex flex-col flex-auto overflow-hidden shadow-lg">          
            {meetHistory? 
            renderResults(organizeByDate())   
            :
            <h1>no history</h1>}
        </div>
           
    )
    
}

export default AllTotals