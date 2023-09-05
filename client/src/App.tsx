import { Route, Routes } from 'react-router-dom';
import { Button } from './components/ui/button';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from './components/ui/toaster';
import Home from '@/pages/Home';
function App() {
  return (
    <>
      <div className='grid h-screen place-content-center dark bg-background '>
        <Toaster />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/home' element={<Home />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
