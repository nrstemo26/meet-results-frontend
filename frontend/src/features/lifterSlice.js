import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const baseUrl = 'http://192.168.1.139:5000'


export const getAthlete = createAsyncThunk(
    '/api/v1/athlete/',
    async(urlPath) => {
    // async(id, thunkAPI) => {
        // console.log('in slice', urlPath)
        // urlPath = '/api/v1/athlete/Nathan%20Stemo'
        try{
            const response =  await axios.get(baseUrl+ urlPath )
            return response.data

        }catch(error){
            console.log(error)
        }
    }
)

export const getAllAthletes = createAsyncThunk(
  'api/v1/athletes',
  async()=>{
    let urlPath = '/api/v1/athletes'
    try{
      const response = await axios.get(baseUrl + urlPath)
      return response.data;
    }catch(error){
      console.log(error)
    }
  }
)

export const getTrendingAthletes = createAsyncThunk(
  'api/v1/trending_athletes',
  async()=>{
    let urlPath = '/api/v1/trending_athletes'
    try{
      const response = await axios.get(baseUrl + urlPath)
      return response.data;
    }catch(error){
      console.log(error)
    }
  }
)


export const lifterSlice = createSlice({
    name: "lifter",
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


export default lifterSlice.reducer

