import axios from "axios"
import { BASE_API_ENDPOINT } from "../../constants"
import {useSelector} from 'react-redux'
const CartItem = ({productname,price,image,quantity,cartid,quantitychange,setQuantitychange}) => {
    
  const {userInfo}=useSelector((state)=>state.userAuth)
  const handlePlus=async()=>{
    try {
      const token=userInfo?.token
      await axios.patch(`${BASE_API_ENDPOINT}carts/plusquantity`,{
        cartId:cartid
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setQuantitychange(!quantitychange)
    } catch (error) {
      console.log(error)
    }
  }

  const handleMinus=async()=>{
    try {
      const token=userInfo?.token
      await axios.patch(`${BASE_API_ENDPOINT}carts/minusquantity`,{
        cartId:cartid
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setQuantitychange(!quantitychange)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove=async()=>{
    try {
      const token=userInfo?.token
      await axios.delete(`${BASE_API_ENDPOINT}carts/removecartitem/${cartid}`,{
        headers:{
          Authorization:`Bearer ${token}`
     }
    })
      setQuantitychange(!quantitychange)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='w-full h-40 bg-slate-100 flex justify-between items-center px-2 '>

        <div className="w-[40%] flex space-x-3 items-center">
             <img className="w-32 h-32 rounded-md" src={image} alt=""/>
             <div>
               <h1 className="text-xl font-bold">{productname}</h1>
               <h1 className="text-xl font-semibold">₹ {price} /-</h1>
             </div>
             
        </div>

        <div className="w-[20%] flex justify-center items-center">
             <div className="flex">
                <div onClick={handleMinus} className="text-3xl font-semibold border cursor-pointer hover:border-black w-14 h-14 flex justify-center items-center">-</div>
                <div className="text-2xl font-semibold border w-14 h-14 flex justify-center items-center">{quantity}</div>
                <div onClick={handlePlus} className="text-3xl font-semibold border cursor-pointer hover:border-black w-14 h-14 flex justify-center items-center">+</div>
             </div>
        </div>

        <div className="w-[20%] flex items-center justify-center  ">
            <h1 className="text-xl font-semibold">₹ {quantity*price} /-</h1>
        </div>

        <div className="w-[10%] flex justify-center items-center  ">
            <div onClick={handleRemove} className="w-48 border bg-red-100 rounded-xl cursor-pointer text-center">Remove</div>
        </div>
    </div>
  )
}

export default CartItem