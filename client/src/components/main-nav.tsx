import { Link } from 'react-router-dom';
import { Icons } from './icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Nav = () => {
  return (
    <div className=' text-foreground border-b-2  h-16 pt-5 overflow-x-hidden'>
      <div className='flex justify-between w-screen'>
        <a href='/home' className='gap-6 flex pl-[4vw]'>
          <Icons.logo />
          <span className='  font-bold '>Ecommerce</span>
        </a>
        <div className='flex place-items-end pr-[4vw]'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Icons.user />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='dark bg-background'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to='/cart'>Cart</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to='/orders'>My Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to='/profile'>Profile</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
export { Nav };
