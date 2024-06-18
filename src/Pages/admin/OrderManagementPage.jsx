import { useCallback, useEffect, useState } from 'react'
import AdminHeader from '../../Components/admin/AdminHeader'
import OrderListItem from '../../Components/admin/OrderListItem'
import { BASE_API_ENDPOINT } from '../../constants'
import axios from 'axios'
import AdminFooter from '../../Components/admin/AdminFooter'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const OrderManagementPage = () => {

  const {adminInfo}=useSelector((state)=>state.adminAuth)
  const navigate=useNavigate()
  useEffect(()=>{
      if(!adminInfo){
         navigate('/admin')
      }
  },[adminInfo,navigate])

  const [allorders,setAllorders]=useState([])
  const [updated,setUpdated]=useState(false)
  const getAllOrders=useCallback(async()=>{
    try{
       const response=await axios.get(`${BASE_API_ENDPOINT}orders/getorders`)
       setAllorders(response.data.allorders)
    }catch(error){
      console.log(error)
    }
  },[]) 

  useEffect(()=>{
    getAllOrders()
  },[getAllOrders,updated])

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
   if (searchInput) {
     const regex = new RegExp(searchInput, 'i'); 
     const filtered = allorders.filter((order) =>
       regex.test(order?.product_id?.productname) || regex.test(order?.user_id?.username) || regex.test(new Date(order?.createdAt).toLocaleDateString())
     );
     setFilteredOrders(filtered);
   } else {
     setFilteredOrders(allorders);
   }
 }, [searchInput, allorders]);

 const handleSearchInput = (e) => {
   setSearchInput(e.target.value);
 };

  return (
    <div className='w-screen h-screen flex flex-col space-y-1 justify-between items-center '>
        <AdminHeader pagename='Orders' />
               <div className='w-full flex justify-between items-center px-10'>
                 <h1 className='text-2xl font-semibold'>All Orders</h1>
                 <div className='flex w-80 h-8 border rounded-md items-center space-x-2 px-2'>
                   <input value={searchInput} onChange={handleSearchInput} className='w-[90%] focus:outline-none' placeholder='Search orders..' />
                   <img className='w-5 h-5 cursor-pointer' src='/icons/icons8-search-50.png' alt=''/>
                 </div>
               </div>
        <div className="w-[95%] h-[70%]  flex flex-col ">

<div className='w-full h-20 bg-slate-50 border flex justify-between items-center px-2 '>

<div className="w-[15%] flex items-center">
 <div className="flex">
    <div className="text-lg font-semibold  w-14 h-14 flex justify-center items-center">Customer</div>
 </div>
</div>

<div className="w-[15%] flex space-x-3 items-center">
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
<div className="w-48  text-lg font-semibold text-center">Update</div>
</div>

<div className="w-[10%] flex justify-center items-center  ">
<div className="w-48  text-lg font-semibold text-center">Delete</div>
</div>
</div>

<div className="w-full h-full space-y-2  flex flex-col overflow-y-scroll">
  
{
      allorders.length==0 ? 
      <div className="w-full h-full flex justify-center items-center">
        <h1>No orders</h1>
      </div>
      :
      
      filteredOrders?.map((order)=>{
        return (
        
             <OrderListItem 
                key={order._id}
                orderid={order._id}
                customername={order.user_id.username}
                productname={order.product_id.productname}
                total={order.total}
                quantity={order.quantity}
                status={order.status}
                orderdate={order.createdAt}
                updated={updated}
                setUpdated={setUpdated} />


        )
      })
    }
  

</div>


</div>

<AdminFooter/>
    </div>
  )
}

export default OrderManagementPage