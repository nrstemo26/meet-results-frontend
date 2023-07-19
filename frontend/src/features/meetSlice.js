import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const baseUrl = 'http://192.168.86.27:5000/api/v1/'
// const baseUrl = 'http://192.168.1.139:5000/api/v1/'
// const baseUrl = 'http://98.144.49.136:5000/api/v1/'


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
        const response = await axios.get(baseUrl + 'meets', config)
        return response.data;
      }catch(error){
        console.log(error)
      }
    }
  )