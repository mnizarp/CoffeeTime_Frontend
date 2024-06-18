import {createSlice} from '@reduxjs/toolkit'

const storedAdminInfo = sessionStorage.getItem('adminInfo');
const adminInfoString = storedAdminInfo || ''; 

const adminInfo = storedAdminInfo ? JSON.parse(adminInfoString) : null;


const initialState = {
    adminInfo,
};


const adminSlice=createSlice({
   name:'adminAuth',
   initialState,
   reducers:{
     setAdminCredentials:(state,action)=>{
        state.adminInfo=action.payload
        sessionStorage.setItem('adminInfo',JSON.stringify(state.adminInfo))
     },
     adminLogout:(state)=>{
        state.adminInfo=null
        sessionStorage.removeItem('adminInfo')
        console.log('loggedout')
     },
    
   }
})

export const {setAdminCredentials,adminLogout}=adminSlice.actions

export default adminSlice.reducer


