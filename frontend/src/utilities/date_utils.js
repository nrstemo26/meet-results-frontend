

export const organizeByDate = (meetHistory) =>{
    return [...Object.keys(meetHistory)].sort((a,b)=>{
        // console.log(meetHistory[a])
        return new Date(meetHistory[a]['Date']) < new Date(meetHistory[b]['Date'])

    })
    console.log(meets)


    // const dateObj =  Object.keys(meetHistory).map((el)=>{
    //     //get date
    //     meetHistory[el]['Date'] = new Date(meetHistory[el]['Date'])
    //     console.log(meetHistory[el]['Date'])
      
    // })
    // const sortedDateObjects =   dateObj.sort((a,b)=> a- b);
    // return sortedDateObjects;
    // return Object.keys(meetHistory).sort((a,b)=>{
    //     console.log(meetHistory[a]['Date'])
    // //    a = meetHistory[a]['Date'].split(' ')[3] 
    //    a = meetHistory[a]['Date'].split(' ')
    //    console.log(a)
    //    a = a[3]

    //    b =  meetHistory[b]['Date'].split(' ')[3]
    //    return a < b;
    // })
}