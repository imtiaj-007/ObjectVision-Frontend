import React from 'react';
import { motion } from 'framer-motion';

export type LoaderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LoaderType = 'spinner' | 'dots' | 'pulse' | 'bar';
export type LoaderColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'light' | 'dark';

interface LoaderProps {
    type?: LoaderType;
    size?: LoaderSize;
    color?: LoaderColor;
    fullScreen?: boolean;
    text?: string;
    className?: string;
}

const Loader: React.FC<LoaderProps> = ({
    type = 'spinner',
    size = 'md',
    color = 'primary',
    fullScreen = false,
    text,
    className = '',
}) => {
    // Size mappings
    const sizeMap = {
        xs: { container: 'h-4 w-4', text: 'text-xs' },
        sm: { container: 'h-6 w-6', text: 'text-sm' },
        md: { container: 'h-8 w-8', text: 'text-base' },
        lg: { container: 'h-12 w-12', text: 'text-lg' },
        xl: { container: 'h-16 w-16', text: 'text-xl' },
    };

    // Color mappings
    const colorMap = {
        primary: 'text-blue-600',
        secondary: 'text-purple-600',
        success: 'text-green-600',
        error: 'text-red-600',
        warning: 'text-yellow-600',
        info: 'text-cyan-600',
        light: 'text-gray-300',
        dark: 'text-gray-800',
    };

    // Spinner Loader
    const SpinnerLoader = () => (
        <motion.div
            className={`${sizeMap[size].container} border-4 rounded-full ${colorMap[color]} border-t-transparent`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
    );

    // Dots Loader
    const DotsLoader = () => {
        const dotVariants = {
            initial: { scale: 0.8, opacity: 0.4 },
            animate: { scale: 1, opacity: 1 }
        };

        const containerSize = sizeMap[size].container.split(' ')[0];
        const dotSize = {
            xs: 'h-1 w-1',
            sm: 'h-1.5 w-1.5',
            md: 'h-2 w-2',
            lg: 'h-3 w-3',
            xl: 'h-4 w-4',
        };

        return (
            <div className={`flex space-x-2 ${containerSize} items-center`}>
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className={`${dotSize[size]} rounded-full ${colorMap[color]}`}
                        initial="initial"
                        animate="animate"
                        variants={dotVariants}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: i * 0.2
                        }}
                    />
                ))}
            </div>
        );
    };

    // Pulse Loader
    const PulseLoader = () => (
        <motion.div
            className={`${sizeMap[size].container} rounded-full ${colorMap[color]} bg-current`}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );

    // Bar Loader
    const BarLoader = () => {
        const barHeight = {
            xs: 'h-1',
            sm: 'h-1.5',
            md: 'h-2',
            lg: 'h-3',
            xl: 'h-4',
        };

        const barWidth = {
            xs: 'w-16',
            sm: 'w-20',
            md: 'w-24',
            lg: 'w-32',
            xl: 'w-40',
        };

        return (
            <div className={`${barWidth[size]} bg-gray-200 rounded-full overflow-hidden`}>
                <motion.div
                    className={`${barHeight[size]} ${colorMap[color]} bg-current`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        );
    };

    // Choose the appropriate loader based on type
    const LoaderComponent = () => {
        switch (type) {
            case 'dots':
                return <DotsLoader />;
            case 'pulse':
                return <PulseLoader />;
            case 'bar':
                return <BarLoader />;
            case 'spinner':
            default:
                return <SpinnerLoader />;
        }
    };

    // Container classes
    const containerClasses = fullScreen
        ? 'fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-80'
        : 'flex items-center justify-center';

    return (
        <div className={`${containerClasses} ${className}`}>
            <div className="flex flex-col items-center gap-3">
                <LoaderComponent />
                {text && <p className={`${sizeMap[size].text} ${colorMap[color]}`}>{text}</p>}
            </div>
        </div>
    );
};

export default Loader;