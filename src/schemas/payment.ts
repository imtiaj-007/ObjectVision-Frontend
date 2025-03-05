import { z } from "zod";

export const CurrencyEnum = z.enum(["INR", "USD", "EUR"]);

export const PaymentOrderRequestSchema = z.object({
    amount: z.number().gt(0, "Amount must be greater than 0"),
    currency: CurrencyEnum.default("INR"),
    receipt: z.string().optional(),
    notes: z.record(z.string(), z.string()).optional(),
    customer_id: z.string().optional(),
    description: z.string().optional(),
});

export const CustomerRequestSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    contact: z.string().min(10, "Invalid contact number"),
    notes: z.record(z.string(), z.string()).optional(),
});

export const RefundRequestSchema = z.object({
    payment_id: z.string().min(1, "Payment ID is required"),
    amount: z.number().gt(0, "Amount must be greater than 0").optional(),
    notes: z.record(z.string(), z.string()).optional(),
    speed: z.enum(["normal", "instant"]).default("normal"),
});

export const PaymentVerificationRequestSchema = z.object({
    razorpay_payment_id: z.string().min(1, "Payment ID is required"),
    razorpay_order_id: z.string().min(1, "Order ID is required"),
    razorpay_signature: z.string().min(1, "Signature is required"),
});

export const PaymentHistoryRequestSchema = z.object({
    from_date: z.string().datetime().optional(),
    to_date: z.string().datetime().optional(),
    count: z.number().min(1).max(100).default(10),
    skip: z.number().min(0).default(0),
});

export const PaymentWebhookDataSchema = z.object({
    event: z.string().min(1, "Event type is required"),
    payload: z.record(z.string(), z.unknown()),
    created_at: z.number().int("Timestamp must be an integer"),
});

