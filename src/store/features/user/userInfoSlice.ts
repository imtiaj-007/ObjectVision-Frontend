import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country, CustomError, PhoneNumber, Address } from '@/types/general';
import { getAllUsernames, submitNewUserInfo } from './userThunk';
import { ContactTypeEnum } from '@/types/enums';


export interface UserInfoState {
    step: number;
    userName: string;
    userNames: Array<string>;
    phoneNumber: PhoneNumber;
    countries: Country[];
    selectedCountry: Country | null;
    address: Address | null;
    loading: boolean;
    error: CustomError | string | null;
    countrySelectOpen: boolean;
    searchQuery: string;
}


const initialState: UserInfoState = {
    step: 1,
    userName: '',
    userNames: [],
    phoneNumber: {
        phone_number: '',
        country_code: '',
        type: ContactTypeEnum.HOME,
        is_primary: true,
    },
    countries: [],
    selectedCountry: null,
    address: null,
    loading: false,
    error: null,
    countrySelectOpen: false,
    searchQuery: '',
};

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload;
            state.error = null;
        },
        setUserNames: (state, action: PayloadAction<Array<string>>) => {
            state.userNames = action.payload;
        },
        setPhoneNumber: (state, action: PayloadAction<Partial<PhoneNumber>>) => {
            state.phoneNumber = {
                phone_number: action.payload.phone_number ?? state.phoneNumber.phone_number,
                country_code: action.payload.country_code ?? state.phoneNumber.country_code,
                type: action.payload.type ?? state.phoneNumber.type,
                is_primary: action.payload.is_primary ?? state.phoneNumber.is_primary,
            };
            state.error = null;
        },
        setCountries: (state, action: PayloadAction<Country[]>) => {
            state.countries = action.payload;
        },
        setSelectedCountry: (state, action: PayloadAction<Country | null>) => {
            state.selectedCountry = action.payload;
        },
        setAddress: (state, action: PayloadAction<Partial<Address>>) => {
            state.address = { ...action.payload };
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<CustomError | string | null>) => {
            state.error = action.payload;
        },
        setCountrySelectOpen: (state, action: PayloadAction<boolean>) => {
            state.countrySelectOpen = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        resetUserInfo: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Submit new user info
            .addCase(submitNewUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitNewUserInfo.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(submitNewUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as CustomError;
            })

            // Get all user_names
            .addCase(getAllUsernames.pending, (state) => {
                state.error = null;
            })
            .addCase(getAllUsernames.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(getAllUsernames.rejected, (state, action) => {
                state.error = action.payload as CustomError;
            });
    },
});

export const {
    setStep,
    setUserName,
    setUserNames,
    setPhoneNumber,
    setCountries,
    setSelectedCountry,
    setAddress,
    setLoading,
    setError,
    setCountrySelectOpen,
    setSearchQuery,
    resetUserInfo,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;