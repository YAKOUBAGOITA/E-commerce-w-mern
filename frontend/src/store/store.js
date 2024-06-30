import { configureStore } from '@reduxjs/toolkit'
import useReducer from './userSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {
    user: useReducer
  },
})