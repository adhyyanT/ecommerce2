import { getCart, removeFromCart } from '@/api/productApi';
import { Nav } from '@/components/main-nav';
import { useEffect, useState } from 'react';
import { CartType } from 'types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const [countDel, setCountDel] = useState(0);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState<CartType[]>();

  const handleDelete = async (id: number) => {
    const res = await removeFromCart(id);
    if (res.ok) setCountDel(countDel + 1);
  };
  useEffect(() => {
    const _ = async () => {
      const res: CartType[] = await getCart();
      let t = 0;
      res.map((prod) => (t += prod.price * prod.count));
      setTotal(t);
      setCart(res);
    };
    _();
  }, [countDel]);
  if (!cart) return;
  return (
    <div className='min-h-screen flex flex-col bg-background text-foreground overflow-hidden'>
      <Nav />
      {cart.length === 0 ? (
        <>
          <div className='font-semibold text-4xl flex place-content-center justify-center items-center py-[20vh] md:px-[5vw] '>
            Why so empty ??
          </div>
        </>
      ) : (
        <div className='flex flex-col py-[10vh] md:px-[5vw]'>
          <Table className=''>
            <TableCaption>A list of your recently added products.</TableCaption>
            <TableHeader>
              <TableRow className='text-foreground'>
                <TableHead className='w-[75vw]'>Product</TableHead>
                <TableHead className='w-[8vw]'>Quantity</TableHead>
                <TableHead className='w-[8vw]'>Remove </TableHead>
                <TableHead className='text-left w-[8vw]'>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((product) => (
                <TableRow key={product.product_id} className=''>
                  <TableCell className='font-medium w-[50vw] py-7'>
                    {product.title}
                  </TableCell>
                  <TableCell className='w-[8vw] py-7'>
                    {product.count}
                  </TableCell>
                  <TableCell className='w-[8vw] py-7'>
                    <Button
                      variant={'ghost'}
                      onClick={() => handleDelete(product.product_id)}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>

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
                  ${total}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className='flex place-content-end p-8'>
            <Button>
              Checkout <Icons.chevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
