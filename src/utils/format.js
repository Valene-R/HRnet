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
