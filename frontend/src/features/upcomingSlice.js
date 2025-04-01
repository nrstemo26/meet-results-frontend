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
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}meets/upcoming/${name}`, { token });
      
      // Handle string response or raw response
      if (typeof response.data === 'string') {
        try {
          // Replace all NaN values with null or a string representation before parsing
          const fixedJsonString = response.data
            .replace(/: NaN,/g, ': null,')  // Replace NaN values
            .replace(/: NaN}/g, ': null}')  // Handle NaN at the end of objects
            .replace(/: <NA>/g, ': null');  // Handle <NA> values (sometimes used for missing data)
          
          const parsedData = JSON.parse(fixedJsonString);
          console.log('Successfully parsed string response data');
          return parsedData;
        } catch (parseError) {
          console.error('Error parsing response data:', parseError);
          console.error('Response snippet:', response.data.substring(0, 200) + '...');
          return thunkAPI.rejectWithValue('Failed to parse response data');
        }
      } else {
        // Response is already an object
        return response.data;
      }
    } catch(error) {
      const message = (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
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
        state.isError = false;
      })
      .addCase(getUpcomingMeet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(getUpcomingMeet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || action.error.message;
      })
  }
})

export default upcomingSlice.reducer