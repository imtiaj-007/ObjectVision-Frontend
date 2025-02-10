import { config } from "@/configuration/config";
import bcrypt from "bcryptjs"


const SECRET_KEY = config.SECRET_KEY;

/**
 * Generates a secure bcrypt hash for the provided input string.
 * 
 * This function uses bcrypt with a salt factor of 10 to create a cryptographic hash. 
 * The resulting hash is **one-way encrypted**, meaning it **cannot be reversed** to obtain the original input. 
 * It is typically used for securely storing sensitive data like passwords.
 * 
 * @param input - The plain text string that needs to be hashed (e.g., a password).
 * @returns A hashed string generated using bcrypt and a randomly generated salt.
 * 
 * @remarks
 * - The hash cannot be decoded back to its original form.
 * - Use `bcrypt.compare()` to verify if an input matches the hashed value.
 * 
 * @example
 * ```typescript
 * const password = "mySecurePassword123";
 * const hashedPassword = generateBcryptHash(password);
 * console.log(hashedPassword); // $2b$10$EixZaYVK1fsbw1ZfbX3OXe.PvX8xH3QXoV8Y1rzQHFu3bRt2tUty
 * 
 * // To compare the password later
 * const isMatch = bcrypt.compareSync(password, hashedPassword); // true
 * ```
 */
export const generateBcryptHash = (input: string): string => {
    const salt: string = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(input, salt);
};

export const verifyBcryptHash = (input: string, hashed: string): boolean => {
    return bcrypt.compareSync(input, hashed);
};


// Hashed data using Base64 [Can be decoded later]
export const base64Hash = (input: string): string => {
    const secure_input = input + SECRET_KEY;
    return Buffer.from(secure_input, 'utf-8').toString('base64');
};

export const base64Decode = (encoded: string): string | null => {
    try {
        const decoded = Buffer.from(encoded, 'base64').toString('utf-8');

        if (SECRET_KEY && decoded.endsWith(SECRET_KEY)) {
            return decoded.replace(SECRET_KEY, '');
        } else {
            console.error("Decoding failed: Invalid secret key.");
            return null;
        }
    } catch (error) {
        console.error("Base64 decoding error:", error);
        return null;
    }
};