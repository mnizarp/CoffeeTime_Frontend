import {useNavigate} from 'react-router-dom'
import { adminLogout } from '../../slices/adminAuthSlice'
import { useDispatch } from 'react-redux'

const AdminHeader = ({pagename}) => {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const handleLogout=async()=>{
      try {
        dispatch(adminLogout())
        navigate('/admin')
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className="w-full h-20 bg-teal-800 flex justify-between px-5 py-3 items-center ">
    <div className="flex space-x-3 items-center justify-center">
        <img className="w-12 h-12" src="/coffeetime_logo.png" alt="logo" />
        <h1 className="text-white font-bold text-xl">Coffee Time</h1>
    </div>

    <ul className="flex space-x-4" >
        <li onClick={()=>navigate('/admin/products')} className={`font-semibold cursor-pointer text-white ${pagename =='Products' && 'underline'}  hover:underline`}>Products Manager</li>
        <li onClick={()=>navigate('/admin/orders')} className={`font-semibold cursor-pointer text-white ${pagename =='Orders' && 'underline'}  hover:underline`}>Orders Manager</li>
    </ul>
    
    <button onClick={handleLogout}  className=" border border-white text-white px-3 py-1 rounded-sm hover:bg-white hover:text-black font-medium">Logout</button>
   </div>
  )
}

export default AdminHeader