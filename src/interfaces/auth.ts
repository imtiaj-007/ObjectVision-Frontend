import { z } from 'zod';

// Auth Response Schema
export const AuthResponseSchema = z.object({
  access_token: z.string().min(1, { message: "Access token is required" }),
  token_type: z.string().optional()
});
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

// Signup Form Data Schema
export const SignupFormDataSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { 
      message: "Password must include uppercase, lowercase, and number" 
    }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
export type SignupFormData = z.infer<typeof SignupFormDataSchema>;

// Login Form Data Schema
export const LoginFormDataSchema = z.object({
  user_key: z.union([
    z.string().email({ message: "Invalid email address" }), 
    z.string().min(3, { message: "User ID must be at least 3 characters" }) 
  ]),
  password: z.string().min(1, { message: "Password is required" }),
  remember_me: z.boolean().default(false),
  new_device: z.boolean().default(false),
});
export type LoginFormData = z.infer<typeof LoginFormDataSchema>;