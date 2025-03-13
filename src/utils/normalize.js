/**
 * Capitalize the first letter of every word in a string
 * @param {string} text The text to capitalize
 * @returns {string} The capitalized string
 */
export const capitalizeFirstLetter = (text) => {
  return text
    .toLowerCase() // Convert to lowercase first to avoid inconsistencies
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

/**
 * Normalize text by keeping only digits and limiting to a specified length
 * @param {string} text The text to normalize
 * @param {number} [length=5] The maximum length of the normalized digits
 * @returns {string} The normalized digit string
 */
export const normalizeDigits = (text, length = 5) => {
  return text.replace(/\D/g, '').slice(0, length);
};

/**
 * Normalize text to allow letters, spaces, and hyphens
 *@param {string} text The text to normalize
 * @param {number} [maxLength=20] The maximum length of the normalized text
 * @returns {string} The normalized text
 */
export const normalizeText = (text, maxLength = 20) => {
  return text
    .replace(/[^a-zA-Z\s-]/g, '') // Allow letters, spaces, hyphens
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single one
    .slice(0, maxLength);
};

/**
 * Normalize alphanumeric text allowing numbers, spaces, and hyphens
 * @param {string} text The text to normalize
 * @param {number} [maxLength=50] The maximum length of the normalized text
 * @returns {string} The normalized alphanumeric string
 */
export const normalizeAlphaNumeric = (text, maxLength = 40) => {
  return text
    .replace(/[^a-zA-Z0-9\s-]/g, '') // Allow letters, numbers, spaces, hyphens
    .replace(/\s+/g, ' ')
    .slice(0, maxLength);
};
