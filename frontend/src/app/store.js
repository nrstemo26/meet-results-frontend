import {configureStore } from '@reduxjs/toolkit'
import athleteReducer from '../features/athleteSlice'
import sessionReducer from '../features/sessionSlice'
import authReducer from '../features/authSlice'
import meetReducer from '../features/meetSlice'

export const store = configureStore({
    reducer: {
        athlete: athleteReducer,
        meet: meetReducer,
        session: sessionReducer,
        auth: authReducer,
    },
})




