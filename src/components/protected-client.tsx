'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import UserInfoModal from './modals/user-info-modal';
import useUser from '@/hooks/use-user';
import { useAuth } from '@/hooks/use-auth';
import { useSubscriptionActivity } from '@/hooks/use-subscription-activity';
import { storage } from '@/utils/storage';
import { UserProfileDetails } from '@/types/user';
import { AuthToken } from '@/types/auth';


export default function ProtectedClient({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, setAuth } = useAuth();
    const { setUserProfile, user_details, fetchUserProfile, loading } = useUser();
    const { fetchPlansList, fetchActivePlans, fetchUserActivities } = useSubscriptionActivity();
    const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);


    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token: AuthToken | null = storage.getToken();
                const user: UserProfileDetails | null = storage.get('user_details');

                if (!token) {
                    router.push('/auth/error?type=unauthorized');
                    return;
                }
                setAuth(true);

                if (!user) {
                    await fetchUserProfile();
                } else if (!user_details) {
                    setUserProfile(user);
                } else if (!user_details?.user?.username) {
                    setShowUserInfoModal(true);
                }
            } catch (error) {
                console.error("Authentication initialization error:", error);
                router.push('/auth/error?type=unauthorized');
            }
        };

        initializeAuth();
    }, [router, user_details]);

    useEffect(() => {
        if (isAuthenticated && !loading) {
            const fetchSubscriptionData = async () => {
                try {
                    await Promise.all([
                        fetchPlansList(),
                        fetchActivePlans(),
                        fetchUserActivities()
                    ]);
                } catch (error) {
                    console.error("Failed to fetch subscription data:", error);
                }
            };

            fetchSubscriptionData();
        }
    }, [isAuthenticated, loading, pathname]);

    return (
        <>
            {children}
            {!loading && showUserInfoModal &&
                <UserInfoModal
                    open={showUserInfoModal}
                    onClose={() => setShowUserInfoModal(false)}
                />
            }
        </>
    );
}
