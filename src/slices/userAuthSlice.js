import { createSlice } from "@reduxjs/toolkit";

const storedUserInfo=localStorage.getItem('userInfo')
const userInfoString = storedUserInfo || ''

const userInfo=storedUserInfo ? JSON.parse(userInfoString):null

const initialState={
    userInfo
}
const userAuthSlice=createSlice({
    name:'userAuth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.userInfo=action.payload
            localStorage.setItem('userInfo',JSON.stringify(state.userInfo))
        },
        logout:(state)=>{
            state.userInfo=null
            localStorage.removeItem('userInfo')
        }
    }
})

export const {setCredentials,logout}=userAuthSlice.actions

export default userAuthSlice.reducer