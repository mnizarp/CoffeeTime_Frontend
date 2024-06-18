import Header from '../../Components/user/Header'
import Footer from '../../Components/user/Footer'
import ProductCard from '../../Components/user/ProductCard'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { BASE_API_ENDPOINT } from '../../constants'
import { useLocation } from 'react-router-dom'

const CategoryPage = () => {
  const location=useLocation()

  const [allproducts,setAllproducts]=useState([])
  const getAllProducts=useCallback(async()=>{
    try {
      const response=await axios(`${BASE_API_ENDPOINT}products/getallproducts?category=${location.state.category}`)
      setAllproducts(response.data.allproducts)
    } catch (error) {
      console.log(error)
    }
 },[location.state.category]) 
  

  useEffect(()=>{
     getAllProducts()
  },[getAllProducts])

  return (
    <div className="w-auto h-screen flex flex-col items-center space-y-7 justify-between" >
         <Header />
         <h1 className='text-2xl font-bold'>{location.state.category}</h1>
           <div className="w-[95%] h-full  p-3 flex flex-wrap overflow-y-scroll" >
           {
                    allproducts.map((product)=>{
            return <ProductCard
             key={product.createdAt}
             productname={product.productname} 
             price={product.price} 
             description={product.description}
             category={product.category} 
             availability={product.availability} 
             image={product.image}
             productid={product._id} 
             />
          })
        }  

           </div>
         <Footer/>
         </div>
  )
}

export default CategoryPage