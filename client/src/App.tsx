import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from './components/ui/toaster';
import Home from '@/pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';

function App() {
  return (
    <>
      <div className='dark bg-background '>
        <Toaster />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/home' element={<Home />}></Route>
          <Route path='/product/:productId' element={<Product />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
