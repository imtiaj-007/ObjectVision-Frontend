import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { AppDispatch, RootState } from "@/store/store";
import { clearErrors, setImageFormData, setImageHistory } from "@/store/features/detection/detectionSlice";
import { processImage } from "@/store/features/detection/detectionThunk";
import { ResultsStateResponse } from "@/types/predictions";
import { FormInformation } from "@/types/detection";


export const useDetection = () => {
    const dispatch = useDispatch<AppDispatch>();
    const detectionStates = useSelector((state: RootState) => state.detection);

    const storeImageFormData = useCallback((data: FormInformation) => {
        dispatch(setImageFormData(data));
    }, [dispatch]);

    const performImageDetection = useCallback(async (data: FormData) => {
        await dispatch(processImage(data));
    }, [dispatch]);

    const pushToImageHistory = useCallback((data: ResultsStateResponse) => {
        dispatch(setImageHistory(data));
    }, [dispatch]);

    const resetErrors = useCallback(() => {
        dispatch(clearErrors());
    }, [dispatch]);
    

    return useMemo(() => ({
        ...detectionStates,
        storeImageFormData,
        performImageDetection,
        pushToImageHistory,
        resetErrors,
    }), [detectionStates, performImageDetection, pushToImageHistory, resetErrors, storeImageFormData]);
};
