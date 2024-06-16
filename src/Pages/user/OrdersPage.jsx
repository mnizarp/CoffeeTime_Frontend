import Footer from "../../Components/user/Footer"
import Header from "../../Components/user/Header"
import OrderItem from "../../Components/user/OrderItem"

const OrdersPage = () => {

  

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

<div className="w-full h-full space-y-3  flex flex-wrap overflow-y-scroll">
       
    <OrderItem/>
    <OrderItem/>
    <OrderItem/>
    <OrderItem/>
    <OrderItem/>
    

</div>


</div>

<Footer/>

</div>
  )
}

export default OrdersPage