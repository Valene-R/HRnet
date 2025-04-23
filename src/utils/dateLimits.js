/**
 * Return the minimum allowed birth date (today minus 80 years)
 * => used to limit age to max 80 years
 * @returns {Date} The minimum valid date of birth (the oldest allowed)
 */
export const getMinBirthDate = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 80);
  return today;
};

/**
 * Return the maximum allowed birth date (today at least 16 years old)
 * => used to enforce legal working age (16+)
 * @returns {Date} The maximum valid date of birth (the most recent allowed)
 */
export const getMaxBirthDate = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 16);
  return today;
};

/**
 * Return the minimum allowed start date (authorized from January 1, 1950)
 * @returns {Date} The earliest valid start date
 */
export const getMinStartDate = () => {
  return new Date(1950, 0, 1);
};

/**
 * Return today's date (used to prevent selecting future start dates)
 * @returns {Date} Today's date
 */
export const getToday = () => new Date();
