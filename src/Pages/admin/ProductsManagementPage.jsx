import AddProductForm from '../../Components/admin/AddProductForm'
import AdminFooter from '../../Components/admin/AdminFooter'
import AdminHeader from '../../Components/admin/AdminHeader'
import ProductListItem from '../../Components/admin/ProductListItem'
import axios from 'axios'
import { BASE_API_ENDPOINT } from '../../constants'
import { useEffect, useState } from 'react'
import UpdateProductForm from '../../Components/admin/UpdateProductForm'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProductsManagementPage = () => {
  
  const {adminInfo}=useSelector((state)=>state.adminAuth)
  const navigate=useNavigate()
  useEffect(()=>{
      if(!adminInfo){
         navigate('/admin')
      }
  },[adminInfo,navigate])

  const [isEditing,setIsediting]=useState(null)
  const [allproducts,setAllproducts]=useState([])
   const getAllProducts=async()=>{
      try {
        const response=await axios(`${BASE_API_ENDPOINT}products/getallproducts`)
        setAllproducts(response.data.allproducts)
      } catch (error) {
        console.log(error)
      }
   }
   
   const [modified,setModified]=useState('')

   useEffect(()=>{
      getAllProducts()
   },[modified])

   const [filteredProducts, setFilteredProducts] = useState([]);
   const [searchInput, setSearchInput] = useState('');

   useEffect(() => {
    if (searchInput) {
      const regex = new RegExp(searchInput, 'i'); // 'i' for case-insensitive search
      const filtered = allproducts.filter((product) =>
        regex.test(product.productname)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allproducts);
    }
  }, [searchInput, allproducts]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className='w-screen h-screen flex flex-col items-center'>
          <AdminHeader pagename='Products' />


          <div className='w-[95%] h-[85%]  flex'>

            <div className='h-full w-[65%] border flex flex-col p-3 space-y-2'>
               <div className='flex justify-between items-center'>
                 <h1 className='text-2xl font-semibold'>All Products</h1>
                 <div className='flex w-80 h-8 border rounded-md items-center space-x-2 px-2'>
                   <input onChange={handleSearchInput} value={searchInput} className='w-[90%] focus:outline-none' placeholder='Search products..' />
                   <img className='w-5 h-5 cursor-pointer' src='/icons/icons8-search-50.png' alt=''/>
                 </div>
               </div>

               <div className='w-full h-12 bg-slate-50 border flex justify-between items-center px-2 '>

                    <div className="w-[30%] flex space-x-3 items-center">
                        <div>
                          <h1 className="text-md ">Product</h1>
                        </div>    
                    </div>

                    <div className="w-[10%] flex justify-center items-center">
                        <div className="flex">
                            <div className="text-md   w-14 h-14 flex justify-center items-center">Category</div>
                        </div>
                    </div>

                    <div className="w-[10%] flex items-center justify-center  ">
                        <h1 className="text-md ">Price</h1>
                    </div>

                    <div className="w-[10%] flex items-center justify-center  ">
                        <h1 className="text-md ">Availability</h1>
                    </div>

                    <div className="w-[10%] flex items-center justify-center  ">
                        <div className="w-48  text-md  text-center">Edit</div>
                    </div>

                    <div className="w-[10%] flex justify-center items-center  ">
                        <div className="w-48  text-md  text-center">Delete</div>
                    </div>
                </div>

                <div className='w-full h-full  overflow-y-scroll space-y-1'>
                  {
                    filteredProducts.map((product)=>{
                      return  <ProductListItem 
                       key={product.createdAt}
                       productname={product.productname} 
                       price={product.price} 
                       category={product.category} 
                       availability={product.availability} 
                       image={product.image}
                       productid={product._id} 
                       setModified={setModified}
                       setIsediting={setIsediting}
                       />
                    })
                  }        
                </div>

            </div>
            <div className='h-full w-[35%] '>
              {
                isEditing ? 
                <UpdateProductForm setModified={setModified} setIsediting={setIsediting} isEditing={isEditing} />
                :
                <AddProductForm setModified={setModified}  />
              }
            </div>

          </div>

          <AdminFooter/>
    </div>
  )
}

export default ProductsManagementPage