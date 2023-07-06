import {configureStore } from '@reduxjs/toolkit'
import athleteReducer from '../features/athleteSlice'
import sessionReducer from '../features/sessionSlice'
import authReducer from '../features/authSlice'

export const store = configureStore({
    reducer: {
        athlete: athleteReducer,
        session: sessionReducer,
        auth: authReducer,
    },
})




