import {configureStore } from '@reduxjs/toolkit'
import athleteReducer from '../features/athleteSlice'
import watchlistReducer from '../features/watchlistSlice'
import authReducer from '../features/authSlice'
import meetReducer from '../features/meetSlice'

export const store = configureStore({
    reducer: {
        athlete: athleteReducer,
        meet: meetReducer,
        watchlist: watchlistReducer,
        auth: authReducer,
    },
})




