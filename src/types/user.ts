import { UserRoleEnum } from './enums';
import { Address, PhoneNumber } from './general';

// User Details 
export interface UserDetails {
    id: number;
    username: string;
    name: string;
    email: string;
    is_active: boolean;
    is_blocked: boolean;
    role: UserRoleEnum;
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

// Submit User Info Structure
export interface UserInfoData {
    username: string;
    phone_number: PhoneNumber;
    address: Address;
}
