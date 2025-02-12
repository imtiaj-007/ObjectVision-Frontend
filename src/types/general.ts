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