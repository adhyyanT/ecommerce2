import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from './components/ui/toaster';
import Home from '@/pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import OrderDone from './pages/order/OrderDone';
import OrderHistory from './pages/order/OrderHistory';
import OrderDetails from './pages/order/OrderDetails';

function App() {
  return (
    <>
      <div className='dark bg-background '>
        <Toaster />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<OrderHistory />} />
          <Route path='/order/done' element={<OrderDone />} />
          <Route path='/order/details/:orderId' element={<OrderDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
