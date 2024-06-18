import axios from "axios"
import { useState } from "react"
import { BASE_API_ENDPOINT } from "../../constants"
import { useDispatch } from "react-redux"
import { setAdminCredentials } from "../../slices/adminAuthSlice"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"

const AdminLoginPage = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleLogin=async()=>{
        try{
        const response=await axios.post(`${BASE_API_ENDPOINT}admins/adminlogin`,{
            email,
            password
        })
        dispatch(setAdminCredentials({...response.data}))    
             navigate('/admin/products')          
        }catch(error){
          if(error.response.status==402){
            toast.error('Invalid email or password')
          }else{
            toast.error('An error occured.Login failed')
          }
       
        }
     }
  return (
    <div className='w-screen h-screen flex justify-center space-x-10 items-center'>
        <Toaster/>
       <img className='w-80 h-80' src='/coffeetime_logo.png' alt='' />
       <div className='w-96 h-96 border rounded-lg flex flex-col items-center justify-center'>
            <h1 className="font-bold text-xl">Admin Login</h1>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-[90%] h-12 focus:outline-none px-3 " placeholder="Email" />
            <input value={password} onChange={(e)=>setPassword(e.target.value)} className="w-[90%] h-12 focus:outline-none px-3 " placeholder="Password" />
            <button onClick={handleLogin} className="w-20 h-8 bg-emerald-600 text-white font-bold">Login</button>
       </div>
    </div>
  )
}

export default AdminLoginPage