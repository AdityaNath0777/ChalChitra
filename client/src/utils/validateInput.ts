// type StringOrNullable = string | null | undefined;

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

const REGEX_PATTERNS = {
  name: /^[A-ZÀ-ÿ][-a-zA-ZÀ-ÿ'., ]{0,49}$/,
  username: /^[a-z0-9à-ÿ._]{1,50}$/,
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  strongPassword: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
};

/**
 * Validates a name against the specified format.
 * @param name - The name to validate.
 * @returns ValidationResult indicating whether the name is valid.
 */
const validateName = (name: unknown): ValidationResult => {
  if (typeof name !== "string") {
    return { isValid: false, errorMessage: "Name must be a string." };
  }
  if (!name) {
    return { isValid: false, errorMessage: "Name cannot be empty." };
  }
  if (!REGEX_PATTERNS.name.test(name)) {
    return {
      isValid: false,
      errorMessage:
        "Name must start with an uppercase letter and can include letters, spaces, and valid punctuation. Max length: 50.",
    };
  }
  return { isValid: true };
};

/**
 * Validates a username against the specified format.
 * @param username - The username to validate.
 * @returns ValidationResult indicating whether the username is valid.
 */
const validateUsername = (username: unknown): ValidationResult => {
  if (typeof username !== "string") {
    return { isValid: false, errorMessage: "Username must be a string." };
  }
  if (!username) {
    return { isValid: false, errorMessage: "Username cannot be empty." };
  }
  if (!REGEX_PATTERNS.username.test(username)) {
    return {
      isValid: false,
      errorMessage:
        "Username can include lowercase letters, numbers, periods, and underscores. Max length: 50.",
    };
  }
  return { isValid: true };
};

/**
 * Validates an email address against the specified format.
 * @param email - The email address to validate.
 * @returns ValidationResult indicating whether the email is valid.
 */
const validateEmail = (email: unknown): ValidationResult => {
  if (typeof email !== "string") {
    return { isValid: false, errorMessage: "Email must be a string." };
  }
  if (!email) {
    return { isValid: false, errorMessage: "Email cannot be empty." };
  }
  if (!REGEX_PATTERNS.email.test(email)) {
    return {
      isValid: false,
      errorMessage: "Invalid email format.",
    };
  }
  return { isValid: true };
};

/**
 * Validates the length of a password.
 * @param password - The password to validate.
 * @returns ValidationResult indicating whether the password is valid.
 */
const validatePassword = (password: unknown): ValidationResult => {
  if (typeof password !== "string") {
    return { isValid: false, errorMessage: "Password must be a string." };
  }
  if (!password) {
    return { isValid: false, errorMessage: "Password cannot be empty." };
  }
  if (password.length < 8) {
    return {
      isValid: false,
      errorMessage: "Password must be at least 8 characters long.",
    };
  }
  return { isValid: true };
};

/**
 * Validates a password against strong password criteria.
 * @param password - The password to validate.
 * @returns ValidationResult indicating whether the password is valid.
 */
const validateStrongPassword = (password: unknown): ValidationResult => {
  if (typeof password !== "string") {
    return { isValid: false, errorMessage: "Password must be a string." };
  }
  if (!password) {
    return { isValid: false, errorMessage: "Password cannot be empty." };
  }
  if (!REGEX_PATTERNS.strongPassword.test(password)) {
    return {
      isValid: false,
      errorMessage:
        "Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one digit, one special character, and contain no spaces.",
    };
  }
  return { isValid: true };
};

/**
 * Centralized Validator Object for Input Validation
 */
const Validator = {
  validateName,
  validateUsername,
  validateEmail,
  validatePassword,
  validateStrongPassword,
};

export { Validator };