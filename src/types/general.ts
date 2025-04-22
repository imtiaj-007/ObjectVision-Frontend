import { ContactTypeEnum, WebSocketMessageTypeEnum } from "./enums";
import { RazorpayPaymentDetails } from "./payment";
import { ResultsState } from "./predictions";


export interface AppSettings {
    ENV: string;
    DEFAULT_PAGE: number;
    DEFAULT_PAGE_LIMIT: number;
    MAX_RECONNECT_ATTEMPTS: number;
    RECONNECT_DELAY: number;
    API_KEY: string;
    SECRET_KEY: string;
    FRONTEND_URL: string;
    LOGO_URL: string;
    BACKEND_URL: string;
    API_BASE_URL: string;
    GOOGLE_OAUTH_URL: string;
    GOOGLE_TAG: string;
    GOOGLE_VERIFICATION_CODE: string;
    RAZORPAY_KEY: string;
    EMAIL_SERVICE_ID: string;
    EMAIL_PUBLIC_KEY: string;
    EMAIL_TEMPLATE_ID: string;
}


export interface SuccessResponse {
    message: string | undefined;
    status?: number;
    extra_data?: RazorpayPaymentDetails | Record<string, unknown> | null;
}

export interface WebSocketMessage {
    type: WebSocketMessageTypeEnum;
    taskId: string;
    progress?: number;
    data?: ResultsState;
    service?: string;
    message?: string;
}

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

export interface Address {
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state_province: string;
    postal_code: string;
    country: string;
    country_code: string;
    latitude?: string | null;
    longitude?: string | null;
    type: ContactTypeEnum;
}

export interface AddressUpdate {
    address_line_1: string;
    address_line_2?: string | undefined;
    latitude?: string | undefined | null;
    longitude?: string | undefined | null;
    type: ContactTypeEnum;
}

export interface AddressResponse {
    data: Address[]
    total_count: number | null
}

export interface AddressState {
    addresses: Address[];
    totalCount: number;
    loading: boolean;
    error: CustomError | null;
    currentOperation: 'fetch' | 'create' | 'update' | 'delete' | null;
}

export interface PhoneNumber {
    phone_number: string;
    country_code: string;
    type: ContactTypeEnum;
    is_primary: boolean;
}

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


export const DemoAddress: Address = {
    address_line_1: '',
    address_line_2: undefined,
    city: '',
    state_province: '',
    postal_code: '',
    country: '',
    country_code: '',
    latitude: undefined,
    longitude: undefined,
    type: ContactTypeEnum.HOME
}

export const DemoPhoneNumber: PhoneNumber = {
    phone_number: '',
    country_code: '',
    type: ContactTypeEnum.HOME,
    is_primary: true
}