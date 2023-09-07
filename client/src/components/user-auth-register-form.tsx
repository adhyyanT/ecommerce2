import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { registerUserAuthSchema } from '@/lib/validations/auth';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Icons } from '@/components/icons';
import { register as registerApi } from '@/api/userApi';
import { useNavigate } from 'react-router-dom';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof registerUserAuthSchema>;

export function UserAuthRegisterForm({
  className,
  ...props
}: UserAuthFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerUserAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const signInResult = await registerApi(
      data.name,
      data.email,
      data.password,
      data.username
    );

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive',
      });
    }
    navigate('/home');

    return toast({
      title: `Welcome to Ecommerce ${signInResult.data.user.username}`,
      description: 'All products are on discounted price!',
    });
  }
  //   if (success) {

  //     return <></>;
  //   }
  return (
    <div className={cn('grid gap-6 px-4 md:px-0', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='email'>
              Email
            </Label>
            <Input
              id='email'
              placeholder='name@example.com'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={isLoading}
              {...register('email')}
            />
            {errors?.email && (
              <p className='px-1 text-xs text-red-600'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='username'>
              Username
            </Label>
            <Input
              id='username'
              placeholder='User Name'
              type='text'
              autoCapitalize='none'
              autoCorrect='off'
              disabled={isLoading}
              {...register('username')}
            />
            {errors?.username && (
              <p className='px-1 text-xs text-red-600'>
                {errors.username.message}
              </p>
            )}
          </div>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='name'>
              Name
            </Label>
            <Input
              id='name'
              placeholder='Name'
              type='text'
              autoCapitalize='none'
              autoComplete='name'
              autoCorrect='off'
              disabled={isLoading}
              {...register('name')}
            />
            {errors?.name && (
              <p className='px-1 text-xs text-red-600'>{errors.name.message}</p>
            )}
          </div>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='password'>
              Password
            </Label>
            <Input
              id='password'
              placeholder='password'
              type='password'
              autoCapitalize='none'
              autoComplete='password'
              autoCorrect='off'
              disabled={isLoading}
              {...register('password')}
            />
            {errors?.password && (
              <p className='px-1 text-xs text-red-600'>
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            Sign In with Email
          </button>
        </div>
      </form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
      </div>
    </div>
  );
}
