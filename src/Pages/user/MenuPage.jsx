import Header from '../../Components/user/Header'
import Footer from '../../Components/user/Footer'
import ProductCard from '../../Components/user/ProductCard'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BASE_API_ENDPOINT } from '../../constants'

const MenuPage = () => {
  const [allproducts,setAllproducts]=useState([])
  const getAllProducts=async()=>{
     try {
       const response=await axios(`${BASE_API_ENDPOINT}products/getallproducts`)
       setAllproducts(response.data.allproducts)
     } catch (error) {
       console.log(error)
     }
  }
  

  useEffect(()=>{
     getAllProducts()
  },[])
  return (
    <div className="w-auto h-screen flex flex-col items-center space-y-7 justify-between" >
         <Header pagename='Menu'/>
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

export default MenuPage