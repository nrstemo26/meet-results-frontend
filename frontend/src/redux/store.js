import {configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/counterSlice'
import lifterReducer from '../redux/lifterSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        lifter: lifterReducer,
    },
})




