import { z } from 'zod';

export const SignUpValidation = z.object({
  name: z.string().min(2, { message: 'Too short' }).max(50, { message: 'Too long' }),
  username: z.string().min(2, { message: 'Too short' }).max(50, { message: 'Too long' }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
});

export const LoginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
});

export const PostValidation = z.object({
  caption: z.string().min(2, { message: 'Minimum 2 characters.' }).max(2200, { message: 'Maximum 2,200 caracters' }),
  file: z.custom<File[]>(),
  location: z.string().min(1, { message: 'This field is required' }).max(1000, { message: 'Maximum 1000 characters.' }),
  tags: z.string(),
});
