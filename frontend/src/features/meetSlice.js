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

export const getAllMeets = createAsyncThunk(
    'meets',
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
        const response = await axios.get(`${apiUrl}meets`, config)
        return response.data;
      }catch(error){
        console.log(error)
      }
    }
  )


  export const getMeetTable = createAsyncThunk(
    'meet-table',
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
        const response = await axios.get(`${apiUrl}meets/recent`, config)
        return response.data;
      }catch(error){
        console.log(error)
      }
    }
  )


export const getMeet = createAsyncThunk(
    'meet',
    async(name, thunkAPI) => {
        try{
            const token = localStorage.getItem('token');
            const response =  await axios.post(`${apiUrl}meet/?meet_date=${name}`, { token } )
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


export const meetSlice = createSlice({ 
  name: "meet",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
      builder
        .addCase(getMeet.pending, (state) => {
          state.isLoading = true;
          // state.isError = false;
          // state.isSuccess = false
        })
        .addCase(getMeet.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.data = action.payload;
        })
        .addCase(getMeet.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.error.message;
        })
    }
})


export default meetSlice.reducer