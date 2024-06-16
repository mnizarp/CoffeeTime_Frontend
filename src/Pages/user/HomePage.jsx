import CategoryCard from "../../Components/user/CategoryCard"
import Footer from "../../Components/user/Footer"
import Header from "../../Components/user/Header"

const HomePage = () => {
  return (
    <div className="w-auto h-auto flex flex-col items-center space-y-7 " >
         <Header pagename='Home'/>

         <div className="w-[80%] h-[450px] flex   ">
           <div className="px-4  w-1/2 h-full flex flex-col space-y-4 items-center justify-center rounded-s-xl bg-gradient-to-r from-teal-900 to-emerald-900">
             <h1 className="text-white text-4xl font-serif font-bold ">
              Welcome to Coffee Time
             </h1>
              <p className="font-semibold text-xl text-amber-200">Sip, Savor, Smile</p>
              <p className=" text-lg text-center text-white">At Coffee Time, we believe in the simple joys of life – great coffee, delicious food, and a welcoming atmosphere. Step into our café and experience a world of flavors and warmth.</p>
              <button className="h-8 w-64 border rounded-2xl border-amber-200 text-amber-200 hover:bg-amber-200 hover:text-teal-900">View Menu</button>
           </div>
           <div className="w-1/2 h-full rounded-e-xl bg-greenbackground bg-cover ">

           </div>
           
         </div>

          <div className="w-[80%] h-[500px]   rounded-xl flex flex-col justify-center items-center p-4 space-y-7">
             <h1 className='text-black text-3xl font-bold'>Shop by Category</h1>
             <div className='flex justify-between '>
                <CategoryCard  category="Coffee" image="/two-paper-coffee-cups-blank-600nw-1804174249.webp"/>
                <CategoryCard  category="Tea" image="/Tea.jpg"/>
                <CategoryCard  category="Pastries" image="/delicious-beautiful-cupcakes_948762-893.avif"/>
             </div>
          </div>

          <div className="w-[80%] h-[450px] rounded-xl bg-aboutus bg-cover ">
            <div className="w-1/2 h-full flex flex-col justify-center px-5 space-y-5">    
            <h1 className="text-4xl font-bold">Why choose us</h1>
            <div>
            <h1 className="text-xl font-semibold">Quality You Can Trust</h1>
            <p className="font-semibold">We are committed to delivering only the best. Our coffee is roasted to order, ensuring that you receive the freshest, most flavorful coffee possible.</p>
            </div>
            <div>
            <h1 className="text-xl font-semibold">Sustainable Sourcing</h1>
            <p className="font-semibold">We believe in responsible sourcing. Our coffee beans are ethically sourced from farmers who use sustainable practices, supporting both the environment and coffee-growing communities.</p>
            </div>
            <div>
            <h1 className="text-xl font-semibold">Convenient Shopping</h1>
            <p className="font-semibold">Browse our online store and find your favorite coffee effortlessly. Our user-friendly interface makes it easy to shop, customize your order, and check out quickly.</p>
            </div>
            </div>
          </div>

          <Footer/>
    </div>
  )
}

export default HomePage

