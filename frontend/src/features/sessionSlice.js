// what does my session slice need to do
// it needs to add lifter to session
// remove lifter from session
// get the array of lifters

import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {athletes:[], loading:false, error:null},
    reducers:{
        addToSession: (state, action)=>{
            state.athletes.push(action.payload)
        },
        removeFromSession: ( state, action )=>{
            const newState = state.athletes.filter((el)=>{
                return el != action.payload
            })
           
            return {  state,  athletes: newState }
        }
    },
    
})

export const {addToSession, removeFromSession} = sessionSlice.actions

//i dont need this necessarily
//i can just call useSelector(state=>state.session.athletes where needed)
export const selectSession = (state) => state.session.athletes;

export default sessionSlice.reducer


