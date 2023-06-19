import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const baseUrl = 'http://127.0.0.1:5000/api/v1/'


export const getAthlete = createAsyncThunk(
    'athlete/',
    async(urlPath) => {
    // async(id, thunkAPI) => {
        // console.log('in slice', urlPath)
        // urlPath = '/api/v1/athlete/Nathan%20Stemo'
        try{
            const response =  await axios.get(baseUrl + 'athlete/' + urlPath )
            return response.data

        }catch(error){
            console.log(error)
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
    initialState: {data: null, loading: false, error: null},
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(getAthlete.pending, (state) => {
            state.loading = true;
          })
          .addCase(getAthlete.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
          })
          .addCase(getAthlete.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
      },
})


export default athleteSlice.reducer

