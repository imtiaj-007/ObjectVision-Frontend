'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';


const AnimatedErrorMessage: React.FC = () => {
    const handleRefresh = () => {
        window.location.reload();
    };

    // Animation variants for the icon - properly typed now
    const iconVariants = {
        initial: {
            scale: 0.8,
            opacity: 1
        },
        animate: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 1.5,
                type: 'spring',
                stiffness: 100
            }
        },
        hover: {
            rotate: [0, -10, 10, -10, 0],
            transition: {
                duration: 0.5
            }
        }
    };

    // Container variants
    const containerVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    // Child element variants
    const itemVariants = {
        initial: { opacity: 0, y: 10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    // Button variants
    const buttonVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.05,
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.98,
            transition: { duration: 0.1 }
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center p-8 max-w-md mx-auto text-center"
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            <motion.div
                className="mb-6"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                animate={{
                    scale: [1, 1.1, 1],
                    transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }
                }}
            >
                <AlertTriangle
                    size={64}
                    className="text-red-500 mx-auto mb-2"
                />
            </motion.div>

            <motion.h2
                className="text-2xl font-bold text-gray-800 mb-4"
                variants={itemVariants}
            >
                Oops! Something went wrong
            </motion.h2>

            <motion.p
                className="text-gray-600 mb-6"
                variants={itemVariants}
            >
                We&apos;re having trouble loading the content at the moment.
                This could be due to a temporary server issue or network connection problem.
            </motion.p>

            <motion.div
                className="space-y-4 w-full"
                variants={itemVariants}
            >
                <motion.button
                    onClick={handleRefresh}
                    className="flex items-center justify-center w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition gap-2"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <motion.div
                        animate={{
                            rotate: 360
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <RefreshCw size={18} />
                    </motion.div>
                    Refresh Page
                </motion.button>

                <motion.div
                    className="text-sm text-gray-500"
                    variants={itemVariants}
                >
                    If the problem persists, please try again later or contact support.
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default AnimatedErrorMessage;