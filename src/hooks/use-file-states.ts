import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { AppDispatch, RootState } from "@/store/store";
import { clearErrors, setFileURLs } from "@/store/features/files/fileSlice";
import { getCloudPresignedURL, getLocalPresignedURL } from "@/store/features/files/fileThunk";


export const useFileStates = () => {
    const dispatch = useDispatch<AppDispatch>();
    const fileStates = useSelector((state: RootState) => state.files);

    const fetchLocalURL = useCallback(async (outputPath: string) => {
        const pathAvailable = !!fileStates.presignedURLs[outputPath];
        if (!pathAvailable)
            await dispatch(getLocalPresignedURL({
                file_path: outputPath,
                expiry_minutes: 60
            }));
    }, [dispatch, fileStates.presignedURLs]);

    const fetchCloudURL = useCallback(async (outputPath: string) => {
        const pathAvailable = !!fileStates.presignedURLs[outputPath];
        if (!pathAvailable)
            await dispatch(getCloudPresignedURL({
                file_path: outputPath,
                expiry_minutes: 60
            }));
    }, [dispatch, fileStates.presignedURLs]);

    const generatePresignedURL = useCallback(async (
        outputPath?: string, outputPaths?: string[], cloudURL: boolean = true
    ) => {
        if (outputPath) {
            if (cloudURL) fetchCloudURL(outputPath);
            else fetchLocalURL(outputPath);

        } else if (outputPaths && outputPaths?.length > 0) {
            await Promise.allSettled(
                outputPaths.map(path => {
                    if (cloudURL) return fetchCloudURL(path);
                    else return fetchLocalURL(path);
                })
            )
        }
    }, [fetchCloudURL, fetchLocalURL]);

    const storeFileURLs = useCallback((data: string[]) => {
        dispatch(setFileURLs(data));
    }, [dispatch]);

    const resetErrors = useCallback(() => {
        dispatch(clearErrors());
    }, [dispatch]);


    return useMemo(() => ({
        ...fileStates,
        generatePresignedURL,
        storeFileURLs,
        resetErrors,
    }), [fileStates, generatePresignedURL, storeFileURLs, resetErrors]);
};
