/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { clearErrors, setUser } from '@/store/features/user/userSlice';
import { getUserProfile } from '@/store/features/user/userThunk';
import { UserDetails } from '@/types/user';
import { useMemo } from 'react';


const useUser = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);

    return useMemo(() => ({
        ...user,
        setUserProfile: (payload: UserDetails) => dispatch(setUser(payload)),
        fetchUserProfile: ()=> dispatch(getUserProfile()), 
        clearUserErrors: () => dispatch(clearErrors()),
    }), [user]);
};

export default useUser;
