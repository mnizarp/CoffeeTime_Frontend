import axios from 'axios'
import {BASE_API_ENDPOINT} from '../../constants.js'
import toast,{Toaster} from 'react-hot-toast'
import {useSelector} from 'react-redux'
import { useState } from 'react'
import AuthForm from './AuthForm.jsx'

const ProductCard = ({productname,price,description,image,productid,availability}) => {
  
  const {userInfo}=useSelector((state)=>state.userAuth)
  const [isAuthOpen,setIsAuthOpen]=useState(false)
  const addToCart=async()=>{
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
           console.log(response)
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
    <div className="bg-slate-100 w-[23%] h-[65%] m-2 rounded-md">
      <Toaster/>
        <div className="p-2 w-full h-[70%]  ">
        <img className='w-full h-full ' src={image} alt='product-photo'/>
        </div>    
        <div className="p-1 w-full h-[30%] flex">
            <div className='w-[50%] h-full flex flex-col justify-between '>
              <h1 className='font-bold'>{productname}</h1>       
              <p className='text-xs'>{description}</p>   
              <h1 className='text-xl font-semibold'>₹ {price} /-</h1>
            </div>
            <div className='w-[20%] h-full flex justify-center  items-center'>
              {
                availability ?
                <div className=' text-white w-full h-6 bg-teal-900 rounded-full  flex justify-center items-center text-xs'>
                     Available
                </div> 
                :
                <div className=' text-white w-full h-6 bg-red-900 rounded-full flex justify-center items-center text-xs'>
                     Unavailable
                  </div> 
              }
                
            </div>
            {
              availability ? 
              <div className='w-[30%] h-full p-2 cursor-pointer'>
              <div onClick={()=>{
                if(!userInfo){
                  setIsAuthOpen(true)
                 }else{
                
                addToCart()
                 }
              }  } className='h-full w-full bg-teal-100 hover:bg-teal-300 rounded-md flex justify-center items-center flex-col'>
                  <img className='h-7 w-7' src='/icons/icons8-shopping-cart-50.png' alt=''/>
                  <h1 className='text-xs'>Add to Cart</h1>
              </div>
           </div>
           :
           <div className='w-[30%] h-full p-2 cursor-not-allowed'>
               <div  className='h-full w-full bg-red-100  rounded-md flex justify-center items-center flex-col'>
                   <img className='h-7 w-7' src='/icons/icons8-shopping-cart-50.png' alt=''/>
                   <h1 className='text-xs'>Add to Cart</h1>
               </div>
            </div>  
            }
            
        </div>
        {isAuthOpen && <AuthForm onClose={() => setIsAuthOpen(false)} />}
    </div>
  )
}

export default ProductCard