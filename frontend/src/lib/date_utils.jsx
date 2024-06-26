import { Link } from 'react-router-dom';

function formatDate(inputDateStr) {
    const inputDate = new Date(inputDateStr);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const formattedDate = inputDate.toLocaleDateString('en-US', options);
  
    return formattedDate;
}

export const organizeByOldestDate = (meetHistory) =>{
    return [...Object.keys(meetHistory)].sort((a,b)=>{
        return new Date(meetHistory[a]['Date']) - new Date(meetHistory[b]['Date'])
    })
}

export const organizeByNewestDate = (meetHistory) =>{
    return [...Object.keys(meetHistory)].sort((a,b)=>{
        return new Date(meetHistory[b]['Date']) - new Date(meetHistory[a]['Date'])
    })
}

export const renderWatchlistResults = (arr, meetHistory) => {
    return arr.map((meet,index)=>{
        if(index > 4){
            return 
        }else{
        let meetData = meetHistory[meet]
        const formattedDateStr = formatDate(meetData["Date"]);
        return (
        <div className="flex justify-evenly gap-2 border text-gray-700 border-primary-950 p-1 my-2" key={meet}>    
            <div>
                <div>{formattedDateStr}</div>
                <div className="font-semibold text-primary-950">Best Lifts</div>
                <div className="font-mono text-primary-950 text-xs md:text-base border bg-gradient-to-r from-primary-200 to-primary-50 border-primary-950 p-1 border-1 rounded-lg">{meetData["Best Snatch"]} / {meetData["Best C&J"]} / {meetData["Total"]}</div>
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
        const formattedDateStr = formatDate(meetData["Date"]);
        const year = new Date(meetData["Date"]).getFullYear();
        const meetUrl = `/meet/${encodeURIComponent(meetData["Meet"])} (${year})`;

        return (
        <>    
            <div className="mt-4">
                <h2 className="text-sm sm:text-lg font-bold text-primary-950">
                    <Link to={meetUrl} className="hover:underline">
                        {meetData["Meet"]} -- {formattedDateStr}
                    </Link>
                </h2>
                <div className="flex justify-between p-2">
                    <span className="text-xs sm:text-sm">{meetData["Age Category"]}</span>
                    <span className="text-xs sm:text-sm">Bodyweight: {meetData["Body Weight (Kg)"]}kg</span>
                </div>
                <div className="text-center flex flex-col gap-2">
                    <a className="bg-white border-2 p-1 px-1 border-primary-950 text-gray-700 rounded-lg font-mono text-xl" key={meet}>{meetData["Best Snatch"]} / {meetData["Best C&J"]} / {meetData["Total"]}</a>
                </div>
            </div>
            
        </>
        )
    })
}