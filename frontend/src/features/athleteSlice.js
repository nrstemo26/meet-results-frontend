import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const baseUrl = 'http://127.0.0.1:5000/api/v1/'


const initialState = {
  data: null, 
  isLoading: false,
  isError: null,
  message: ''
}

export const getAthlete = createAsyncThunk(
    'athlete',
    async(name, thunkAPI) => {
    // async(id, thunkAPI) => {
        // console.log('in slice', urlPath)
        // urlPath = '/api/v1/athlete/Nathan%20Stemo'
        try{
            const response =  await axios.get(baseUrl + 'athlete/' + name )
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

export const getAllAthletes = createAsyncThunk(
  'athletes',
  async()=>{
    try{
      const response = await axios.get(baseUrl + 'athletes')
      return response.data;
    }catch(error){
      console.log(error)
    }
  }
)

export const getTrendingAthletes = createAsyncThunk(
  'trending_athletes',
  async()=>{
    try{
      const response = await axios.get(baseUrl + 'trending_athletes')
      return response.data;
    }catch(error){
      console.log(error)
    }
  }
)


export const athleteSlice = createSlice({
    name: "athlete",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(getAthlete.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getAthlete.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
          })
          .addCase(getAthlete.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
          });
      },
})


export default athleteSlice.reducer

