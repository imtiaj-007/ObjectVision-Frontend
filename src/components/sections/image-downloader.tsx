import React, { useCallback, useState } from "react";
import { DownloadImageFormatEnum, FileTypeEnum } from "@/types/enums";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { isCustomError } from "@/types/general";
import { FileService } from "@/services/file_service";

export interface ImageDownloaderProps {
    outputPath: string;
    imageURL: string | null;
}

const ImageDownloader: React.FC<ImageDownloaderProps> = ({ outputPath, imageURL }) => {
    const [downloadFormat, setDownloadFormat] = useState<DownloadImageFormatEnum>(DownloadImageFormatEnum.WEBP);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFormatChange = (value: string) => {
        setDownloadFormat(value as DownloadImageFormatEnum);
    };

    const handleDownload = useCallback(async () => {
        setLoading(true);
        try {
            const req_url = outputPath + `?file_type=${FileTypeEnum.IMAGE}` + `&file_extension=${downloadFormat}`;
            const blob = await FileService.downloadFile(req_url);

            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(blob);
            const filename = `${outputPath.split("/").pop()?.split(".")[0]}.${downloadFormat.toLowerCase()}`;

            // Create download link and trigger it
            const ele = document.createElement('a');
            ele.href = url;
            ele.download = filename;
            document.body.appendChild(ele);
            ele.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(ele);

        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Server Error: ",
                description: isCustomError(error) ? error.message : "Failed to Download Image."
            });
        } finally {
            setLoading(false);
        }
    }, [downloadFormat, outputPath]);

    return (
        <div className="mt-0 border-t flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
                <label htmlFor="format" className="hidden md:inline-block text-sm font-medium">
                    Download format:
                </label>
                <Select value={downloadFormat} onValueChange={handleFormatChange}>
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={DownloadImageFormatEnum.PNG}>PNG</SelectItem>
                        <SelectItem value={DownloadImageFormatEnum.JPG}>JPG</SelectItem>
                        <SelectItem value={DownloadImageFormatEnum.JPEG}>JPEG</SelectItem>
                        <SelectItem value={DownloadImageFormatEnum.WEBP}>WEBP</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button onClick={handleDownload} disabled={!imageURL || loading}>
                {loading ? "Downloading..." : "Download Result"}
            </Button>
        </div>
    );
};

export default ImageDownloader;