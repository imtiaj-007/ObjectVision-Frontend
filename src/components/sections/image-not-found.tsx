import React from 'react';
import { IoMdImages } from "react-icons/io";

interface NotFoundImageProps {
    text?: string;
    backgroundColor?: string;
    textColor?: string;
    iconColor?: string;
    iconSize?: number;
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

const NotFoundImage: React.FC<NotFoundImageProps> = ({
    text = "Image Not Found",
    backgroundColor = "#f0f0f0",
    textColor = "#666666",
    iconColor = "#999999",
    iconSize = 48,
    className = "",
    style = {},
    onClick,
}) => {
    return (
        <div
            className={`flex w-full h-full rounded-lg ${className}`}
            style={{
                backgroundColor,
                ...style,
            }}
        >
            <div
                className="flex flex-col items-center justify-center m-auto"
                onClick={onClick}
            >
                <IoMdImages
                    size={iconSize}
                    color={iconColor}
                    style={{ marginBottom: '10px' }}
                />
                {text && (
                    <p
                        style={{
                            color: textColor,
                            fontSize: '14px',
                            textAlign: 'center',
                            padding: '0 10px'
                        }}
                    >
                        {text}
                    </p>
                )}
            </div>
        </div>
    );
};

export default NotFoundImage;