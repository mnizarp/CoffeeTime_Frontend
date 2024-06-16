import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import AuthForm from './AuthForm';

const Header = ({pagename}) => {

  const navigate=useNavigate()
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="w-full h-20 flex justify-between px-5 py-3 items-center ">
        <div className="flex space-x-3 items-center justify-center">
            <img className="w-12 h-12" src="/coffeetime_logo.png" alt="logo" />
            <h1 className="text-black font-bold text-xl">Coffee Time</h1>
        </div>

        <ul className="flex space-x-4" >
            <li onClick={()=>navigate('/')} className={`font-semibold cursor-pointer ${pagename =='Home' && 'underline'}  hover:underline`}>Home</li>
            <li onClick={()=>navigate('/menu')} className={`font-semibold cursor-pointer ${pagename =='Menu' && 'underline'}  hover:underline`}>Menu</li>
            <li onClick={()=>navigate('/cart')} className={`font-semibold cursor-pointer ${pagename =='Cart' && 'underline'}  hover:underline`}>Cart</li>
            <li onClick={()=>navigate('/orders')} className={`font-semibold cursor-pointer ${pagename =='Orders' && 'underline'}  hover:underline`}>Orders</li>
        </ul>
        
        <button  onClick={() => setIsAuthOpen(true)} className=" border border-black text-black px-3 py-1 rounded-sm hover:bg-black hover:text-white font-medium">Login</button>
        {isAuthOpen && <AuthForm onClose={() => setIsAuthOpen(false)} />}
    </div>
  )
}

export default Header