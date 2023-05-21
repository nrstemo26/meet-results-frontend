import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const baseUrl = 'http://172.16.15.141:5000/api/v1/athlete/'


// const initialState ={
//     athlete:'jessie stemo'
// }

export const getAthlete = createAsyncThunk(
    '/',
    async(id) => {
    // async(id, thunkAPI) => {
        // id = "Nathan%20Stemo"
        id = "Jessie%20Stemo"
        try{
          
            const response =  await axios.get(baseUrl + id)
            return response.data

        }catch(error){
            console.log(error)
        }
    }
)


export const lifterSlice = createSlice({
    name: "lifter",
    initialState: {data: null, loading:false, error:null},
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

