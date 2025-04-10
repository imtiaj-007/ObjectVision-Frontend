import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import {
    setStep, setUserName, setPhoneNumber, setCountries, setSelectedCountry,
    setAddress, setLoading, setError, setCountrySelectOpen,
    setSearchQuery, resetUserInfo, setUserNames
} from '@/store/features/user/userInfoSlice';
import { usernameSchema, phoneNumberSchema } from '@/schemas/user-info';
import { Address, Country, CustomError, PhoneNumber } from '@/types/general';
import { ZodError, ZodSchema } from 'zod';
import { UserInfoData } from '@/types/user';
import { getAllUsernames, getUserProfile, submitNewUserInfo } from '@/store/features/user/userThunk';


export const useUserInfo = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userInfo = useSelector((state: RootState) => state.userInfo);

    // Generic validation function
    const validateField = useCallback(async (schema: ZodSchema, value: unknown) => {
        try {
            await schema.parseAsync(value);
            return true;
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessage = error.issues.map(issue => issue.message).join(", ");
                dispatch(setError(errorMessage));
            } else {
                dispatch(setError('Invalid input'));
            }
            return false;
        }
    }, [dispatch]);

    // Handles next button on each step with validation checks
    const handleNext = useCallback(async () => {
        let isValid = false;

        if (userInfo.step === 1) {
            const trimmedUserName = userInfo.userName.trim();
            isValid = await validateField(usernameSchema, trimmedUserName);

            const isAvailable = !userInfo.userNames.includes(trimmedUserName);
            if (!isAvailable) {
                dispatch(setError("This user_name is already taken, please try another one."));
                isValid = false;
            }
        } else if (userInfo.step === 2) {
            isValid = true;
            if (userInfo.selectedCountry) {
                dispatch(setAddress({
                    ...userInfo.address,
                    country: userInfo.selectedCountry.name.common,
                    country_code: userInfo.selectedCountry.cca2
                }));
            }
        } else if (userInfo.step === 3) {
            isValid = await validateField(phoneNumberSchema, userInfo.phoneNumber.phone_number);

            if (userInfo.selectedCountry) {
                const cn_code = `${userInfo.selectedCountry.idd.root ?? ""}${userInfo.selectedCountry.idd.suffixes?.[0] ?? ""}`;

                dispatch(setPhoneNumber({
                    ...userInfo.phoneNumber,
                    country_code: cn_code
                }));
            }
        }

        if (isValid) {
            dispatch(setStep(userInfo.step + 1));
        }
    }, [userInfo, validateField, dispatch]);

    const handleBack = useCallback(() => {
        if (userInfo.step > 1) {
            dispatch(setStep(userInfo.step - 1));
        }
    }, [dispatch, userInfo.step]);

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
        handleNext,
        handleBack,
        submitForm,
        getUsernames,
        setUserName: (userName: string) => dispatch(setUserName(userName)),
        setUserNames: (userNames: Array<string>) => dispatch(setUserNames(userNames)),
        setPhoneNumber: (phoneNumber: Partial<PhoneNumber>) => dispatch(setPhoneNumber(phoneNumber)),
        setCountries: (countries: Country[]) => dispatch(setCountries(countries)),
        setSelectedCountry: (country: Country) => dispatch(setSelectedCountry(country)),
        setAddress: (address: Partial<Address>) => dispatch(setAddress(address)),
        setLoading: (loading: boolean) => dispatch(setLoading(loading)),
        setError: (error: CustomError | string | null) => dispatch(setError(error)),
        setCountrySelectOpen: (open: boolean) => dispatch(setCountrySelectOpen(open)),
        setSearchQuery: (query: string) => dispatch(setSearchQuery(query)),
        resetUserInfo: () => dispatch(resetUserInfo()),
    }), [userInfo, handleNext, handleBack, submitForm, getUsernames, dispatch]);
};