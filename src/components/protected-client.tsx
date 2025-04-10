'use client';
import { useEffect, useMemo, useState } from 'react';
import { redirect, usePathname } from 'next/navigation';
import UserInfoModal from './modals/user-info-modal';
import useUser from '@/hooks/use-user';
import { useAuth } from '@/hooks/use-auth';
import { useSubscriptionActivity } from '@/hooks/use-subscription-activity';
import SessionExpiredModal from './modals/session-expired-modal';


export default function ProtectedClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();
    const { user_details, fetchUserProfile, loading: userLoader } = useUser();
    const { fetchPlansList, fetchActivePlans, fetchUserActivities } = useSubscriptionActivity();
    const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);
    const [showSessionExpiredModal, setShowSessionExpiredModal] = useState<boolean>(false);

    const userAuthenticated = useMemo(()=> {
        const auth_token = localStorage.getItem("access_token");
        return auth_token && isAuthenticated;
    }, [isAuthenticated]);

    useEffect(() => {
        if (!userAuthenticated) {
            setShowSessionExpiredModal(true);
            setTimeout(()=> redirect('/auth/login'), 5000);
        }
        else if (!user_details || !user_details?.user) {
            fetchUserProfile();
        }
        else if (!user_details?.user?.username) {
            setShowUserInfoModal(true);
        }
    }, [fetchUserProfile, userAuthenticated, isAuthenticated, user_details]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchPlansList();
            fetchActivePlans();
            fetchUserActivities();
        };
    }, [pathname, isAuthenticated]);

    return (
        <>
            {children}
            {!userLoader && showUserInfoModal &&
                <UserInfoModal
                    open={showUserInfoModal}
                    onClose={() => setShowUserInfoModal(false)}
                />
            }
            {!isAuthenticated && showSessionExpiredModal &&
                <SessionExpiredModal />
            }
        </>
    );
}
