import { AuthToken } from "@/types/auth";

class Storage {
    private static instance: Storage;

    private readonly accessKey = 'access_token';
    private readonly refreshKey = 'refresh_token';
    private readonly typeKey = 'token_type';

    private constructor() {}

    public static getInstance(): Storage {
        if (!Storage.instance) {
            Storage.instance = new Storage();
        }
        return Storage.instance;
    }

    private isAvailable(): boolean {
        if (typeof window === 'undefined') return false;

        try {
            const testKey = '__storage_test__';
            window.localStorage.setItem(testKey, testKey);
            window.localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            console.warn('LocalStorage is not available', e);
            return false;
        }
    }

    public set<T>(key: string, value: T): boolean {
        if (!this.isAvailable()) return false;

        try {
            const serialized = JSON.stringify(value);
            window.localStorage.setItem(key, serialized);
            return true;
        } catch (err) {
            console.error(`Failed to save "${key}"`, err);
            return false;
        }
    }

    public get<T>(key: string, defaultValue: T | null = null): T | null {
        if (!this.isAvailable()) return defaultValue;

        try {
            const raw = window.localStorage.getItem(key);
            if (raw === null) return defaultValue;
            return JSON.parse(raw) as T;
        } catch (err) {
            console.error(`Failed to parse "${key}"`, err);
            return defaultValue;
        }
    }

    public remove(key: string): boolean {
        if (!this.isAvailable()) return false;

        try {
            window.localStorage.removeItem(key);
            return true;
        } catch (err) {
            console.error(`Failed to remove "${key}"`, err);
            return false;
        }
    }

    public clear(): boolean {
        if (!this.isAvailable()) return false;

        try {
            window.localStorage.clear();
            return true;
        } catch (err) {
            console.error('Failed to clear storage', err);
            return false;
        }
    }

    public has(key: string): boolean {
        if (!this.isAvailable()) return false;
        return window.localStorage.getItem(key) !== null;
    }

    // -------------- Token Group Methods ----------------

    public setToken(token: AuthToken): boolean {
        const available = this.isAvailable();
        if (!available) return false;

        try {
            window.localStorage.setItem(this.accessKey, token.access_token);
            window.localStorage.setItem(this.refreshKey, token.refresh_token);
            window.localStorage.setItem(this.typeKey, token.token_type);
            return true;
        } catch (err) {
            console.error('Failed to set tokens', err);
            return false;
        }
    }

    public getToken(): AuthToken | null {
        if (!this.isAvailable()) return null;

        const access_token = window.localStorage.getItem(this.accessKey);
        const refresh_token = window.localStorage.getItem(this.refreshKey);
        const token_type = window.localStorage.getItem(this.typeKey);

        if (access_token && refresh_token && token_type) {
            return { access_token, refresh_token, token_type };
        }

        return null;
    }

    public clearToken(): boolean {
        const success1 = this.remove(this.accessKey);
        const success2 = this.remove(this.refreshKey);
        const success3 = this.remove(this.typeKey);
        return success1 && success2 && success3;
    }

    public isTokenAvailable(): boolean {
        return (
            this.has(this.accessKey) &&
            this.has(this.refreshKey) &&
            this.has(this.typeKey)
        );
    }
}

export const storage = Storage.getInstance();
