/**
 * Name validation utility functions
 */

/**
 * Validates a name according to the following rules:
 * - Only alphabets (A–Z, a–z) are allowed
 * - No numbers are allowed
 * - No special characters are allowed (like @, #, $, %, etc.)
 * - Spaces are allowed between first name and last name
 * - Name should not start or end with space
 * - Minimum length: 2 characters
 * - Maximum length: 50 characters
 * 
 * @param {string} name - The name to validate
 * @returns {Object} - Object containing isValid (boolean) and errorMessage (string)
 */
function validateName(name) {
  // Check if name is provided
  if (!name || typeof name !== 'string') {
    return {
      isValid: false,
      errorMessage: 'Name is required'
    };
  }

  // Trim the name to check for leading/trailing spaces
  const trimmedName = name.trim();

  // Check minimum and maximum length
  if (trimmedName.length < 2 || trimmedName.length > 50) {
    return {
      isValid: false,
      errorMessage: 'Name must be between 2 and 50 characters'
    };
  }

  // Check if name contains only letters and spaces, and doesn't start or end with space
  // The regex breakdown:
  // ^[A-Za-z][A-Za-z\s]{0,48}[A-Za-z]$ - matches names that start and end with a letter, with letters/spaces in between
  // |^[A-Za-z]+$ - matches single word names with only letters
  const nameRegex = /^[A-Za-z][A-Za-z\s]{0,48}[A-Za-z]$|^[A-Za-z]+$/;

  if (!nameRegex.test(trimmedName)) {
    return {
      isValid: false,
      errorMessage: 'Name must contain only letters and spaces, and cannot start or end with a space'
    };
  }

  // Check if name starts or ends with space (additional check)
  if (/^\s|\s$/.test(name)) {
    return {
      isValid: false,
      errorMessage: 'Name cannot start or end with a space'
    };
  }

  // If all validations pass
  return {
    isValid: true,
    errorMessage: null
  };
}

export {
  validateName
};