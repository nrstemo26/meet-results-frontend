

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
        <div className="flex justify-evenly border-2 text-gray-700 border-primary-950 p-4 my-2" key={meet}>    
            <div>
                <div>{month}/{day}/{year}</div>
                <div>Best Lifts: {meetData["Best Snatch"]} / {meetData["Best C&J"]} / {meetData["Total"]}</div>
            </div>
            <div>
                <div>Sn: {meetData["Snatch Lift 1"]} / {meetData["Snatch Lift 2"]} / {meetData["Snatch Lift 3"]}</div>
                <div>CJ: {meetData["C&J Lift 1"]} / {meetData["C&J Lift 2"]} / {meetData["C&J Lift 3"]}</div>
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