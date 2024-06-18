import   { useState } from 'react';
import toast, { Toaster } from "react-hot-toast"
import axios from 'axios'
import { BASE_API_ENDPOINT } from '../../constants';
import { useDispatch } from "react-redux"
import {setCredentials} from '../../slices/userAuthSlice.js'


const AuthForm = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const dispatch=useDispatch()

  const loginSubmit=async()=>{
    try {
      const response=await axios.post(`${BASE_API_ENDPOINT}users/login`,{
        email,
        password
      })
      console.log({...response.data})
      dispatch(setCredentials({...response.data}))
      onClose()   
    } catch (error) {
      if(error.response.status==401){
        toast.error('Invalid email or password')
      }else{
          toast.error('User login failed')
      }
    }
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d).{5,}$/;
    return passwordRegex.test(password);
  };
  
  const isValidUsername = (username) => {
    const usernameRegex = /^\S{5,}$/;
    return usernameRegex.test(username);
  };

  const signupSubmit=async()=>{
    try {

      if (!username || !isValidUsername(username)) {
        toast.error('Username must be at least 5 characters long and contain no spaces');
        return;
      }
  
      if (!email || !isValidEmail(email)) {
        toast.error('A valid email is required');
        return;
      }
  
      if (!password || !isValidPassword(password)) {
        toast.error('Password must be at least 5 characters long and contain at least one number');
        return;
      }

      await axios.post(`${BASE_API_ENDPOINT}users/signup`,{
        username,
        email,
        password
      })
        toast.success('User registered successfully')
        setEmail('')
        setPassword('')
        setIsLogin(true)

    } catch (error) {    
      if(error.response.status==401){
        toast.error('User Already Exists')
     }else{
        toast.error('User Registeration failed')
     }
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Toaster/>
      <div className="bg-white p-8 rounded shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        {isLogin ? (
          <>
            <h2 className="text-2xl mb-4">Login</h2>
            <div >
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <button onClick={loginSubmit} className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
            </div>
            <p className="mt-4 text-center">
              Dont have an account? <span onClick={() => {
                setIsLogin(false)
                setEmail('')
                setPassword('')
              } }className="text-blue-500 cursor-pointer">Sign Up</span>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl mb-4">Sign Up</h2>
            <div >
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Username</label>
                <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <button onClick={signupSubmit} className="w-full bg-green-500 text-white p-2 rounded">Sign Up</button>
            </div>
            <p className="mt-4 text-center">
              Already have an account? <span onClick={() => 
                {
                  setIsLogin(true)
                  setUsername('')
                  setEmail('')
                  setPassword('')                 
                }
              } className="text-blue-500 cursor-pointer">Login</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
