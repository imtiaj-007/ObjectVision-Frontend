'use client';

import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedClient({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            redirect('/login');
        }
    }, [isAuthenticated]);

    return <>{children}</>;
}
