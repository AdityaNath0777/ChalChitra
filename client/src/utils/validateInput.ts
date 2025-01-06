/**
 * Validates if the given name is in a valid format.
 * 
 * @param name - The name to be validated.
 * @returns `true` if the name is valid, `false` otherwise.
 * 
 * **Valid Name Format:**
 * - Starts with an uppercase letter (including accented characters).
 * - Can contain lowercase letters, hyphens, apostrophes, commas, periods, and spaces.
 * - Maximum length is 50 characters.
 */
const validateName = (name: string): boolean =>
  /^[A-ZÀ-ÿ][-a-zA-ZÀ-ÿ'., ]{0,49}$/.test(name);

/**
 * Validates if the given username is in a valid format.
 * 
 * @param username - The username to be validated.
 * @returns `true` if the username is valid, `false` otherwise.
 * 
 * **Valid Username Format:**
 * - Can contain lowercase letters, numbers, periods, underscores, and accents.
 * - Must be between 1 and 50 characters long.
 */
const validateUsername = (username: string): boolean =>
  /^[a-z0-9à-ÿ._]{1,50}$/.test(username);

/**
 * Validates if the given email address is in a valid format.
 * 
 * @param email - The email address to be validated.
 * @returns `true` if the email address is valid, `false` otherwise.
 * 
 * **Valid Email Format:**
 * - Must contain an "@" symbol.
 * - Must have at least one character before and after the "@" symbol.
 * - Can contain letters, numbers, hyphens, periods, and underscores.
 */
const validateEmail = (email: string): boolean =>
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

/**
 * Validates if the password meets the minimum length requirement.
 * 
 * @param password - The password to be validated.
 * @returns `true` if the password is at least 8 characters long, `false` otherwise.
 */
const validatePassword = (password: string): boolean => password.length >= 8;

/**
 * Validates if the password meets strong password criteria.
 * 
 * @param password - The password to be validated.
 * @returns `true` if the password meets the following criteria:
 *   - At least 8 characters and at most 16 characters long.
 *   - Contains at least one digit (0-9).
 *   - Contains at least one lowercase letter.
 *   - Contains at least one uppercase letter.
 *   - Contains at least one special character.
 *   - Does not contain any spaces.
 * @returns `false` otherwise.
 */
const validateStrongPassword = (password: string): boolean =>
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(password);

export {
  validateName,
  validateUsername,
  validateEmail,
  validatePassword,
  validateStrongPassword,
};
