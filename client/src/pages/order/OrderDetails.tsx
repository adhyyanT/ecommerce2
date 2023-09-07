import { getOrderDetails } from '@/api/orderApi';
import { Nav } from '@/components/main-nav';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderDetailsType } from 'types';

const OrderDetails = () => {
  let { orderId } = useParams();
  const [total, setTotal] = useState(0);
  const [orderDetail, setOrderDetail] = useState<OrderDetailsType[]>();

  useEffect(() => {
    const _ = async () => {
      const res: OrderDetailsType[] = await getOrderDetails(
        parseInt(orderId + '')
      );
      setOrderDetail(res);
      let sum = 0;
      res.map((order) => (sum += order.price * order.count));
      setTotal(sum);
    };
    _();
  }, []);
  //   console.log(orderDetail);
  return (
    <div className='min-h-screen  flex flex-col bg-background text-foreground overflow-hidden'>
      <Nav />
      <div className='px-[5vw] '>
        <Table className='my-[5vh] '>
          <TableCaption>A list of your Order ID {orderId}.</TableCaption>
          <TableHeader>
            <TableRow className='text-foreground'>
              <TableHead className='w-[75vw]'>Product</TableHead>
              <TableHead className='w-[8vw]'>Quantity</TableHead>

              <TableHead className='text-left w-[8vw]'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderDetail?.map((product, index) => (
              <TableRow key={index} className=''>
                <TableCell className='font-medium w-[50vw] py-7'>
                  {product.title}
                </TableCell>
                <TableCell className='w-[8vw] py-7'>{product.count}</TableCell>

                <TableCell className='text-left py-7 w-[8vw]'>
                  ${product.price}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className=''>
              <TableCell className='font-medium w-[50vw] py-7 border-t-4'></TableCell>
              <TableCell className='w-[8vw] py-7 border-t-4'></TableCell>
              <TableCell className='w-[8vw] py-7 border-t-4 font-extrabold text-lg'>
                Total:
              </TableCell>

              <TableCell className='text-left py-7 w-[8vw] border-t-4 font-extrabold text-lg'>
                {total}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderDetails;
