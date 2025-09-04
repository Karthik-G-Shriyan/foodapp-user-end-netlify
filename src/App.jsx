import React, { useContext } from 'react';
import Menubar from './components/menubar/menubar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ExploreFoods from './pages/Explore/ExploreFoods';
import ContactUs from './pages/ContactUs/ContactUs';
import Home from './pages/Home/Home';
import FoodDetail from './pages/FoodDetails/FoodDetail';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
 import { ToastContainer} from 'react-toastify';
import MyOrders from './pages/MyOrders/MyOrders';
import { StoreContext } from './context/StoreContext';
import Footer from './components/Footer/Footer';



const App = () => {
 const {token} = useContext(StoreContext);

  return (
    <div>
      <Menubar/>
      <ToastContainer />
      
      <Routes>
        <Route path= '/' element={<Home/>}/>
        <Route path= '/explore' element={<ExploreFoods/>}/>
        <Route path= '/contact' element={<ContactUs/>}/>
        <Route path= '/food/:id' element={<FoodDetail/>}/>
        <Route path= '/cart' element={<Cart/>}/>
        <Route path= '/order' element={token ? <PlaceOrder/> : <Login/> }/>
        <Route path= '/register' element={token ? <Home/> : <Register/> }/>
        <Route path= '/login' element={token ? <Home/> : <Login/>}/>
        <Route path= '/myorders' element={token ?  <MyOrders/> :<Login/> }/>
        
      </Routes>
      <Footer/>
    </div>
  )
}

export default App;
