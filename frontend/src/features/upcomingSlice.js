import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseUrl } from '../config'
import axios from 'axios'

const apiUrl = baseUrl + '/v1/'
const initialState = {
  data: null, 
  isLoading: false,
  isError: null,
  message: ''
}


export const getUpcomingMeetTable = createAsyncThunk(
  'upcoming-meet-table',
  async(data, thunkAPI)=>{
    try{
      //thunkapi has a function that 
      //can get any chunk of the state
      //thunkAPI.getState().sliceofstate.propname.propname
      
      const config = {
        params:{
          page: data.page ,
          pageSize: data.pageSize ,
        }
      }
      const response = await axios.get(`${apiUrl}meets/upcoming`, config)
      return response.data;
    }catch(error){
      console.log(error)
    }
  }
)


export const getUpcomingMeet = createAsyncThunk(
  'upcoming-meet',
  async(name, thunkAPI) => {
      try{
          const token = localStorage.getItem('token');
          const response =  await axios.get(`${apiUrl}meets/upcoming/${name}`, { token } )
          return response.data

      }catch(error){
        const message = (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
        error.toString()
  
        return thunkAPI.rejectWithValue(message)
      }
  }
)


export const upcomingSlice = createSlice({ 
  name: "upcoming",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
      builder
        .addCase(getUpcomingMeet.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getUpcomingMeet.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.data = action.payload; // Assuming `state.upcomingMeets` is added to `initialState`
        })
        .addCase(getUpcomingMeet.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.error.message;
        })
    }
})


export default upcomingSlice.reducer