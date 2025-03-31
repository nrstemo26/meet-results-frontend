import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../config'


const API_URL = baseUrl + '/v1/user/'

// Get token from localStorage
const storedToken = localStorage.getItem('token');

const initialState = {
  token: storedToken || null,
  user: storedToken ? { token: storedToken } : null, // Initialize user if token exists
  isError: false,
  isSuccess: false,
  isLoading: false,
  isSubscribed: false,
  message: '',
}

// Register user
export const register = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => {
      try {     
        const response = await axios.post(API_URL + 'register', userData)
        
        
        //data is probably not the right property tho
        //needs to have the token as property
        //can be deleted if we want there to be the verification email
        // if (response.data) {
        //     localStorage.setItem('user', JSON.stringify(response.data))
        // }
        
        return response.data
        
      } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString()
          return thunkAPI.rejectWithValue(message)
    }
  }
)
              
              
              
// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + 'login', user)
    
    if (response.data.token) {
      const { token } = response.data
      localStorage.setItem('token', token)
      
      // boilerplate code 
      // localStorage.setItem('user', JSON.stringify(response.data))
    }
    
    return response.data
    
  } catch (error) {
    const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})



export const verify = createAsyncThunk(
  'auth/verify',
  async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token')
    
    if(token){
      const res = await axios.post(`${API_URL}verify-token`, {token})
      const { valid } = res.data;
      
      //consider user already logged in
      if(valid){
        return { token }; // Return token in an object to set user correctly
      }else{
        //token invalid remove from local storage and log user out
        localStorage.removeItem('token');
        throw new Error('error')
      }
    }
  
  throw new Error('error')

  } catch (error) {
    const message = 'token verification rejected'
    return thunkAPI.rejectWithValue(message)
  }
})


export const account = createAsyncThunk(
  'auth/account',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    const credentials = btoa(`${token}:unused`);
    try {
      const response = await axios.get(API_URL + 'account', {
        headers: {
          Authorization: `Basic ${credentials}`,
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      return response.data.pro;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await localStorage.removeItem('token')
    }
)

// Add a debug helper that's available in the browser console
if (typeof window !== 'undefined') {
  window.debugLiftOracleAuth = () => {
    const token = localStorage.getItem('token');
    return {
      tokenInLocalStorage: !!token,
      tokenLength: token ? token.length : 0,
      tokenFirstChars: token ? token.substring(0, 5) + '...' : 'none'
    };
  };
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.token = action.payload.token
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.token = null
        state.user = null
      })
      .addCase(verify.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.token = action.payload.token
        state.user = action.payload // Set user with token to display Account/Logout
      })
      .addCase(verify.rejected, (state, action) => {
        state.isLoading = false
        // state.isError = true
        // state.message = action.payload
        state.token = null
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null
        state.user = null
      })
      .addCase(account.fulfilled, (state, action) => {
        state.isSubscribed = action.payload; // Update the is_subscribed state
      })
      .addCase(account.rejected, (state) => {
        state.isSubscribed = false; // Reset is_subscribed if fetch fails
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer