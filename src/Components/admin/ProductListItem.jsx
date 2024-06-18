import axios from 'axios'
import {BASE_API_ENDPOINT} from '../../constants.js'
import toast,{Toaster} from 'react-hot-toast'
import { useSelector } from 'react-redux'


const ProductListItem = ({productname,price,category,availability,image,productid,setModified,setIsediting}) => {

  const {adminInfo}=useSelector((state)=>state.adminAuth)

  const handleDelete=async()=>{
    try {
      const token=adminInfo?.token
      await axios.delete(`${BASE_API_ENDPOINT}products/deleteproduct/${productid}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setModified(productid)
    } catch (error) {
      toast.error('Product Deletion failed')
    }
  }

  const handleEditButton=()=>{
    setIsediting(productid)
  }

  return (
    <div className='w-full h-24  flex justify-between items-center px-2 '>
      <Toaster/>
        <div className="w-[30%] flex space-x-3 items-center">
             <img className="w-20 h-20 rounded-md" src={image} alt=""/>
             <div>
               <h1 className="text-md ">{productname}</h1>
             </div>
             
        </div>

        <div className="w-[10%] flex justify-center items-center">
             <div className="flex">
                <div className="text-md   w-14 h-14 flex justify-center items-center">{category}</div>
             </div>
        </div>

        <div className="w-[10%] flex items-center justify-center  ">
            <h1 className="text-md ">₹ {price} /-</h1>
        </div>

        <div className="w-[10%] flex items-center justify-center  ">
          {
            availability==true ? 
               <h1 className="text-md ">Available</h1>
               :
               <h1 className="text-md ">Unavailable</h1>
          }
            
        </div>

        <div className="w-[10%] flex justify-center items-center  ">
            <div onClick={handleEditButton} className="w-48 border bg-blue-100 rounded-xl cursor-pointer text-center">Edit</div>
        </div>

        <div className="w-[10%] flex justify-center items-center  ">
            <div onClick={handleDelete} className="w-48 border bg-red-100 cursor-pointer rounded-xl text-center">Delete</div>
        </div>
        
    </div>
  )
}

export default ProductListItem