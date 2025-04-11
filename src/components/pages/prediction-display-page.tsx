'use client'
import React, { useEffect, useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ImageDetectionResult from '@/components/prediction/prediction-socket-page';
import ImageInfo, { ImageInfoProps } from '@/components/sections/image-info';
import { Card } from '@/components/ui/card';
import DetectionResultsDisplay from '@/components/prediction/detection_result';
import { settings } from '@/configuration/config';
import { useDetection } from '@/hooks/use-detection';
import { useFileStates } from '@/hooks/use-file-states';
import { formatFileSize } from '@/utils/file_utils';
import { formatDate } from '@/utils/general';


const PredictionDisplayPage: React.FC = () => {
    const path = usePathname();
    const searchParams = useSearchParams();
    const { queued_image, resetCache } = useDetection();
    const { presignedURLs } = useFileStates();
    const [clientId, setClientId] = useState<string | undefined>();
    const [imageInfo, setImageInfo] = useState<ImageInfoProps>({
        preview: null,
        name: "",
        size: "",
        dimensions: "",
        type: "",
        uploadedAt: "",
        model: '',
        services: []
    });

    const socketUrl = useMemo(() => {
        if (!searchParams || !path) return null;

        const createSocket = searchParams.get("socketConnection");
        const client_id = path.split("/").pop() || new Date().getTime().toString();

        if (clientId !== client_id) {
            setClientId(client_id);
        }

        if (createSocket === "true") {
            return `${settings.API_BASE_URL?.replace("http", "ws")}/ws/${client_id}`;
        }

        return null;
    }, [searchParams, path, clientId]);

    useEffect(() => {
        if (!socketUrl && queued_image) {
            const img_metadata = queued_image.image_metadata;
            const img_url = queued_image?.cloud_file_path ? presignedURLs[queued_image?.cloud_file_path]?.url : null;
            setImageInfo({
                preview: img_url,
                name: queued_image.filename || "",
                size: formatFileSize(img_metadata.file_size || 0) || "",
                dimensions: `${img_metadata.width} x ${img_metadata.height}` || "",
                type: img_metadata.mime_type || "",
                uploadedAt: formatDate(queued_image.uploaded_at) || "",
                model: "ov_model_s",
                services: queued_image.results ? Object.keys(queued_image.results).map(key => key.toLowerCase()) : []
            })
        }
    }, [socketUrl, queued_image, presignedURLs]);

    useEffect(()=> {
        return () => {
            if(clientId && socketUrl) {
                resetCache();
            }
        }
    }, [])


    if (clientId && socketUrl) {
        return (
            <ImageDetectionResult
                clientId={clientId}
                socketUrl={socketUrl}
                imageInfo={imageInfo}
                setImageInfo={setImageInfo}
            />
        )
    }

    return (
        <div className="space-y-6">
            {/* Image Info Component */}
            <Card className="grid grid-cols-1 p-6 rounded-lg shadow-md">
                <ImageInfo {...imageInfo} />
            </Card>
            {/* Results Section */}
            <DetectionResultsDisplay file_name={queued_image?.filename || ""} isPredictionData={true} />
        </div>
    )
}

export default PredictionDisplayPage;
