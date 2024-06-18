import {configureStore} from '@reduxjs/toolkit'
import userAuthReducer from '../slices/userAuthSlice.js'
import adminAuthReducer from '../slices/adminAuthSlice.js'

const store=configureStore({
    reducer:{
        userAuth:userAuthReducer,
        adminAuth:adminAuthReducer
    },
    devTools:true
})

export default store