// what does my watchlist slice need to do
// it needs to add lifter to watchlist
// remove lifter from watchlist
// get the array of lifters

import { createSlice } from "@reduxjs/toolkit";

export const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: {athletes:[], loading:false, error:null},
    reducers:{
        addToWatchlist: (state, action)=>{
            const athlete = action.payload
            if(state.athletes.includes(athlete)){
                return state
            }else{
                state.athletes.push(athlete)
            }
        },
        removeFromWatchlist: ( state, action )=>{
            const newState = state.athletes.filter((el)=>{
                return el != action.payload
            })
           
            return {  state,  athletes: newState }
        }
    },
    
})

export const {addToWatchlist, removeFromWatchlist} = watchlistSlice.actions

//i dont need this necessarily
//i can just call useSelector(state=>state.watchlist.athletes where needed)
export const selectWatchlist = (state) => state.watchlist.athletes;

export default watchlistSlice.reducer


