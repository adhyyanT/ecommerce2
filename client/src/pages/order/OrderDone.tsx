import { validatePayment } from '@/api/orderApi';
import { Nav } from '@/components/main-nav';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderDone = () => {
  const query = new URLSearchParams(window.location.search);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const _ = async () => {
      const sessionId = query.get('session_id');
      if (!sessionId) return;
      const res = await validatePayment(sessionId);
      if (res.errorCode === 401) navigate('/');
      setSuccess(res.val);
    };
    _();
  }, []);
  return (
    <div className='min-h-screen flex flex-col bg-background text-foreground overflow-hidden'>
      <Nav />
      <div className='flex justify-center flex-1 mt-[10vh]'>
        {success ? (
          <div className='font-extrabold text-3xl md:text-7xl'>
            {' '}
            Order Placed ✅
          </div>
        ) : (
          <div className='font-extrabold text-3xl md:text-7xl'>
            Payment failed ❌
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDone;
