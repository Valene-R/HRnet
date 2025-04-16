/**
 * Convert a date string from 'YYYY-MM-DD' or 'YYYY/MM/DD' to 'MM/DD/YYYY'
 * @param {string} dateString The date string to format
 * @returns {string} The formatted date as 'MM/DD/YYYY' or 'N/A' if invalid
 */
export const formatDateForDisplay = (dateString) => {
  if (!dateString || !/^\d{4}[-/]\d{2}[-/]\d{2}$/.test(dateString)) return 'N/A';

  // Normalize the date: convert '/' to '-'
  const normalizedDate = dateString.replace(/\//g, '-');

  // Convert the normalized string into a Date object
  const date = new Date(normalizedDate);
  // Verify if the date is valid
  if (isNaN(date.getTime())) return 'N/A';

  // Format the date to 'MM/DD/YYYY' using Intl.DateTimeFormat (US format)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

/**
 * Convert a date from 'MM/DD/YYYY' to 'YYYY-MM-DD' (ISO format)
 * @param {string} date The date string to convert
 * @returns {string} The formatted date as 'YYYY-MM-DD' or an empty string if invalid
 */
export const formatToISO = (date) => {
  // Check that the input is a non-empty string
  if (!date || typeof date !== 'string') return '';
  // Split the date by '/' into month, day, and year
  const [month, day, year] = date.split('/');
  // Check if all three parts exist
  if (!month || !day || !year) return '';
  // The date is returned in ISO format with zero-padded month and day
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};
