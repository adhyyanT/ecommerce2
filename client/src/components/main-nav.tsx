import { Link, useNavigate } from 'react-router-dom';
import { Icons } from './icons';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { Box, ShoppingCart } from 'lucide-react';

const Nav = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <div className=' text-foreground border-b-2  h-16 pt-5 overflow-x-hidden '>
      <div className='flex justify-between w-screen'>
        <a href='/home' className='gap-6 flex pl-[4vw]'>
          <Icons.logo />
          <span className='  font-bold '>Ecommerce</span>
        </a>
        <div className='flex place-items-end pr-[4vw] dark bg-background '>
          <Sheet>
            <SheetTrigger asChild>
              <button>
                <Icons.user />
              </button>
            </SheetTrigger>
            <SheetContent className='dark bg-background text-foreground '>
              <SheetHeader>
                <SheetTitle className='border-b-4'>Your Account</SheetTitle>
                <SheetDescription>
                  You can view your cart and past orders from here.
                </SheetDescription>
              </SheetHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-1 items-center gap-4 mt-12 border-b-4'>
                  <Link to={'/cart'}>
                    <Button size={'lg'} variant={'ghost'} className='w-full'>
                      <ShoppingCart size={40} className='pr-3' />
                      Your cart
                    </Button>
                  </Link>
                </div>
                <div className='grid grid-cols-1 items-center gap-4  border-b-4'>
                  <Link to={'/order'}>
                    <Button size={'lg'} variant={'ghost'} className='w-full'>
                      <Box size={40} className='pr-3' /> Your Orders
                    </Button>
                  </Link>
                </div>
                <div className='grid grid-cols-1 items-center gap-4 border-b-4'>
                  <Link to={'/order'}>
                    <Button size={'lg'} variant={'ghost'} className='w-full'>
                      <Icons.user size={40} className='pr-3' /> Your Profile
                    </Button>
                  </Link>
                </div>
                <div>
                  <Button
                    variant={'ghost'}
                    size={'lg'}
                    className='w-full'
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
export { Nav };
