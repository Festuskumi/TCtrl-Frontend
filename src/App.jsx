import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Collections from './Pages/Collections'
import Blog from './Pages/Blog'
import Contact from './Pages/Contact'
import CartPage from './Pages/CartPage'
import LoginPage from './Pages/LoginPage'
import Wishlist from './Pages/Wishlist'
import OrderPlaced from './Pages/OrderPlace'
import OrdersPage from './Pages/OrdersPage'
import Product from './Pages/Product'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import SearchBar from './Components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import Verify from './Pages/Verify'
import VerifyCode from './Pages/VerifyCode'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'



export const backendUrl = import.meta.env.VITE_BACKEND_URL
const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <NavBar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collections />} /> {/* Updated path */}
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<CartPage />} /> {/* Updated path */}
        <Route path='/login' element={<LoginPage />} /> {/* Updated path */}
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/orders' element={<OrdersPage />} /> {/* Updated path */}
        <Route path='/order-place' element={<OrderPlaced />} /> {/* Updated path */}
        <Route path='/product/:productid' element={<Product />} />
        <Route path="/verify" element={<Verify />} /> {/* Email verification route */}
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Catch-All Route for 404 */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
