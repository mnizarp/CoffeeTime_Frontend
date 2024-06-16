
import CartPage from "./Pages/user/CartPage"
import HomePage from "./Pages/user/HomePage"
import MenuPage from "./Pages/user/MenuPage"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import OrdersPage from "./Pages/user/OrdersPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/menu" element={<MenuPage/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/orders" element={<OrdersPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
