import { ContactTypeEnum } from "./enums";
import { RazorpayPaymentDetails } from "./payment";


// General Success Response
export interface SuccessResponse {
    message: string | undefined;
    status?: number;
    extra_data?: RazorpayPaymentDetails | Record<string, unknown> | null;
}

// Address Structure
export interface Address {
    address_line_1: string;
    address_line_2?: string | undefined;
    city: string;
    state_province: string;
    postal_code: string;
    country: string;
    country_code: string;
    latitude?: string | undefined | null;
    longitude?: string | undefined | null;
    type: ContactTypeEnum;
}

// Update Address Structure
export interface AddressUpdate {
    address_line_1: string;
    address_line_2?: string | undefined;    
    latitude?: string | undefined | null;
    longitude?: string | undefined | null;
    type: ContactTypeEnum;
}

// Response structure of addresses
export interface AddressResponse {
    data: Address[]
    total_count: number | null
}

// Address State for Internal use
export interface AddressState {
    addresses: Address[];
    totalCount: number;
    loading: boolean;
    error: CustomError | null;
    currentOperation: 'fetch' | 'create' | 'update' | 'delete' | null;
}

// Phone Number Structure
export interface PhoneNumber {
    phone_number: string;
    country_code: string;
    type: ContactTypeEnum;
    is_primary: boolean;
}

// Custom Error interface
export interface CustomError {
    message: string | undefined;
    status_code: number;
}

export function isCustomError(error: unknown): error is CustomError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'status_code' in error &&
        'message' in error
    );
};

// Country data
export interface Country {
    name: {
        common: string;
        official: string;
    };
    cca2: string;
    cca3: string;
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    idd: {
        root: string;
        suffixes: string[];
    };
    region: string;
    subregion: string;
    languages: {
        [key: string]: string;
    };
    timezones: string[];
    continents: string[];
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    postalCode?: {
        format: string;
        regex: string;
    };
}
