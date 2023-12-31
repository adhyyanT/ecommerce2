import { UserAuthForm } from '@/components/user-auth-form';

import { Icons } from '@/components/icons';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/signup');
  };
  return (
    <div className='container flex h-screen w-screen flex-col items-center text-foreground justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <Icons.logo className='mx-auto h-6 w-6' />
          <h1 className='text-2xl font-semibold tracking-tight '>
            Welcome back
          </h1>
          <p className='text-sm text-muted-foreground'>
            Enter your email to sign in to your account
          </p>
        </div>
        <UserAuthForm />
        <p className='px-8 text-center text-sm text-muted-foreground'>
          <button
            // href='/register'
            className='hover:text-brand underline underline-offset-4'
            onClick={handleNavigate}
          >
            Don&apos;t have an account? Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
