import Image from 'next/image';
import React from 'react';

export interface ImageInfoProps {
    preview: string | null;
    name: string;
    size: string;
    dimensions: string;
    type: string;
    uploadedAt: string;
    model: string;
    services: string[];
}

const ImageInfo: React.FC<ImageInfoProps> = ({
    preview, name, size, dimensions,
    type, uploadedAt, model, services
}) => {
    if (!preview) return null;

    return (
        <div className="mb-6 border-b pb-6">
            <h2 className="text-2xl font-bold mb-4">Image Information</h2>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                            src={preview}
                            alt="Image preview"
                            width={0}
                            height={0}
                            className="w-full max-h-60 object-contain"
                            style={{ maxHeight: '200px' }}
                        />
                    </div>
                </div>
                <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm">
                    {/* Column 1: File Information */}
                    <div>
                        <p className="font-semibold text-gray-500">File Name</p>
                        <p className="truncate">{name}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-500">Dimensions</p>
                        <p>{dimensions}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-500">File Size</p>
                        <p>{size}</p>
                    </div>

                    {/* Column 2: More File Information */}
                    <div>
                        <p className="font-semibold text-gray-500">File Type</p>
                        <p>{type}</p>
                    </div>                    
                    <div>
                        <p className="font-semibold text-gray-500">Model</p>
                        <p>{model}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-500">Uploaded At</p>
                        <p>{uploadedAt}</p>
                    </div>

                    {/* Column 3: Services */}
                    <div className="col-span-2 md:col-span-3">
                        <p className="text-sm font-semibold text-gray-500">Services</p>
                        <div className="flex gap-2 mt-1">
                            {services.length > 0 ? (
                                services.map((service, index) => (
                                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                        {service}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400">None specified</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageInfo;