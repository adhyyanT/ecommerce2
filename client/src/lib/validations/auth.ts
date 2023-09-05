import * as z from 'zod';

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Password cannot be empty' }),
});

export const registerUserAuthSchema = z.object({
  email: z.string().email(),
  username: z.string().min(1, { message: 'Username cannot be empty' }),
  name: z.string().min(1, { message: 'Name cannot be empty' }),
  password: z.string().min(1, { message: 'Password cannot be empty' }),
});
