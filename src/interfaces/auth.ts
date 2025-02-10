import { z } from 'zod';


// Signup Response Schema
export const SignupResponseSchema = z.object({
    status: z.string(),
    message: z.string(),
    user_id: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
});
export type SignupResponse = z.infer<typeof SignupResponseSchema>;

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

// OTP URL Schema
export const OTPUrlSchema = z.object({
    user_id: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
});
export type OTPUrlObj = z.infer<typeof OTPUrlSchema>;

// Verify OTP Schema
export const OTPVerifySchema = z.object({
    user_id: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    otp: z.string()
        .length(6, { message: "OTP must be exactly 6 digits" })
        .regex(/^\d{6}$/, { message: "OTP must contain only numeric digits" }),
});

export type OTPVerify = z.infer<typeof OTPVerifySchema>;

// OTP Success Schema
export const OTPSuccessSchema = z.object({
    status: z.string(),
    message: z.string()
});

export type OTPSuccess = z.infer<typeof OTPSuccessSchema>;