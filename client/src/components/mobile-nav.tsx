import * as React from 'react';

import { MainNavItem } from 'types';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
  return (
    <div
      className={cn(
        'text-foreground fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden'
      )}
    >
      <div className='relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md'>
        {/* <a href='/' className='flex items-center space-x-2'>
          <Icons.logo />
          <span className='font-bold'>Name</span>
        </a> */}
        <nav className='grid grid-flow-row auto-rows-max text-sm text-foreground'>
          {items.map((item, index) => (
            <a
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                item.disabled && 'cursor-not-allowed opacity-60'
              )}
            >
              {item.title}
            </a>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
