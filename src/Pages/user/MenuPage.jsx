import Header from '../../Components/user/Header'
import Footer from '../../Components/user/Footer'
import ProductCard from '../../Components/user/ProductCard'

const MenuPage = () => {
  return (
    <div className="w-auto h-screen flex flex-col items-center space-y-7 justify-between" >
         <Header pagename='Menu'/>
           <div className="w-[95%] h-full  p-3 flex flex-wrap overflow-y-scroll" >
             <ProductCard/>
             <ProductCard/>
             <ProductCard/>
             <ProductCard/>
             <ProductCard/>

             <ProductCard/>
             <ProductCard/>
             <ProductCard/>
             <ProductCard/>
             <ProductCard/>
             <ProductCard/>

             <ProductCard/>
             <ProductCard/>
             <ProductCard/>
             <ProductCard/>

           </div>
         <Footer/>
         </div>
  )
}

export default MenuPage