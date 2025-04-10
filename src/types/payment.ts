import { CurrencyEnum, PaymentStatus, SubscriptionPlansEnum } from "./enums";


export interface PaymentOrderRequest {
    plan_id: number;
    amount: number;
    currency: CurrencyEnum;
    customer_id: number;
    receipt: string;
    notes?: Record<string, string>;
    description?: string;
    promo_code?: string | null;
}

export interface PaymentOrderResponse {
    amount: number;
    amount_due: number;
    amount_paid: number;
    attempts: number;
    created_at: string;
    currency: string;
    entity: string;
    notes?: {
        title?: string;
        description?: string;
    };
    offer_id: string | null;
    receipt: string;
    status: string;
    razorpay_order_id: string;
    plan_id: number;
    plan_name: string;
    description: string;
    promo_code: string;
}

export interface OrderBase {
    user_id: number;
    plan_id: number;
    razorpay_order_id: string;
    plan_name: SubscriptionPlansEnum;
    amount: number;
    currency: CurrencyEnum;
    description?: string;
    promo_code?: string;
}

export type OrderCreate = OrderBase;

export interface OrderUpdate {
    plan_id?: number;
    plan_name?: SubscriptionPlansEnum;
    amount?: number;
    currency?: CurrencyEnum;
    description?: string;
    status: PaymentStatus;
    promo_code?: string;
    updated_at?: string;
}

export interface OrderResponse extends OrderBase {
    id: number;
    status: PaymentStatus;
    created_at: string;
    updated_at: string;
}
export interface PaymentResult {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

export type PaymentVerificationRequest = PaymentResult;

export interface CustomerRequest {
    name: string;
    email: string;
    contact: string;
    notes?: Record<string, string>;
}

export interface RefundRequest {
    payment_id: string;
    amount?: number;
    notes?: Record<string, string>;
    speed?: "normal" | "instant";
}

export interface PaymentHistoryRequest {
    from_date?: string;
    to_date?: string;
    page?: number;
    limit?: number;
}

export interface PaymentWebhookData {
    event: string;
    payload: Record<string, unknown>;
    created_at: number;
}

export interface PaymentHistory {
    id: string;
    amount: number;
    currency: string;
    status: string;
    created_at: string;
}

export interface Notes {
    plan_name: string;
    description: string;
}

export interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image: string;
    order_id: string;
    handler: (response: PaymentResult) => void;
    prefill: {
        name?: string | undefined;
        email?: string | undefined;
        contact?: string | undefined;
    };
    theme: {
        color: string;
    };
}

export interface RazorpayPaymentDetails {
    id: string;
    entity: string;
    amount: number;
    currency: string;
    status: string;
    order_id: string;
    invoice_id: string | null;
    international: boolean;
    method: string;
    amount_refunded: number;
    refund_status: string | null;
    captured: boolean;
    description: string;
    card_id: string | null;
    bank: string | null;
    wallet: string | null;
    vpa: string;
    email: string;
    contact: string;
    notes: Notes;
    fee: number;
    tax: number;
    error_code: string | null;
    error_description: string | null;
    error_source: string | null;
    error_step: string | null;
    error_reason: string | null;
    acquirer_data: unknown;
    created_at: number;
    upi: unknown;
}

export function isRazorpayPaymentDetails(obj: unknown): obj is RazorpayPaymentDetails {
    if (typeof obj !== "object" || obj === null) {
        return false;
    }
    const requiredKeys = ["id", "amount", "currency", "status", "order_id", "invoice_id", "captured", "method"];
    return requiredKeys.every(key => key in obj);
}