import axios from "axios"
import CartItem from "../../Components/user/CartItem"
import Footer from "../../Components/user/Footer"
import Header from "../../Components/user/Header"
import { BASE_API_ENDPOINT } from "../../constants"
import { useSelector } from "react-redux"
import { useCallback, useEffect, useState } from "react"
import toast,{Toaster} from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const CartPage = () => {
 
   const {userInfo}=useSelector((state)=>state.userAuth)

  const navigate=useNavigate()
  useEffect(()=>{
      if(!userInfo){
         navigate('/')
      }
  },[userInfo,navigate])
  
   const [allcartitems,setAllcartitems]=useState([])
   const [totalbill,setTotalbill]=useState(0)
   const [loading,setLoading]=useState(false)

   const getCartItems=useCallback(async()=>{
      try{
         const token=userInfo?.token
        const response=await axios.get(`${BASE_API_ENDPOINT}carts/getcartitems?userid=${userInfo._id}`,{
         headers:{
            Authorization:`Bearer ${token}`
         }
        })
        setAllcartitems(response.data.cartitems)
      }catch(error){
         console.log(error)
      }
   },[userInfo?._id,userInfo?.token]) 
   
   const [quantitychange,setQuantitychange]=useState(false)

   const calculateTotal=useCallback(()=>{
      const total=allcartitems.reduce((acc,curr)=>{
           return curr.product_id.price*curr.quantity + acc
      },0)
      setTotalbill(total)
   },[allcartitems]) 

   useEffect(()=>{
     getCartItems()
     calculateTotal()
   },[getCartItems,quantitychange,calculateTotal])

   const handlePlaceOrder=async()=>{
      try {
         setLoading(true)
         const token=userInfo?.token
         await axios.post(`${BASE_API_ENDPOINT}orders/createorder`,{
            userId:userInfo._id
         },{
            headers:{
              Authorization:`Bearer ${token}`
         }
      })
         setLoading(false)
         toast.success('Order placed successfully')
      } catch (error) {
         console.log(error)
      }
   }

  return (
        
    <div className="w-auto h-screen flex flex-col items-center space-y-7 justify-between" >
         <Header pagename='Cart'/>
         <div className="w-[95%] h-[70%]  flex space-x-2">
       <Toaster/>
    <div className="w-[68%] h-full space-y-3  flex flex-col overflow-y-scroll">
        {
         allcartitems.length!=0 ?
         allcartitems.map((item)=>{
            return <CartItem 
                     key={item.product_id.createdAt}
                     productname={item.product_id.productname} 
                     price={item.product_id.price} 
                     image={item.product_id.image} 
                     quantity={item.quantity} 
                     cartid={item._id}  
                     quantitychange={quantitychange}
                     setQuantitychange={setQuantitychange} 
                     />
         })

         :
         <div className="w-full h-full flex justify-center items-center">
         <h1 className="text center text-xl font-semibold" >Cart is empty</h1>
         </div>
        }

    </div>

    <div className=" w-[30%] min-h-max bg-slate-100 flex flex-col space-y-3">
        <div>
            <h1 className="text-xl text-center font-bold my-3">Your Order</h1>
            <hr/>
        </div>
      
       <div className="w-full ">
      {
         allcartitems.length!=0 ?
         allcartitems.map((item)=>{
           return(
                        <div key={item._id} className="h-14 w-full flex justify-between">
                           <div className="w-[40%] flex items-center justify-center">
                              <h1>{item.product_id.productname} </h1>
                           </div>
                           <div className="w-[30%] flex items-center justify-center">
                              <h1>{item.quantity} </h1>
                           </div>
                           <div className="w-[30%] flex items-center justify-center">
                              <h1>₹ {item.product_id.price*item.quantity}</h1>
                           </div>
                        </div>
           ) 
         })
         :
         <div className="w-full flex justify-center items-center">
            <h1 className="text-lg ">Empty</h1>
         </div>
      }
        
         <hr/>
  
       </div>

       <h1 className="text-xl font-semibold text-center">Total Amount :- ₹ {totalbill} /-</h1>
      {
         allcartitems?.length!=0 &&
         <button onClick={handlePlaceOrder} className={` w-full h-8 bg-emerald-800 text-white hover:bg-black`}>{loading ? 'Loading...':'Place Order'}</button>
      }

    </div>
    </div>

    <Footer/>
    </div>

  )
}

export default CartPage