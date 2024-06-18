import { useCallback, useEffect, useState } from "react"
import Footer from "../../Components/user/Footer"
import Header from "../../Components/user/Header"
import OrderItem from "../../Components/user/OrderItem"
import { useSelector } from "react-redux"
import axios from "axios"
import { BASE_API_ENDPOINT } from "../../constants"
import { useNavigate } from "react-router-dom"

const OrdersPage = () => {

  const {userInfo}=useSelector((state)=>state.userAuth)

  const navigate=useNavigate()
  useEffect(()=>{
      if(!userInfo){
         navigate('/')
      }
  },[userInfo,navigate])
  
  const [allorders,setAllorders]=useState([])
  const [cancelled,setCancelled]=useState(false)
  const getAllOrders=useCallback(async()=>{
    try{
       const response=await axios.get(`${BASE_API_ENDPOINT}orders/getorders?userid=${userInfo?._id}`)
       setAllorders(response.data.allorders)
    }catch(error){
      console.log(error)
    }
  },[userInfo?._id]) 

  useEffect(()=>{
    getAllOrders()
  },[getAllOrders,cancelled])

  return (
    <div className="w-auto h-screen flex flex-col items-center space-y-7 justify-between" >
    <Header pagename='Orders'/>
    <div className="w-[95%] h-[70%]  flex flex-col ">

    <div className='w-full h-20 bg-slate-50 border flex justify-between items-center px-2 '>

<div className="w-[30%] flex space-x-3 items-center">
     <div>
       <h1 className="text-lg font-semibold">Product</h1>
     </div>    
</div>

<div className="w-[10%] flex justify-center items-center">
     <div className="flex">
        <div className="text-lg font-semibold  w-14 h-14 flex justify-center items-center">Qty</div>
     </div>
</div>

<div className="w-[10%] flex items-center justify-center  ">
    <h1 className="text-lg font-semibold">Total</h1>
</div>

<div className="w-[20%] flex items-center justify-center  ">
    <h1 className="text-lg font-semibold">Order Date</h1>
</div>

<div className="w-[20%] flex items-center justify-center  ">
    <h1 className="text-lg font-semibold">Status</h1>
</div>

<div className="w-[10%] flex justify-center items-center  ">
    <div className="w-48  text-lg font-semibold text-center">Cancel</div>
</div>
</div>

<div className="w-full h-full space-y-3  flex flex-col overflow-y-scroll">
     {
      allorders.length==0 ? 
      <div className="w-full h-full flex justify-center items-center">
        <h1>No orders</h1>
      </div>
      :
      
      allorders?.map((order)=>{
        return (
        
             <OrderItem 
                key={order._id}
                orderid={order._id}
                image={order.product_id.image}
                productname={order.product_id.productname}
                total={order.total}
                quantity={order.quantity}
                status={order.status}
                orderdate={order.createdAt}
                cancelled={cancelled}
                setCancelled={setCancelled} />

        )
      })
    }
     
</div>


</div>

<Footer/>

</div>
  )
}

export default OrdersPage