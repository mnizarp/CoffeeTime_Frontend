import { useNavigate } from "react-router-dom"

const CategoryCard = ({category,image}) => {

  const navigate=useNavigate()
  return (
    <div onClick={()=>navigate('/categoryproducts',{state:{category}})} className="flex flex-col p-2  h-auto w-80 items-center space-y-3 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <img className="h-72 w-72" src={image} alt="category image"/>
        <h1 className="font-semibold text-xl">{category}</h1>
    </div>
  )
}

export default CategoryCard