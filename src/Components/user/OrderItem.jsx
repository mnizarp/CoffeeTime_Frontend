import axios from "axios"
import { BASE_API_ENDPOINT } from "../../constants"
import toast,{ Toaster } from "react-hot-toast"
import { useSelector } from "react-redux"

const OrderItem = ({orderid,image,productname,quantity,status,orderdate,total,cancelled,setCancelled}) => {
  
  
  const handleCancel=async()=>{
    try{
      
    
      await axios.patch(`${BASE_API_ENDPOINT}orders/cancelorder`,{
        orderid
      })

      setCancelled(!cancelled)
      toast.success('Order Cancelled')
    }catch(error){
      toast.error('Order Cancel failed')
    }
  }
  return (
    <div className='w-full h-40 bg-slate-100 flex justify-between items-center px-2 '>
         <Toaster/>
        <div className="w-[30%] flex space-x-3 items-center">
             <img className="w-32 h-32 rounded-md" src={image} alt=""/>
             <div>
               <h1 className="text-xl font-bold">{productname}</h1>
             </div>
             
        </div>

        <div className="w-[10%] flex justify-center items-center">
             <div className="flex">
                <div className="text-2xl font-semibold  w-14 h-14 flex justify-center items-center">{quantity}</div>
             </div>
        </div>

        <div className="w-[10%] flex items-center justify-center  ">
            <h1 className="text-xl font-semibold">₹ {total} /-</h1>
        </div>

        <div className="w-[20%] flex items-center justify-center  ">
            <h1 className="text-xl font-semibold">{ new Date(orderdate).toLocaleDateString()}</h1>
        </div>

        <div className="w-[20%] flex items-center justify-center  ">
            <h1 className="text-xl font-semibold">{status}</h1>
        </div>

        <div className="w-[10%] flex justify-center items-center  ">
          {
            status == 'Pending' ?
            <div onClick={handleCancel} className="w-48 border bg-red-400 rounded-xl cursor-pointer text-center hover:bg-red-500">Cancel</div>
            :
            status == 'Completed' ?
            <div className="w-48  rounded-xl  text-center">Completed</div>
            :
            <div className="w-48 00 rounded-xl text-center">Cancelled</div>
          }
        </div>
    </div>
  )
}

export default OrderItem