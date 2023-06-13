import {configureStore } from '@reduxjs/toolkit'
import lifterReducer from '../features/lifterSlice'
import sessionReducer from '../features/sessionSlice'

export const store = configureStore({
    reducer: {
        lifter: lifterReducer,
        session: sessionReducer,
    },
})




