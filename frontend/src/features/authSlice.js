import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../config'


const API_URL = baseUrl + '/v1/user/'

// REMOVED: localStorage initialization (cookie-based auth now)
const initialState = {
  user: null,                    // Changed: no longer initialize from localStorage
  isError: false,
  isSuccess: false,
  isLoading: true,               // Start true - auth verification happens on mount
  isSubscribed: false,
  message: '',
}

// Register user
export const register = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => {
      try {
        const response = await axios.post(API_URL + 'register', userData, {
          withCredentials: true  // ADDED: Enable cookies
        })

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
  async (userData, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + 'login', userData, {
      withCredentials: true  // ADDED: Enable cookies
    })

    // REMOVED: localStorage.setItem('token', token)
    // Backend sets HttpOnly cookie; frontend just returns user data

    return response.data  // Returns { success: true, username: '...', email: '...' }

  } catch (error) {
    const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


// Verify authentication session
export const verify = createAsyncThunk(
  'auth/verify',
  async (_, thunkAPI) => {
  try {
    // REMOVED: localStorage.getItem('token')
    // Cookie is automatically sent by browser

    const response = await axios.post(`${API_URL}verify-token`, {}, {
      withCredentials: true  // ADDED: Cookie sent automatically
    })

    const { valid, user } = response.data

    if (valid) {
      return user  // Returns user object from backend
    } else {
      throw new Error('Invalid session')
    }

  } catch (error) {
    const message = 'Session verification failed'
    return thunkAPI.rejectWithValue(message)
  }
})


// Get account info (subscription status)
export const account = createAsyncThunk(
  'auth/account',
  async (_, thunkAPI) => {
    try {
      // REMOVED: localStorage.getItem('token') and Basic Auth header
      // Cookie is automatically sent by browser

      const response = await axios.get(API_URL + 'account', {
        withCredentials: true  // ADDED: Cookie sent automatically
      })

      return response.data.pro
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


// Logout user
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
      try {
        // ADDED: Backend call to clear cookie
        await axios.post(API_URL + 'logout', {}, {
          withCredentials: true
        })

        // REMOVED: localStorage.removeItem('token')
        // Backend clears cookie; frontend just clears Redux state

        // Clear any legacy tokens (migration cleanup)
        try {
          localStorage.removeItem('token')
        } catch (e) {
          // Ignore errors
        }

        return null
      } catch (error) {
        // Always clear local state even if server request fails
        try {
          localStorage.removeItem('token')
        } catch (e) {
          // Ignore errors
        }
        return null
      }
    }
)


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
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.username  // Store username
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      // Verify
      .addCase(verify.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload  // User object from backend
      })
      .addCase(verify.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
      })
      // Account - Don't set isLoading to avoid blocking UI
      // isLoading should only be true during login/verify, not subscription checks
      .addCase(account.pending, (state) => {
        // Don't set isLoading - let components render while checking subscription
      })
      .addCase(account.fulfilled, (state, action) => {
        state.isSubscribed = action.payload
      })
      .addCase(account.rejected, (state) => {
        state.isSubscribed = false
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isSubscribed = false
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
