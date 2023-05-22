import {configureStore } from '@reduxjs/toolkit'
import lifterReducer from '../redux/lifterSlice'

export const store = configureStore({
    reducer: {
        lifter: lifterReducer,
    },
})




