// what does my session slice need to do
// it needs to add lifter to session
// remove lifter from session
// get the array of lifters

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {athletes:[], loading:false, error:null},
    reducers:{
        addToSession: (state)=>{
            state.athletes.push('nathan stemo')
        },
        removeFromSession: ( state )=>{
            const newState = [...state.athletes].slice(0,state.athletes.length-1)
            return {  state,  athletes: newState }
        }
    },
    
})

export const {addToSession, removeFromSession} = sessionSlice.actions
export const selectSession = (state) => state.session.athletes;

export default sessionSlice.reducer


