import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import {
    setUserName, setPhoneNumber, setCountries, setSelectedCountry,
    setAddress, setLoading, setError, setCountrySelectOpen,
    setSearchQuery, resetUserInfo, setUserNames
} from '@/store/features/user/userInfoSlice';
import { Address, Country, CustomError, PhoneNumber } from '@/types/general';
import { UserInfoData } from '@/types/user';
import { getAllUsernames, getUserProfile, submitNewUserInfo } from '@/store/features/user/userThunk';


export const useUserInfo = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userInfo = useSelector((state: RootState) => state.userInfo);

    const getUsernames = useCallback(async () => {
        try {
            const res = await dispatch(getAllUsernames()).unwrap();
            dispatch(setUserNames(res));
        } catch (error) {
            throw error;
        }
    }, [dispatch]);

    const submitForm = useCallback(async (data: UserInfoData) => {
        try {
            const result = await dispatch(submitNewUserInfo(data)).unwrap();
            dispatch(getUserProfile());
            return result;
        } catch (error) {
            throw error;
        }
    }, [dispatch]);


    return useMemo(() => ({
        ...userInfo,
        submitForm,
        getUsernames,
        setUserName: (userName: string) => dispatch(setUserName(userName)),
        setUserNames: (userNames: Array<string>) => dispatch(setUserNames(userNames)),
        setPhoneNumber: (phoneNumber: PhoneNumber) => dispatch(setPhoneNumber(phoneNumber)),
        setCountries: (countries: Country[]) => dispatch(setCountries(countries)),
        setSelectedCountry: (country: Country) => dispatch(setSelectedCountry(country)),
        setAddress: (address: Address) => dispatch(setAddress(address)),
        setLoading: (loading: boolean) => dispatch(setLoading(loading)),
        setError: (error: CustomError | string | null) => dispatch(setError(error)),
        setCountrySelectOpen: (open: boolean) => dispatch(setCountrySelectOpen(open)),
        setSearchQuery: (query: string) => dispatch(setSearchQuery(query)),
        resetUserInfo: () => dispatch(resetUserInfo()),
    }), [userInfo, submitForm, getUsernames, dispatch]);
};