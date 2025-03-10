import PropTypes from 'prop-types';

/**
 * Pagination component to navigate through pages
 * @param {number} currentPage The current active page
 * @param {number} totalPages Total number of pages
 * @param {Function} setCurrentPage Callback to update the current page
 * @param {number} totalEntries Total number of entries in the dataset
 * @param {number} totalUnfilteredEntries Total number of entries before filtering
 * @param {number} itemsPerPage Number of entries per page
 * @returns {JSX.Element} The pagination component
 */
const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  totalEntries,
  totalUnfilteredEntries,
  itemsPerPage,
}) => {
  // Calculate the first and last entry numbers for the current page
  const startEntry = totalEntries > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endEntry = totalEntries > 0 ? Math.min(startEntry + itemsPerPage - 1, totalEntries) : 0;

  const noResults = totalEntries === 0;

  return (
    <div className="mt-4 flex items-center justify-between">
      {/* Display entry count */}
      <span className="text-gray-700">
        Showing {startEntry} to {endEntry} of {totalEntries} entries
        {totalEntries !== totalUnfilteredEntries && ` (filtered from ${totalUnfilteredEntries} total entries)`}
      </span>

      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        {/* Button to go to the previous page */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage <= 1}
          className={`rounded border px-3 py-1 focus:ring-black focus:outline-none focus-visible:ring-1 ${
            currentPage <= 1
              ? 'cursor-not-allowed border-0 bg-gray-100'
              : 'cursor-pointer bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>

        {/* Current page indicator if there are results */}
        {!noResults && (
          <input
            type="text"
            value={currentPage}
            className="w-10 rounded border text-center focus:ring-black focus:outline-none focus-visible:ring-1"
            readOnly
          />
        )}

        {/* Button to go to the next page */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={noResults || currentPage >= totalPages}
          className={`rounded border px-3 py-1 focus:ring-black focus:outline-none focus-visible:ring-1 ${
            noResults || currentPage >= totalPages
              ? 'cursor-not-allowed border-0 bg-gray-100'
              : 'cursor-pointer bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalEntries: PropTypes.number.isRequired,
  totalUnfilteredEntries: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};

export default Pagination;
