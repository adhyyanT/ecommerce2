import { validatePayment } from '@/api/orderApi';
import { CustomeSkeleton } from '@/components/CustomeSkeleton';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/main-nav';
import { toast } from '@/components/ui/use-toast';
import { resetCart } from '@/store/features/cartSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderDone = () => {
  const query = new URLSearchParams(window.location.search);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const _ = async () => {
      setLoading(true);
      const sessionId = query.get('session_id');
      if (!sessionId) return;
      const res = await validatePayment(sessionId);
      if (res.errorCode === 401) navigate('/');
      setSuccess(res.val);
      if (res.val) dispatch(resetCart());
      setLoading(false);
      if (res.val)
        return toast({
          title: 'An Email has been sent to your Email ID',
          description: `Thanks for using Ecommerce!`,
          variant: 'default',
        });
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
            {loading ? <CustomeSkeleton /> : <div>Payment failed ❌ </div>}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderDone;
