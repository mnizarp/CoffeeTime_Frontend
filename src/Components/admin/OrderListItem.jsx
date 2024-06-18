import axios from "axios"
import { useState } from "react"
import { BASE_API_ENDPOINT } from "../../constants"
import {useSelector} from 'react-redux'

const OrderListItem = ({orderid,customername,productname,quantity,status,orderdate,total,updated,setUpdated}) => {
    
    const {adminInfo}=useSelector((state)=>state.adminAuth)
    const [newstatus,setNewstatus]=useState('Pending')

    const handleStatusUpdate=async()=>{
        try {
            const token=adminInfo?.token
            await axios.patch(`${BASE_API_ENDPOINT}orders/updatestatus`,{
                orderid,
                newstatus
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setUpdated(!updated)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete=async()=>{
        try {
            const token=adminInfo?.token
            await axios.delete(`${BASE_API_ENDPOINT}orders/deleteorder/${orderid}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setUpdated(!updated)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='w-full h-40 bg-slate-100 flex justify-between items-center px-2 '>

        <div className="w-[15%] flex space-x-3 items-center">
             <div>
               <h1 className="text-xl font-bold">{customername}</h1>
             </div>
             
        </div>

        <div className="w-[15%] flex space-x-3 items-center">
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
            <h1 className="text-xl font-semibold">{new Date(orderdate).toLocaleDateString()}</h1>
        </div>

        <div className="w-[20%] flex items-center justify-center  ">
            {
                status=='Pending' ? 
                  <select  onChange={(e)=>setNewstatus(e.target.value)} >
                    <option value='Pending' >Pending</option>
                    <option value='Completed' >Completed</option>
                  </select>
                :
                <h1 className="text-xl font-semibold">{status}</h1>       
            }
           
        </div>

        <div className="w-[10%] flex justify-center items-center  ">
            {
                status=='Pending' ?
                <div onClick={handleStatusUpdate} className="w-48 border bg-blue-300 rounded-xl cursor-pointer text-center hover:bg-blue-600">Update</div>  
                :
                <div className="w-48  rounded-xl  text-center ">Updated</div>  

            }
        </div>

        <div className="w-[10%] flex justify-center items-center  ">
            <div onClick={handleDelete}  className="w-48 border bg-red-200 rounded-xl cursor-pointer text-center hover:bg-red-500">Delete</div>
        </div>
    </div>
  )
}

export default OrderListItem