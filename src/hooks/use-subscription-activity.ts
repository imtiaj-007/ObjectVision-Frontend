import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getUserActivities, getUserPlans, getActiveUserPlans } from "@/store/features/subscription_activity/subscriptionActivityThunk";
import { clearErrors } from "@/store/features/subscription_activity/subscriptionActivitySlice";

export const useSubscriptionActivity = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { plansList, activePlans, userActivity, loading, error } = useSelector((state: RootState) => state.subscriptionActivity);

    // Function to fetch plansList
    const fetchPlansList = () => {
        if (!plansList || plansList.length === 0) {
            dispatch(getUserPlans());
        }
    };

    // Function to fetch activePlans
    const fetchActivePlans = () => {
        if (!activePlans || activePlans.length === 0) {
            dispatch(getActiveUserPlans(true));
        }
    };

    // Function to fetch userActivities
    const fetchUserActivities = () => {
        dispatch(getUserActivities());
    };

    // Function to reset errors
    const resetError = () => {
        dispatch(clearErrors());
    };

    return {
        plansList,
        activePlans,
        userActivity,
        loading,
        error,
        fetchPlansList,
        fetchActivePlans,
        fetchUserActivities,
        resetError,
    };
};