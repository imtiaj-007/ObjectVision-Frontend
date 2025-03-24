import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { createOrder, getOrders, getOrdersOfUser } from "@/store/features/order/orderThunk";
import { PaymentOrderRequest } from "@/types/payment";
import { clearErrors } from "@/store/features/order/orderSlice";


export const useOrder = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        currentOrder,
        allOrders,
        userOrders,
        loading,
        error
    } = useSelector((state: RootState) => state.order);

    const placeOrder = async (orderData: PaymentOrderRequest) => {
        await dispatch(createOrder(orderData));
    };    

    const fetchUserOrders = async (user_id: number) => {
        await dispatch(getOrdersOfUser({ user_id }));
    };

    const fetchAllOrders = async () => {
        await dispatch(getOrders({}));
    }

    const resetErrors = () => {
        dispatch(clearErrors());
    };

    return {
        currentOrder,
        allOrders,
        userOrders,
        loading,
        error,
        fetchUserOrders,
        fetchAllOrders,
        placeOrder,
        resetErrors,
    };
};
