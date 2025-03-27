import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import ActionIcons from './ActionIcons';

/**
 * DataTable component that displays a table with structured data
 * @param {Object[]} data Array of objects representing the table data
 * @param {Object[]} columns List of columns to be displayed
 * @param {string} columns[].label The column header label
 * @param {string} columns[].key The key corresponding to the data field
 * @param {string} noResultsMessage Message displayed when no data is found
 * @returns {JSX.Element} A table displaying the provided data
 */
const DataTable = ({ data, columns, noResultsMessage }) => {
  // State for storing the sorting (column key and direction)
  const [sortingState, setSortingState] = useState({ key: null, direction: 'asc' });

  /**
   * Handle column sorting
   * @param {string} key The key of the column to be sorted
   */
  const handleSort = (key) => {
    if (sortingState.key === key) {
      // Toggle sorting direction between ascending and descending
      setSortingState({
        key,
        direction: sortingState.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      // Set sorting direction to ascending for a new column
      setSortingState({ key, direction: 'asc' });
    }
  };

  /**
   * Sort the data based on the current sorting state
   * Memoize sorted data to prevent unnecessary re-sorting
   */
  const sortedData = useMemo(() => {
    if (!sortingState.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortingState.key] || '';
      const bValue = b[sortingState.key] || '';

      // Compare as strings for consistent sorting
      return sortingState.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  }, [data, sortingState]);

  return (
    <div className="mx-auto mt-6 w-full max-w-5xl overflow-x-auto rounded-lg shadow-md">
      <table className="m-auto w-full min-w-[800px] border-8 border-white">
        <thead className="bg-gray-100">
          <tr>
            {columns.map(({ label, key }) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className={`h-12 cursor-pointer border border-x-transparent border-t-transparent p-2 text-center select-none ${
                  sortingState.key === key ? 'bg-gray-200' : ''
                }`}
              >
                <div className="flex items-center justify-center gap-1 text-sm">
                  {label}
                  <div className="flex flex-col">
                    {/* Ascending Arrow */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`size-7 transition-colors ${
                        sortingState.key === key && sortingState.direction === 'asc' ? 'fill-black' : 'fill-gray-400'
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 14l5-5 5 5H7z" />
                    </svg>
                    {/* Descending Arrow */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`size-7 transition-colors ${
                        sortingState.key === key && sortingState.direction === 'desc' ? 'fill-black' : 'fill-gray-400'
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </div>
                </div>
              </th>
            ))}
            {/* 'Actions' column */}
            <th className="h-12 border border-x-transparent border-t-transparent p-5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            // Use the prop noResultsMessage when no data is found
            <tr>
              <td colSpan={columns.length} className="border p-2 text-center text-gray-500">
                {noResultsMessage}
              </td>
            </tr>
          ) : (
            // Display table rows when data exists with alternating background colors and hover effect
            sortedData.map((row, rowIndex) => (
              <tr key={rowIndex} className={`hover:bg-gray-200 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                {columns.map(({ key }) => (
                  <td
                    key={key}
                    className={`max-w-[110px] border border-x-transparent border-y-gray-300 p-2 break-words whitespace-normal ${
                      sortingState.key === key ? 'bg-gray-200' : ''
                    }`}
                  >
                    {/* Display the value corresponding to the key in the row object */}
                    {row[key]}
                  </td>
                ))}
                {/* Action icons for each row */}
                <td className="border border-x-transparent border-y-gray-300 p-2">
                  <ActionIcons onEdit={() => {}} onDelete={() => {}} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }),
  ).isRequired,
  noResultsMessage: PropTypes.string.isRequired,
};

export default DataTable;
