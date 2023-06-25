

export const getHighestMake = (makesArray)=>{
    return Object.keys(makesArray).map(el=> makesArray[el]).reduce((acc, curr) => {
        const existingItem = acc.find(item => item[2] === curr[2]);
        const existingItemIndex = acc.findIndex(item => item[2] === curr[2]);
        if (existingItem) {
          if (existingItem[1] < curr[1]) {
            acc[existingItemIndex] = curr;
          }
        } else {
          acc.push(curr);
        }
         return acc;
      }, []);
}

export const filterLift = (arr1, arr2)=>{
   return arr1.filter(item1 => arr2.some(item2 => item2[2] === item1[2] ));
}

export const createChartTotals = (snArr, cjArr) =>{
    return cjArr.map(el => {
        const inSnatches = snArr.find(item => item[2] === el[2])
        if(inSnatches)  return { x: new Date(el[0]), y: el[1] + inSnatches[1] }
    })
}
