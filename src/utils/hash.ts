import { settings } from "@/configuration/config";
import bcrypt from "bcryptjs"


const SECRET_KEY = settings.SECRET_KEY;

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


/**
 * Verifies whether a plain input string matches a previously hashed bcrypt string.
 * 
 * This function compares a plaintext string with a bcrypt hash to determine if they match.
 * 
 * @param input - The plain text value (e.g., a password) to be compared.
 * @param hashed - The bcrypt hash previously generated using the same input.
 * @returns `true` if the input matches the hashed value, otherwise `false`.
 * 
 * @example
 * ```ts
 * const password = "admin123";
 * const hash = generateBcryptHash(password);
 * const isValid = verifyBcryptHash(password, hash); // true
 * ```
 */
export const verifyBcryptHash = (input: string, hashed: string): boolean => {
    return bcrypt.compareSync(input, hashed);
};


/**
 * Encodes a string to Base64 after appending a secret key for extra security.
 * 
 * The function appends the configured `SECRET_KEY` to the input string, then encodes it in Base64.
 * Useful for encoding data that needs to be reversible (unlike bcrypt).
 * 
 * @param input - The original plain text string to encode.
 * @returns A Base64-encoded string that includes the appended secret key.
 * 
 * @remarks
 * - The encoded string **can** be decoded back to the original input using `base64Decode()`.
 * - This is not secure for passwords; use bcrypt instead for that purpose.
 * 
 * @example
 * ```ts
 * const encoded = base64Hash("myToken123");
 * console.log(encoded); // e.g., bXlUb2tlbjEyM1NlY3JldEtleQ==
 * ```
 */
export const base64Hash = (input: string): string => {
    const secure_input = input + SECRET_KEY;
    return Buffer.from(secure_input, 'utf-8').toString('base64');
};

/**
 * Decodes a Base64 string encoded with `base64Hash()` and verifies the secret key.
 * 
 * This function attempts to reverse the `base64Hash()` operation. It validates that the decoded string
 * ends with the `SECRET_KEY`, ensuring integrity, and then returns the original input.
 * 
 * @param encoded - The Base64-encoded string to decode.
 * @returns The original input string if decoding is successful and the secret matches, otherwise `null`.
 * 
 * @example
 * ```ts
 * const encoded = base64Hash("helloWorld");
 * const decoded = base64Decode(encoded); // "helloWorld"
 * ```
 */
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