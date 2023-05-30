import {configureStore } from '@reduxjs/toolkit'
import lifterReducer from '../features/lifterSlice'

export const store = configureStore({
    reducer: {
        lifter: lifterReducer,
    },
})




