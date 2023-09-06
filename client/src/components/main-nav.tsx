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
              <a href='/cart'>Cart</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href='/orders'>My Orders</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href='/profile'>Profile</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
export { Nav };
