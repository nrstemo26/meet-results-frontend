import {configureStore } from '@reduxjs/toolkit'
import athleteReducer from '../features/athleteSlice'
import watchlistReducer from '../features/watchlistSlice'
import authReducer from '../features/authSlice'
import meetReducer from '../features/meetSlice'
import upcomingReducer from '../features/upcomingSlice'

export const store = configureStore({
    reducer: {
        athlete: athleteReducer,
        meet: meetReducer,
        upcoming: upcomingReducer,
        watchlist: watchlistReducer,
        auth: authReducer,
    },
})




