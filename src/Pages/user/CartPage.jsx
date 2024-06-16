import CartItem from "../../Components/user/CartItem"
import Footer from "../../Components/user/Footer"
import Header from "../../Components/user/Header"

const CartPage = () => {
  return (
  
    <div className="w-auto h-screen flex flex-col items-center space-y-7 justify-between" >
         <Header pagename='Cart'/>
         <div className="w-[95%] h-[70%]  flex space-x-2">

    <div className="w-[68%] h-full space-y-3  flex flex-wrap overflow-y-scroll">
        <CartItem/>
        <CartItem/>
        <CartItem/>
        <CartItem/>
        <CartItem/>
    </div>

    <div className=" w-[30%] min-h-max bg-slate-100 flex flex-col space-y-3">
        <div>
            <h1 className="text-xl text-center font-bold my-3">Your Order</h1>
            <hr/>
        </div>
      
       <div className="w-full ">

         <div className="h-14 w-full flex justify-between">
           <div className="w-[40%] flex items-center justify-center">
              <h1>morodsadfo tewarsf </h1>
           </div>
           <div className="w-[30%] flex items-center justify-center">
              <h1>5 </h1>
           </div>
           <div className="w-[30%] flex items-center justify-center">
              <h1>₹ 500</h1>
           </div>
         </div>

         <div className="h-14 w-full flex justify-between">
           <div className="w-[40%] flex items-center justify-center">
              <h1>morodsadfo tewarsf </h1>
           </div>
           <div className="w-[30%] flex items-center justify-center">
              <h1>5 </h1>
           </div>
           <div className="w-[30%] flex items-center justify-center">
              <h1>₹ 500</h1>
           </div>
         </div>

         <div className="h-14 w-full flex justify-between">
           <div className="w-[40%] flex items-center justify-center">
              <h1>morodsadfo tewarsf </h1>
           </div>
           <div className="w-[30%] flex items-center justify-center">
              <h1>5 </h1>
           </div>
           <div className="w-[30%] flex items-center justify-center">
              <h1>₹ 500</h1>
           </div>
         </div>

         <hr/>

         
         
       </div>

       <h1 className="text-xl font-semibold text-center">Total Amount :- ₹ 1200 /-</h1>

       <button className="w-full h-8 bg-emerald-800 text-white hover:bg-black">Place Order</button>

    </div>
    </div>

    <Footer/>
    </div>

  )
}

export default CartPage