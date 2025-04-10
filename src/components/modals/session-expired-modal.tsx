import React, { useEffect, useState } from 'react';
import {
    AlertDialog, AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Clock, LogIn, Home, Timer } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const SessionExpiredModal = () => {
    const [open, setOpen] = useState<boolean>(true);
    const [countDown, setCountDown] = useState<number>(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountDown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setOpen(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="max-w-md bg-white/95 border-2 border-red-100 shadow-xl">
                <AlertDialogHeader>
                    <div className="flex items-center justify-center mb-2">
                        <div className="bg-red-50 p-3 rounded-full">
                            <Clock className="h-8 w-8 text-red-500" />
                        </div>
                    </div>
                    <AlertDialogTitle className="text-xl text-center text-red-600">
                        Session Expired
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-gray-700 mt-2">
                        Please log in again to continue where you left off.

                        <span className="flex items-center justify-center font-semibold gap-2 mt-8 mb-4">
                            <Timer className="w-4 h-4" />
                            Redirecting to Login page in {countDown} seconds
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="my-4 border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-500 mb-2 text-center">
                        Any unsaved changes might have been lost.
                    </p>
                </div>

                <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Link href='/' >
                        <Button>
                            <Home className="h-4 w-4" />
                            <span>Go to Home</span>
                        </Button>
                    </Link>
                    <Link href='/auth/login' >
                        <Button variant={'destructive'}>
                            <LogIn className="h-4 w-4" />
                            <span>Log In Again</span>
                        </Button>
                    </Link>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SessionExpiredModal;