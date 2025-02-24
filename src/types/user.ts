import { Address, Country, CustomError, PhoneNumber } from './general';

// User Details 
export interface UserDetails {
    username: string;
    name: string;
    email: string;
    is_active: boolean;
    is_blocked: boolean;
    role: number;
}

// User State for Internal Use
export interface UserState {
    loading: boolean;
    error: CustomError | string | null;
    user: UserDetails | null;
}

// User Profile
export interface UserProfileDetails {
    user: UserDetails | null;
    phone_numbers: Array<PhoneNumber> | null;
    addresses: Array<Address> | null;
}

// User Update Profile
export interface UserUpdateProfile {
    username: string;
    phone_number: PhoneNumber;
    address: Address;
}

// User Info state for Internal use
export interface UserInfoState {
    step: number;
    userName: string;
    userNames: Array<string>;
    phoneNumber: PhoneNumber;
    countries: Country[];
    selectedCountry: Country | null;
    address: Address;
    loading: boolean;
    error: CustomError | string | null;
    countrySelectOpen: boolean;
    searchQuery: string;
}

// Submit User Info Structure
export interface UserInfoData {
    username: string;
    phone_number: PhoneNumber;
    address: Address;
}
