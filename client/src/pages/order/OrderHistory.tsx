import { allOrders } from '@/api/orderApi';
import { Nav } from '@/components/main-nav';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AllOrderType } from 'types';

const OrderHistory = () => {
  const [orders, setOrders] = useState<AllOrderType[]>();
  const navigate = useNavigate();
  useEffect(() => {
    const _ = async () => {
      let res = await allOrders();
      if (res.errorCode === 401) navigate('/');
      const res2 = res as AllOrderType[];
      res2.sort((o1, o2) => {
        const compareDates = (d1: string, d2: string) => {
          let date1 = new Date(d1).getTime();
          let date2 = new Date(d2).getTime();

          if (date1 < date2) {
            return 1;
          } else if (date1 > date2) {
            return -1;
          } else {
            return 0;
          }
        };
        return compareDates(o1.createdAt, o2.createdAt);
      });

      setOrders(res);
    };
    _();
  }, []);
  return (
    <div className='min-h-screen flex flex-col bg-background text-foreground overflow-hidden'>
      <Nav />
      <div className='flex mt-[10vh] font-semibold text-3xl pl-6'>
        Your past orders
      </div>
      {!orders || orders.length === 0 ? (
        <div className='flex flex-col items-center pt-[20vh] text-4xl font-semibold'>
          Why so empty ??
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <div className='grid grid-cols-1 py-[10vh] gap-8 px-[4vw]  place-content-center md:grid-cols-4'>
            {orders?.map((order) => (
              <>
                <Link to={`/order/details/${order.order_id}`}>
                  <Card
                    key={order.order_id}
                    className='w-80 overflow-hidden flex-col text-accent-foreground bg-muted'
                  >
                    <CardHeader className='flex-col items-center h-25' id='ea'>
                      <CardTitle className=' rounded-md'>
                        Order ID: {order.order_id}
                      </CardTitle>
                      {/* <CardDescription className='pt-2'>Hey</CardDescription> */}
                    </CardHeader>
                    <CardContent className='flex flex-col text-center overflow-hidden h-20 font-semibold'>
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </CardContent>
                    <CardDescription className='flex text-center h-10 flex-col items-center '>
                      Time: {new Date(order.createdAt).toLocaleTimeString()}
                    </CardDescription>
                  </Card>
                </Link>
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
