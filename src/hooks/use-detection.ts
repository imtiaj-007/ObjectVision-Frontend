import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { AppDispatch, RootState } from "@/store/store";
import { clearCache, clearErrors, clearImageQueue, setImageFormData, setQueuedImage } from "@/store/features/detection/detectionSlice";
import { getDetectionPredictions, processImage } from "@/store/features/detection/detectionThunk";
import { ResultsState } from "@/types/predictions";
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

    const addImagetoQueue = useCallback((data: ResultsState) => {
        dispatch(setQueuedImage(data));
    }, [dispatch]);

    const getPredictions = useCallback(async (
        params: {
            page: number;
            limit: number;
        }) => {
        await dispatch(getDetectionPredictions({ ...params, meta: params }));
    }, [dispatch]);

    const isPageCached = useCallback((key: string) => {
        return !!detectionStates.cachedPages[key];
    }, [detectionStates.cachedPages]);

    const resetImageQueue = useCallback(() => {
        dispatch(clearImageQueue());
    }, [dispatch]);

    const resetCache = useCallback(() => {
        dispatch(clearCache());
    }, [dispatch]);

    const resetErrors = useCallback(() => {
        dispatch(clearErrors());
    }, [dispatch]);


    return useMemo(() => ({
        ...detectionStates,
        storeImageFormData, performImageDetection, addImagetoQueue,
        getPredictions, isPageCached, resetImageQueue, resetCache, resetErrors,
    }), 
    [
        detectionStates, storeImageFormData, performImageDetection, addImagetoQueue,
        getPredictions, isPageCached, resetImageQueue, resetCache, resetErrors
    ]);
};
