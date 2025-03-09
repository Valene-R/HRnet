import PropTypes from 'prop-types';

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
  return (
    <table className="m-auto w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          {columns.map(({ label, key }) => (
            <th key={key} className="border p-2 text-center">
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          // Use the prop noResultsMessage when no data is found
          <tr>
            <td colSpan={columns.length} className="border p-2 text-center text-gray-500">
              {noResultsMessage}
            </td>
          </tr>
        ) : (
          // Display table rows when data exists
          data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              {columns.map(({ key }) => (
                <td key={key} className="border p-2">
                  {/* Display the value corresponding to the key in the row object */}
                  {row[key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
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
