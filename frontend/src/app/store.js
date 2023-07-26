import {configureStore } from '@reduxjs/toolkit'
import athleteReducer from '../features/athleteSlice'
import watchlistReducer from '../features/watchlistSlice'
import authReducer from '../features/authSlice'

export const store = configureStore({
    reducer: {
        athlete: athleteReducer,
        watchlist: watchlistReducer,
        auth: authReducer,
    },
})




