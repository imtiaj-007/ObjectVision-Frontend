import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store'; 
import { PlanType } from '@/types/subscription';
import { CustomError } from '@/types/general';
import { getSubscriptions } from '@/store/features/subscription/subscriptionThunk';
import { clearErrors } from '@/store/features/subscription/SubscriptionSlice';

interface UseSubscriptionResult {
    subscriptions: PlanType[] | null;
    loading: boolean;
    error: CustomError | string | null;
    fetchSubscriptions: () => Promise<void>;
    resetErrors: () => void;
}

/**
 * Custom hook for managing subscription data from Redux store
 * @param autoFetch - Whether to automatically fetch subscriptions on mount
 * @returns An object containing subscription data, loading state, error state, and utility functions
 */
export const useSubscription = (autoFetch: boolean = true): UseSubscriptionResult => {
    const dispatch = useDispatch<AppDispatch>();
    const { subscriptionList, loading, error } = useSelector(
        (state: RootState) => state.general
    );

    // Fetch subscriptions on mount if autoFetch is true and subscriptions state is empty
    useEffect(() => {
        if (autoFetch && !subscriptionList) {
            fetchSubscriptions();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoFetch, subscriptionList]);

    // Function to fetch subscriptions
    const fetchSubscriptions = async (): Promise<void> => {
        await dispatch(getSubscriptions());
    };

    // Function to clear any errors
    const resetErrors = (): void => {
        dispatch(clearErrors());
    };

    return {
        subscriptions: subscriptionList,
        loading,
        error,
        fetchSubscriptions,
        resetErrors,
    };
};

export default useSubscription;