import { ContactTypeEnum } from "@/types/enums";
import { z } from "zod";

export const usernameSchema = z.object({
    username: z
        .string()
        .min(4, 'Username must be at least 4 characters')
        .max(10, 'Username cannot exceed 10 characters')
        .regex(
            /^[a-zA-Z0-9!@#$_-]+$/,
            'Username can only contain letters, numbers, and ! @ # $ _ -'
        )
});

export const phoneNumberSchema = z.object({
    phone_number: z.string()
        .nonempty("Phone Number is required")
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, "Phone number must not exceed 15 digits")
        .regex(/^\d+$/, 'Phone number must contain only digits'),
    country_code: z.string(),
    type: z.nativeEnum(ContactTypeEnum),
    is_primary: z.boolean()
});

export const addressSchema = z.object({
    address_line_1: z.string().min(1, "Address Line 1 is required"),
    address_line_2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state_province: z.string().min(1, "State/Province is required"),
    postal_code: z
        .string()
        .min(1, "Postal code is required")
        .regex(/^\d+$/, "Invalid postal code format"),
    country: z.string().min(2, "Country is required"),
    country_code: z.string().length(2).nonempty("Country_code is required"),
    latitude: z.string().optional().nullable(),
    longitude: z.string().optional().nullable(),
    type: z.nativeEnum(ContactTypeEnum),
});

export const submitUserInfoSchema = z.object({
    username: usernameSchema.nullable(),
    phone_number: phoneNumberSchema.nullable(),
    address: addressSchema.nullable()
});