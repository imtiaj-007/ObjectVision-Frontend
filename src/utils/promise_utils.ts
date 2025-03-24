export interface RetryOptions {
    maxRetries?: number;
    delayMs?: number;
    retryCondition?: (error: any) => boolean;
    onRetry?: (attempt: number, error: any) => void;
}

/**
 * Retries a promise-returning function with configurable delay and conditions
 * 
 * @param promiseFn Function that returns a promise to retry
 * @param options Retry configuration options
 * @returns Promise that resolves with the result or rejects after all retries
 */
export const retryPromise = async <T>(
    promiseFn: () => Promise<T>,
    options: RetryOptions = {}
): Promise<T> => {
    const {
        maxRetries = 3,
        delayMs = 10000,
        retryCondition = () => true,
        onRetry = () => { }
    } = options;

    let attempt = 0;

    const execute = async (): Promise<T> => {
        try {
            return await promiseFn();
        } catch (error) {
            attempt++;

            // Check if we should retry based on error and attempt count
            if (attempt <= maxRetries && retryCondition(error)) {
                onRetry(attempt, error);
                await new Promise(resolve => setTimeout(resolve, delayMs));

                return execute();
            }
            throw error;
        }
    };

    return execute();
};

/**
 * Retries multiple promises with the same retry configuration
 * 
 * @param promiseFns Array of functions that return promises
 * @param options Retry configuration options
 * @returns Promise that resolves with an array of results
 */
export const retryPromiseAll = async <T>(
    promiseFns: Array<() => Promise<T>>,
    options: RetryOptions = {}
): Promise<T[]> => {
    const retryPromises = promiseFns.map(fn => retryPromise(fn, options));
    return Promise.all(retryPromises);
};

/**
 * Retry helper specifically for API requests with common HTTP error handling
 * 
 * @param promiseFn Function that returns a promise for an API request
 * @param options Retry configuration options
 * @returns Promise with the API response
 */
export const retryApiRequest = async <T>(
    promiseFn: () => Promise<T>,
    options: RetryOptions = {}
): Promise<T> => {
    // Default retry condition for API requests - retry on network errors and 5xx status codes
    const defaultApiRetryCondition = (error: any) => {
        if (error?.name === 'NetworkError') return true;
        if (error?.request && !error?.response) return true;

        const status = error?.response?.status;
        // Retry on server errors (5xx) and 429 (too many requests)
        return status >= 500 || status === 429 || status === 404; // Added 404 for your specific case
    };

    return retryPromise(promiseFn, {
        maxRetries: 3,
        delayMs: 5000,
        retryCondition: defaultApiRetryCondition,
        onRetry: (attempt, error) => {
            const status = error?.response?.status;
            console.log(`API request retry ${attempt}: ${status || 'Network error'}`);
        },
        ...options
    });
};

/**
 * Maps an array of items to promise functions and retries them in parallel
 * with tracking for each item
 * 
 * @param items Array of items to process
 * @param mapFn Function that maps each item to a promise-returning function
 * @param options Retry configuration options
 * @returns Promise with array of results in same order as items
 */
export const retryPromiseMap = async <T, R>(
    items: T[],
    mapFn: (item: T, index: number) => Promise<R>,
    options: RetryOptions = {}
): Promise<R[]> => {
    // Convert each item to a function that returns a promise
    const promiseFns = items.map((item, index) => {
        return () => mapFn(item, index);
    });

    return retryPromiseAll(promiseFns, options);
};

/**
 * Creates a batched version of retryPromiseMap that processes items in chunks
 * 
 * @param items Array of items to process
 * @param mapFn Function that maps each item to a promise-returning function
 * @param batchSize Number of items to process in parallel
 * @param options Retry configuration options
 * @returns Promise with array of results in same order as items
 */
export const retryPromiseBatch = async <T, R>(
    items: T[],
    mapFn: (item: T, index: number) => Promise<R>,
    batchSize: number = 5,
    options: RetryOptions = {}
): Promise<R[]> => {
    const results: R[] = [];

    // Process items in batches
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchPromiseFns = batch.map((item, batchIndex) => {
            const originalIndex = i + batchIndex;
            return () => mapFn(item, originalIndex);
        });

        const batchResults = await retryPromiseAll(batchPromiseFns, options);
        results.push(...batchResults);
    }

    return results;
};