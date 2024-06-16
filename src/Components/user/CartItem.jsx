
const CartItem = () => {
  return (
    <div className='w-full h-40 bg-slate-100 flex justify-between items-center px-2 '>

        <div className="w-[40%] flex space-x-3 items-center">
             <img className="w-32 h-32 rounded-md" src="/Tea.jpg" alt=""/>
             <div>
               <h1 className="text-xl font-bold">Moroccon qwety Tea</h1>
               <h1 className="text-xl font-semibold">₹ 235 /-</h1>
             </div>
             
        </div>

        <div className="w-[20%] flex justify-center items-center">
             <div className="flex">
                <div className="text-3xl font-semibold border cursor-pointer hover:border-black w-14 h-14 flex justify-center items-center">-</div>
                <div className="text-2xl font-semibold border w-14 h-14 flex justify-center items-center">1</div>
                <div className="text-3xl font-semibold border cursor-pointer hover:border-black w-14 h-14 flex justify-center items-center">+</div>
             </div>
        </div>

        <div className="w-[20%] flex items-center justify-center  ">
            <h1 className="text-xl font-semibold">₹ 235 /-</h1>
        </div>

        <div className="w-[10%] flex justify-center items-center  ">
            <div className="w-48 border bg-red-100 rounded-xl text-center">Remove</div>
        </div>
    </div>
  )
}

export default CartItem