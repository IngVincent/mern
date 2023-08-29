import { z } from 'zod'

//este objeto comprueba el body de register
export const registerSchema = z.object({
    username: z.string({ required_error: 'Username is required' }),
    email: z.string({ required_error: "Email is not valid" }).email(),
    password: z.string({ required_error: 'Password is required' }).min(6, { message: 'Password must be at least 6 characters' }),
});

//este objeto comprueba el body de login
export const loginSchema = z.object({
    email: z.string({ required_error: 'Email is not valid' }).email({ message: 'invalid email', }),
    password: z.string({ required_error: 'Password must be at least 6 characters', }),


});