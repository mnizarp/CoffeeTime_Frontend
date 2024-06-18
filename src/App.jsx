
import CartPage from "./Pages/user/CartPage"
import HomePage from "./Pages/user/HomePage"
import MenuPage from "./Pages/user/MenuPage"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import OrdersPage from "./Pages/user/OrdersPage"
import ProductsManagementPage from "./Pages/admin/ProductsManagementPage"
import OrderManagementPage from "./Pages/admin/OrderManagementPage"
import CategoryPage from "./Pages/user/CategoryPage"
import AdminLoginPage from "./Pages/admin/AdminLoginPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/menu" element={<MenuPage/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/orders" element={<OrdersPage/>} />
          <Route path="/categoryproducts" element={<CategoryPage/>} />

          <Route path="/admin" element={<AdminLoginPage/>} />
          <Route path="/admin/products" element={<ProductsManagementPage/>} />
          <Route path="/admin/orders" element={<OrderManagementPage/>} />


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
