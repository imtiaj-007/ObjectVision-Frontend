/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useCallback, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { AppDispatch, RootState } from "@/store/store"
import { createOrder, verifyPayment } from "@/store/features/payment/paymentThunk";
import { toast } from "@/hooks/use-toast";
import useUser from "@/hooks/use-user";
import { settings } from "@/configuration/config";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlanType } from "@/types/subscription";
import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import LoadingScreen from "@/components/ui/screen_loader";

import { Check } from "lucide-react";
import { PaymentResult, RazorpayOptions } from "@/types/payment";
import { isCustomError } from "@/types/general";
import { formatCurrency } from "@/utils/general";
import { CurrencyEnum } from "@/types/enums";


interface RazorpayCheckoutProps {
    planDetails: PlanType,
}

const RazorpayCheckout: React.FC<RazorpayCheckoutProps> = ({ planDetails }) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { currentOrder, paymentResult, loading, error } = useSelector(
        (state: RootState) => state.payment
    );
    const [showPlanInfo, setShowPlanInfo] = useState<boolean>(true);
    const [promoCode, setPromoCode] = useState<string>();
    const [isApplying, setIsApplying] = useState(false);
    const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
    const { user_details } = useUser();

    const handlePromoApply = () => {
        if (!promoCode?.trim()) return;
        setIsApplying(true);

        setTimeout(() => {
            const isValid = promoCode.toLowerCase() === "discount90";
            if (isValid) {
                setAppliedPromo({ code: promoCode, discount: 90 });
            } else {
                setAppliedPromo(null);
            }
            setIsApplying(false);
        }, 500);
    };

    const finalAmount = useMemo(() => {
        let price = planDetails.amount;
        if (appliedPromo) {
            const discountAmount = (planDetails.amount * appliedPromo.discount) / 100;
            price = planDetails.amount - discountAmount;
        }
        return price;
    }, [planDetails.amount, appliedPromo]);

    const createOrderState = useCallback(() => {
        if (user_details?.user && !currentOrder) {
            dispatch(
                createOrder({
                    plan_id: planDetails.id,
                    amount: finalAmount,
                    currency: CurrencyEnum.INR,
                    customer_id: user_details.user.id,
                    receipt: `receipt_${Date.now()}`,
                    notes: {
                        title: planDetails.name,
                        description: planDetails.description
                    },
                    promo_code: promoCode
                })
            );
        }
    }, [user_details, planDetails, finalAmount, promoCode, dispatch, currentOrder]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (!user_details) {
            router.push('/auth/login?redirectURL=/pricing')
        }
    }, [user_details, router]);

    useEffect(() => {
        if (currentOrder) {
            setShowPlanInfo(false);
            setTimeout(() => {
                handlePayment();
            }, 1000);
        }
    }, [currentOrder]);

    useEffect(() => {
        if (paymentResult) {
            toast({
                variant: paymentResult.captured ? 'success' : 'destructive',
                title: `Transaction ${paymentResult.captured ? 'Completed' : 'Failed'}`,
                description: paymentResult.description
            });
            router.push('/auth/success?type=payment-success');
        }
    }, [paymentResult, router]);

    const handlePayment = () => {
        if (!currentOrder) return;
        if (!(window as any).Razorpay) {
            console.error('Razorpay script not loaded');
            return;
        }

        const options: RazorpayOptions = {
            key: settings.RAZORPAY_KEY as string,
            amount: finalAmount * 100,
            currency: "INR",
            name: "Object Vision",
            description: planDetails.name,
            image: "/object-vision-logo.png",
            order_id: currentOrder.razorpay_order_id,
            handler: (response: PaymentResult) => {
                dispatch(
                    verifyPayment({
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    })
                );
            },
            prefill: {
                name: user_details?.user?.name,
                email: user_details?.user?.email,
                contact: user_details?.user?.name,
            },
            theme: {
                color: "#3399cc",
            },
        };

        const razorpayInstance = new (window as any).Razorpay(options);
        razorpayInstance.open();
    };

    if (error.createOrder || error.verifyPayment) {
        toast({
            variant: "destructive",
            title: "Transaction Failed: ",
            description: isCustomError(error.createOrder)
                ? error.createOrder.message
                : isCustomError(error.verifyPayment)
                    ? error.verifyPayment.message
                    : "Payment Failed"
        });
    }

    return (
        <>
            {loading.createOrder && <LoadingScreen />}
            <Dialog open={showPlanInfo} onOpenChange={() => setShowPlanInfo(false)}>
                <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 text-gray-800/90 dark:text-gray-400">
                    <DialogHeader>
                        <DialogTitle>Plan Summary</DialogTitle>
                        <DialogDescription>
                            Review your plan details before proceeding
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Plan Summary */}
                        <div className="space-y-2">
                            <h3 className="font-medium text-lg">{planDetails.name}</h3>
                            <p className="text-sm text-muted-foreground">{planDetails.description}</p>
                        </div>

                        {/* Plan Amount */}
                        <div className="flex items-center justify-between border-y dark:border-gray-600 py-3">
                            <span className="font-medium">Plan Amount</span>
                            <span className="text-lg font-bold">{formatCurrency(planDetails.amount)}</span>
                        </div>

                        {/* Promo Code Section */}
                        <div className="space-y-3">
                            <Label htmlFor="promo-code">Promo Code</Label>
                            <div className="flex space-x-2">
                                <Input
                                    id="promo-code"
                                    placeholder="Enter promo code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    disabled={!!appliedPromo}
                                />
                                <Button
                                    className={`${appliedPromo ? 'bg-red-600/90' : 'bg-black/90'}`}
                                    onClick={appliedPromo ? () => setAppliedPromo(null) : handlePromoApply}
                                    disabled={isApplying || (!appliedPromo && !promoCode?.trim())}
                                >
                                    {appliedPromo ? "Remove" : "Apply"}
                                </Button>
                            </div>

                            {appliedPromo && (
                                <div className="flex items-center justify-center space-x-2 text-sm">
                                    <Badge variant="outline" className="bg-green-50 dark:bg-green-100 text-green-700 border-green-200">
                                        <Check className="mr-1 h-3 w-3" />
                                        {appliedPromo.discount}% OFF
                                    </Badge>
                                    <span className="text-muted-foreground">Code <strong>{appliedPromo.code}</strong> applied</span>
                                </div>
                            )}
                        </div>

                        {/* Final Amount (if promo applied) */}
                        {appliedPromo && (
                            <div className="flex items-center justify-between pt-2">
                                <span className="font-medium">Final Amount</span>
                                <div className="text-right">
                                    <span className="text-sm text-muted-foreground line-through mr-2">{formatCurrency(planDetails.amount)}</span>
                                    <span className="text-lg font-bold text-green-700 dark:text-green-600">{formatCurrency(finalAmount)}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPlanInfo(false)}>
                            Cancel
                        </Button>
                        <Button onClick={createOrderState}>
                            Proceed to Payment
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
};

export default RazorpayCheckout;