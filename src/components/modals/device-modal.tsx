import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Laptop2, Shield } from "lucide-react";


const DeviceLoginModal = ({ isOpen, onClose, onProceed }) => {
    const getDeviceType = () => {
        const userAgent = navigator.userAgent;

        if (/Mobi|Android/i.test(userAgent)) {
            return "Mobile";
        } else if (/Tablet|iPad/i.test(userAgent)) {
            return "Tablet";
        } else
            return "Desktop";
    }

    const deviceInfo = {
        browser: navigator.userAgent.match(/(firefox|chrome|safari|opera|edge)/i)?.[0] || 'Unknown Browser',
        deviceType: getDeviceType()
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-blue-500" />
                        <AlertDialogTitle>New Device Detected</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="space-y-4">
                        <span className="block bg-slate-50 p-4 rounded-lg space-y-3">
                            <span className="inline-flex items-center gap-2">
                                <Laptop2 className="h-5 w-5 text-slate-600" />
                                <span className="font-medium text-slate-900">Current Device</span>
                            </span>
                            <span className="block text-sm space-y-1 text-slate-600 ml-7">
                                <span className="block">Device: {deviceInfo.deviceType}</span>
                                <span className="block">Browser: {deviceInfo.browser}</span>
                            </span>
                        </span>

                        <span className="block text-slate-600">
                            We&apos;ve noticed you&apos;re trying to log in from a new device.
                            Please confirm if you want to proceed with this device.
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="border-slate-200 text-slate-700 hover:bg-slate-100"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-blue-600 text-white hover:bg-blue-700"
                        onClick={onProceed}
                    >
                        Proceed with Login
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeviceLoginModal;