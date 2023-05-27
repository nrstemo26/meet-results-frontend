

export const organizeByDate = (meetHistory) =>{
    return [...Object.keys(meetHistory)].sort((a,b)=>{
        return new Date(meetHistory[a]['Date']) < new Date(meetHistory[b]['Date'])
    })
}

