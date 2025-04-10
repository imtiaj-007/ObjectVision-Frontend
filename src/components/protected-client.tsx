'use client';
import { useEffect, useState } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { getUserProfile } from '@/store/features/user/userThunk';
import UserInfoModal from './modals/user-info-modal';
import useUser from '@/hooks/use-user';
import { useAuth } from '@/hooks/use-auth';
import { useSubscriptionActivity } from '@/hooks/use-subscription-activity';
import SessionExpiredModal from './modals/session-expired-modal';


export default function ProtectedClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated } = useAuth();
    const { user_details, loading: userLoader } = useUser();
    const { fetchPlansList, fetchActivePlans, fetchUserActivities } = useSubscriptionActivity();
    const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);
    const [showSessionExpiredModal, setShowSessionExpiredModal] = useState<boolean>(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setShowSessionExpiredModal(true);
            setTimeout(()=> redirect('/auth/login'), 5000);
        }
        else if (!user_details) {
            dispatch(getUserProfile());
        }
        else if (!user_details?.user?.username) {
            setShowUserInfoModal(true);
        }
    }, [isAuthenticated, dispatch, user_details]);

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
