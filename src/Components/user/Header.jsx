import { useCallback, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import AuthForm from './AuthForm';
import { useSelector,useDispatch } from "react-redux"
import {logout} from '../../slices/userAuthSlice.js'
import { BASE_API_ENDPOINT } from '../../constants.js';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const Header = ({pagename}) => {

  const {userInfo}=useSelector((state)=>state.userAuth)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleLogout=()=>{
      dispatch(logout())
      navigate('/')
  }

  const handleCartClick=()=>{
       if(!userInfo){
        setIsAuthOpen(true)
       }else{
        navigate('/cart')
       }
  }

  const handleOrdersClick=()=>{
    if(!userInfo){
     setIsAuthOpen(true)
    }else{
     navigate('/orders')
    }
}


const [products,setProducts]=useState([])
const [searchInput,setSearchInput]=useState('')

const searchProducts=useCallback(async()=>{
  try{         
       const response=await axios.get(`${BASE_API_ENDPOINT}products/searchproducts?search=${searchInput}`) 
       setProducts(response.data)
  }catch(error){
      console.log(error)
  }
},[searchInput])

useEffect(()=>{
  searchProducts()
},[searchInput,searchProducts])

const addToCart=async(productid)=>{
  try {
    const token=userInfo?.token
     const response=await axios.post(`${BASE_API_ENDPOINT}carts/addtocart`,{
      productId:productid,
      userId:userInfo._id
     },{
      headers:{
        Authorization:`Bearer ${token}`
      }
     })
     if(response.status == 208){
      toast.success('Item is already in the cart')
     }else if(response.status==200){
      toast.success('Item added to Cart')
     }
  } catch (error) {
     toast.error('Adding to cart failed')
  }
 }

  return (
    <div className="w-full h-20 flex justify-between px-5 py-3 items-center ">
      <Toaster/>
        <div className="flex space-x-3 items-center justify-center">
            <img className="w-12 h-12" src="/coffeetime_logo.png" alt="logo" />
            <h1 className="text-black font-bold text-xl">Coffee Time</h1>
        </div>

        <ul className="flex space-x-4" >
            <li onClick={()=>navigate('/')} className={`font-semibold cursor-pointer ${pagename =='Home' && 'underline'}  hover:underline`}>Home</li>
            <li onClick={()=>navigate('/menu')} className={`font-semibold cursor-pointer ${pagename =='Menu' && 'underline'}  hover:underline`}>Menu</li>
            <li onClick={handleCartClick} className={`font-semibold cursor-pointer ${pagename =='Cart' && 'underline'}  hover:underline`}>Cart</li>
            <li onClick={handleOrdersClick} className={`font-semibold cursor-pointer ${pagename =='Orders' && 'underline'}  hover:underline`}>Orders</li>
        </ul>



<div className="w-96 h-[10%]  flex items-center ps-2 relative">
      <div className="w-full h-10 px-2 space-x-2 border border-gray-400 rounded-xl flex flex-row items-center">
        <img className="w-6 h-6" src="/icons/icons8-search-50.png" alt="" />
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          className="h-full w-full focus:outline-none"
          placeholder="Search products...."
        />
      </div>

      {searchInput && (
        <div className="absolute top-8 left-2 w-[98%]  bg-white shadow-lg rounded-md">
          <div className="w-full p-3 h-full border border-gray-300 rounded-md">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold">Search results</h1>
            </div>
            <hr className="my-2" />
            <div className="w-full h-96 z-50 overflow-y-scroll">
              {products?.length > 0 ? (
                products?.map((product) => (
                  <>
                  <div
                  key={product?._id}
                  className="w-full h-14  p-2 flex cursor-pointer items-center justify-between  hover:bg-gray-100 transition duration-300"
                >
                  <div className='flex space-x-2 items-center'>
                   <img className="w-10 h-10 rounded-full z-50" src={product?.image} alt="" />
                   <div className='flex flex-col  justify-center'>
                    <h1 className="text-base font-semibold z-50">{product.productname}</h1>
                    <h1 className="text-base font-semibold z-50">₹ {product.price} /-</h1>
                   </div>
                   
                  </div>
                  {
                    product?.availability ?
                     <div onClick={()=>
                       {
                        if(!userInfo){
                          setIsAuthOpen(true)
                         }else{
                          addToCart(product?._id)
                         }
                        
                       } }
                       className='w-20 h-6 rounded-sm flex justify-center items-center bg-emerald-700'>
                       <h1 className='text-xs font-bold text-white'>Add to Cart</h1>
                     </div>
                     :
                     <div className='w-20 h-6 rounded-sm flex justify-center items-center bg-red-700'>
                       <h1 className='text-xs font-bold text-white'>Unavailable</h1>
                     </div>
                  }
                  
                </div>

                </>
                ))
              ) : (
                <div className="text-center mt-4">
                  <h1>No search results.</h1>
                </div>
              )}
                 

            </div>
          </div>
        </div>
      )}
    </div>




        {
          userInfo ? 
          <div className='flex items-center space-x-10'>
           <h1 className='font-semibold text-xl'>{userInfo.username}</h1>
          <button  onClick={handleLogout} className=" border border-black text-black px-3 py-1 rounded-sm hover:bg-black hover:text-white font-medium">Logout</button>
          </div>
           :
         <button  onClick={() => setIsAuthOpen(true)} className=" border border-black text-black px-3 py-1 rounded-sm hover:bg-black hover:text-white font-medium">Login</button>
        }
        {isAuthOpen && <AuthForm onClose={() => setIsAuthOpen(false)} />}
    </div>
  )
}

export default Header