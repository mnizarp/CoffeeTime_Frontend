
const ProductCard = () => {
  return (
    <div className="bg-slate-100 w-[23%] h-[65%] m-2 rounded-md">
        <div className="p-2 w-full h-[70%]  ">
        <img className='w-full h-full ' src="/Tea.jpg" alt='product-photo'/>
        </div>    
        <div className="p-1 w-full h-[30%] flex">
            <div className='w-[70%] h-full flex flex-col justify-between '>
              <h1 className='font-bold'>Moroccan Tea</h1>       
              <p className='text-xs'>lorem iposum os jsoe sadfac dsaf</p>   
              <h1 className='text-xl font-semibold'>₹ 289 /-</h1>
            </div>
            <div className='w-[30%] h-full p-2 cursor-pointer'>
               <div className='h-full w-full bg-teal-100 hover:bg-teal-300 rounded-md flex justify-center items-center flex-col'>
                   <img className='h-7 w-7' src='/icons/icons8-shopping-cart-50.png' alt=''/>
                   <h1 className='text-xs'>Add to Cart</h1>
               </div>
            </div>
        </div>

    </div>
  )
}

export default ProductCard