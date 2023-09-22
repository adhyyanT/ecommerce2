import { ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <div className='w-full flex  bottom-0 '>
      <div className='bg-zinc-900 w-full flex text-center h-[40vh] border-t-4 items-center  place-content-center text-lg'>
        Made by &nbsp;
        <a
          href='https://tourmaline-kitten-c36bdb.netlify.app/'
          className='border-b-2 border-orange-500'
          target='_blank'
        >
          Adhyyan
        </a>{' '}
        <ArrowUpRight strokeWidth={0.5} />
      </div>
    </div>
  );
};
