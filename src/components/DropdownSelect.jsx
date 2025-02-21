import PropTypes from 'prop-types';

/**
 * DropdownSelect component for selecting an option from a list
 * @param {Object} props Component props
 * @returns {JSX.Element} The dropdown select
 */
const DropdownSelect = ({ label, name, value, options, onChange }) => (
  <div className="flex flex-col items-center">
    <label htmlFor={name} className="font-medium">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      aria-label={label}
      className="h-9 w-full max-w-44 rounded border p-2 hover:cursor-pointer hover:bg-gray-200 focus:ring-1 focus:ring-black focus:outline-none"
    >
      {options.map((option, index) => (
        // Add a unique key: use abbreviation if available, otherwise fallback to index if needed
        <option
          key={option.abbreviation || option.name || `option-${index}`}
          value={option.abbreviation || option.name}
          className="w-full max-w-44 bg-white"
        >
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

DropdownSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      abbreviation: PropTypes.string,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DropdownSelect;
