'use client';

import { useAuth } from '@/hooks/use-auth';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { getUserProfile } from '@/store/features/user/userThunk';
import useUser from '@/hooks/use-user';
import UserInfoModal from './modals/user-info-modal';


export default function ProtectedClient({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const { user_details, loading: userLoader } = useUser();
    const dispatch = useDispatch<AppDispatch>();
    const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);

    useEffect(() => {
        if (!isAuthenticated) {
            redirect('/auth/login');
        }
        else if (!user_details) {
            dispatch(getUserProfile());
        }
        else if (!user_details?.user?.username) {
            setShowUserInfoModal(true);
        }        
    }, [isAuthenticated, dispatch, user_details]);

    return (
        <>
            {children}
            {!userLoader && showUserInfoModal &&
                <UserInfoModal
                    open={showUserInfoModal}
                    onClose={() => setShowUserInfoModal(false)}
                />
            }
        </>
    );
}
