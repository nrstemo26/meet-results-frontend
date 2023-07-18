import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const baseUrl = 'http://192.168.86.27:5000/api/v1/'
// const baseUrl = 'http://192.168.1.139:5000/api/v1/'
// const baseUrl = 'http://98.144.49.136:5000/api/v1/'


const initialState = {
  data: null, 
  isLoading: false,
  isError: null,
  message: ''
}

export const getAthlete = createAsyncThunk(
    'athlete',
    async(name, thunkAPI) => {
        try{
            const token = localStorage.getItem('token');
            const response =  await axios.post(baseUrl + 'athlete/' + name, { token } )
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
  async(data, thunkAPI)=>{
    try{
      //thunkapi has a function that 
      //can get any chunk of the state
      //thunkAPI.getState().sliceofstate.propname.propname
     
      const config = {
        params:{
          name: data.name ,
          page: data.page ,
          pageSize: data.pageSize ,
        }
      }
      const response = await axios.get(baseUrl + 'athletes', config)
      return response.data;
    }catch(error){
      console.log(error)
    }
  }
)

export const getTrendingAthletes = createAsyncThunk(
  'trending_athletes',
  async(data) => {
    try{
      const config = {
        params:{
          pageSize: data.pageSize
        }
      }
      const response = await axios.get(baseUrl + 'trending_athletes', config)
      return response.data;
    }catch(error){
      console.log(error)
    }
  }
)


export const getOracleRatings = createAsyncThunk(
  'oracle_ratings',
  async(data) => {
    try{
      const response = await axios.get(baseUrl + 'oracle-ratings')
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
            // state.isError = false;
            // state.isSuccess = false
          })
          .addCase(getAthlete.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.data = action.payload;
          })
          .addCase(getAthlete.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
          })
          // .addCase(getAllAthletes.pending, (state) => {
          //   state.isLoading = true;
          //   state.isError = false;
          //   state.isSuccess = false
          // })
          // .addCase(getAllAthletes.fulfilled, (state, action) => {
          //   state.isLoading = false;
          //   state.isSuccess = true;
          //   state.isError = false;
          //   state.data = action.payload;
          // })
          // .addCase(getAllAthletes.rejected, (state, action) => {
          //   state.isLoading = false;
          //   state.isError = true;
          //   state.error = action.error.message;
          // })
          // .addCase(getTrendingAthletes.pending, (state) => {
          //   state.isLoading = true;
          //   state.isError = false;
          //   state.isSuccess = false
          // })
          // .addCase(getTrendingAthletes.fulfilled, (state, action) => {
          //   state.isLoading = false;
          //   state.isSuccess = true;
          //   state.isError = false;
          //   state.data = action.payload;
          // })
          // .addCase(getTrendingAthletes.rejected, (state, action) => {
          //   state.isLoading = false;
          //   state.isError = true;
          //   state.error = action.error.message;
          // })
      },
})


export default athleteSlice.reducer

