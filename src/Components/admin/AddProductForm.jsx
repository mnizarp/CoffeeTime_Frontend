import {useState} from 'react'
import ReactCrop from 'react-easy-crop';
import getCroppedImg from '../../utils/getCroppedImg';
import axios from 'axios'
import { BASE_API_ENDPOINT } from '../../constants';
import toast, { Toaster } from "react-hot-toast"
import {useSelector} from 'react-redux'

const AddProductForm = ({setModified}) => {

  const {adminInfo}=useSelector((state)=>state.adminAuth)

  const [productname,setProductname]=useState('')
  const [category,setCategory]=useState('Coffee')
  const [description,setDescription]=useState('')
  const [price,setPrice]=useState(0)
  const [image,setImage]=useState()
  const [loading,setLoading]=useState(false)
  const [count,setCount]=useState(1)

  const handleProductName=(e)=>{
      setProductname(e.target.value)
  }

  const handleDescription=(e)=>{
    setDescription(e.target.value)
  }

  const handlePrice=(e)=>{
    setPrice(e.target.value)
  }

  const handleCategorySelect=(e)=>{
    setCategory(e.target.value)
  }


  const [imageSettingBoxOpen,setImageSettingBoxOpen]=useState(false)
  const [selectedPhoto,setSelectedPhoto]=useState('')
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = (_croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleImageSelect=(e)=>{
    
    const file = e?.target?.files?.[0];
     if(file){
      const imageUrl = URL.createObjectURL(file);
      setSelectedPhoto(imageUrl)
     }
    
    setImageSettingBoxOpen(true)
  }

  const handleDoneCrop=async()=>{ 
    if (croppedArea && selectedPhoto) {  
          const croppedImage = await getCroppedImg(selectedPhoto, croppedArea);
          setImage(croppedImage)
          setImageSettingBoxOpen(false);
  }
  }


  const handleAddProduct=async()=>{
    try{
      if(productname!=='' && price!==0 && description!=='' && image ){
        const token=adminInfo?.token
        setLoading(true)
        await axios.post(`${BASE_API_ENDPOINT}products/addproduct`,{
         productname,
         image,
         category,
         description,
         price
        },{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        setProductname('')
        setImage()
        setCategory('Coffee')
        setDescription('')
        setPrice(0)
        setLoading(false)
        setModified(count)
        setCount(count+1)
       toast.success('Product Added Successfully')
      }else{
        toast.error('Please enter product details completely')
      }
      
    }catch(error){
      toast.error('Product Adding failed')
    }
  }

  return (
    <div className='h-full w-full flex flex-col justify-center items-center p-4 space-y-10'>
      <Toaster/>
      {
                imageSettingBoxOpen && 
                    <div className="fixed p-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-black z-10 space-y-2 w-[90%] md:w-[50%] h-[60%] bg-white">
                       {selectedPhoto && (
                <div style={{ position: 'relative', width: '100%', height: '90%' }}>
                    <ReactCrop
                        image={selectedPhoto}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                </div>
            )}
            <div className="w-full flex justify-between">
            <button onClick={()=>setImageSettingBoxOpen(false)} className="bg-red-500  font-semibold text-sm py-1 px-2 text-white rounded-md">Cancel</button>
            <button onClick={handleDoneCrop} className="bg-blue-600  font-semibold text-sm py-1 px-2 text-white rounded-md">Done</button>
            </div>
                    </div>
          
              }
          <h1 className='text-lg font-semibold'>New Product</h1>
          <div className=" w-[90%] flex flex-col items-center space-y-3">
                <div className="w-32 h-32 rounded-md bg-slate-100 flex justify-center items-center">
                  {
                    typeof image=='string' ?
                    <img className="object-cover" src={image} alt=""/>
                    :
                    <img className="w-10 h-10" src="/icons/icons8-add-image-48.png" alt=""/>
                  }
                </div>
 
                <div className="bg-slate-200 w-28 rounded-xl p-2 relative hover:bg-slate-300">
                    <h1 className="cursor-pointer text-sm font-semibold">
                      Choose Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                      />
                    </h1>
                  </div>

                <div className="w-full">
                    <p className="text-xs">Product Name</p>
                    <input value={productname} onChange={handleProductName} className="w-full h-7 px-2 focus:outline-none border" />
                </div>
                <div className="w-full">
                    <p className="text-xs">Category</p>
                     <select onChange={handleCategorySelect} className="border focus:outline-none">
                        <option value='Coffee' >Coffee</option>
                        <option value='Tea'>Tea</option>
                        <option value='Pastries'>Pastries</option>
                     </select>
                </div>
                <div className="w-full">
                    <p className="text-xs">Description</p>
                    <input value={description} onChange={handleDescription} className="w-full focus:outline-none px-2 h-7 border" />
                </div>
                <div className="w-full">
                    <p className="text-xs">Price</p>
                    <input value={price} onChange={handlePrice} className="w-full focus:outline-none px-2 h-7 border" />
                </div>
          </div>
          <button onClick={handleAddProduct} className={`   w-[60%] h-10 text-white bg-blue-900 rounded-lg `}>{loading ? 'Loading...':'Add Product'}</button>
    </div>
  )
}

export default AddProductForm