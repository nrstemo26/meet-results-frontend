

export const organizeByOldestDate = (meetHistory) =>{
    return [...Object.keys(meetHistory)].sort((a,b)=>{
        return new Date(meetHistory[a]['Date']) > new Date(meetHistory[b]['Date'])
    })
}
export const organizeByNewestDate = (meetHistory) =>{
    return [...Object.keys(meetHistory)].sort((a,b)=>{
        return new Date(meetHistory[a]['Date']) < new Date(meetHistory[b]['Date'])
    })
}


export const renderSessionResults = (arr, meetHistory) => {
    return arr.map((meet,index)=>{
        if(index > 4){
            return 
        }else{
        let meetData = meetHistory[meet]
        let [day, month, year] = meetData["Date"].split(' ').slice(1,4)
        return (
        <div className="flex justify-evenly gap-2 border-2 text-gray-700 border-primary-950 p-4 my-2" key={meet}>    
            <div>
                <div>{month}/{day}/{year}</div>
                <div className="font-semibold text-primary-950">Best Lifts</div>
                <div className="font-mono text-gray-700 text-sm md:text-base border border-primary-400 p-1 border-2 rounded-lg">{meetData["Best Snatch"]} / {meetData["Best C&J"]} / {meetData["Total"]}</div>
            </div>
            <div>
                <div className="font-semibold text-primary-950 border-b border-primary-400">Attempts</div>
                <div className="text-sm md:text-base">Sn: 
                    <span className="font-mono text-gray-700 text-xs md:text-base"> {meetData["Snatch Lift 1"]} / {meetData["Snatch Lift 2"]} / {meetData["Snatch Lift 3"]}</span>
                </div>
                <div className="text-sm md:text-base">CJ:
                    <span className="font-mono text-gray-700 text-xs md:text-base"> {meetData["C&J Lift 1"]} / {meetData["C&J Lift 2"]} / {meetData["C&J Lift 3"]}</span>
                </div>
                
            </div>
        </div>
        )
        }
    })
}

export const renderTotalResults = (arr, meetHistory) => {
    return arr.map((meet)=>{
        let meetData = meetHistory[meet]
        let [day, month, year] = meetData["Date"].split(' ').slice(1,4)
        return (
        <>    
            <h1 className="text-lg font-bold text-primary-950">{meet} on {month} {day}</h1>
            <div className="text-center flex flex-col gap-2">
                <a className="bg-white border-2 p-1 px-1 border-primary-950 text-gray-700 rounded-lg font-mono text-xl" key={meet}>{meetData["Best Snatch"]} / {meetData["Best C&J"]} / {meetData["Total"]}</a>
            </div>
        </>
        )
    })
}