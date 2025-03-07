import PropTypes from 'prop-types';

/**
 * DataTable component that displays a table with structured data
 * @param {Object[]} data Array of objects representing the table data
 * @param {Object[]} columns List of columns to be displayed
 * @param {string} columns[].label The column header label
 * @param {string} columns[].key The key corresponding to the data field
 * @returns {JSX.Element} A table displaying the provided data
 */
const DataTable = ({ data, columns }) => {
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
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-100">
            {columns.map(({ key }) => (
              <td key={key} className="border p-2">
                {/* Display the value corresponding to the key in the row object */}
                {row[key]}
              </td>
            ))}
          </tr>
        ))}
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
};

export default DataTable;
