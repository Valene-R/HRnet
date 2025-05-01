import PropTypes from 'prop-types';

/**
 * Select dropdown component to choose from a list of numeric options
 * @param {Object} props Component props
 * @param {number} value The currently selected value
 * @param {Function} onChange Callback function to update the selected value
 * @param {number[]} options Array of numbers representing selectable values
 * @param {string} labelBefore Text to display before the select
 * @param {string} labelAfter Text to display after the select
 * @returns {JSX.Element} A customizable select dropdown
 */
const ItemsPerPageSelect = ({ value, onChange, options, labelBefore, labelAfter }) => {
  return (
    <div className="mb-4 flex items-center">
      {labelBefore && <label className="mr-2">{labelBefore}</label>}
      <select
        className="cursor-pointer rounded border p-2 focus:ring-1 focus:ring-black focus:outline-none"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {options.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      {labelAfter && <span className="ml-2">{labelAfter}</span>}
    </div>
  );
};

ItemsPerPageSelect.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  labelBefore: PropTypes.string,
  labelAfter: PropTypes.string,
};

export default ItemsPerPageSelect;
