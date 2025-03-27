import PropTypes from 'prop-types';

/**
 * InputField component for entering text
 * @param {Object} props Component props
 * @param {string} props.label The label describing the input field
 * @param {string} props.name The name attribute for the input field
 * @param {string} [props.type='text'] The type of the input field (e.g., 'text', 'number', 'email', etc.)
 * @param {string|number} props.value The value of the input field
 * @param {Function} props.onChange The callback function triggered when the value changes
 * @param {number} [props.maxLength] The maximum number of characters allowed in the input field
 * @returns {JSX.Element} The input field
 */
const InputField = ({ label, name, type = 'text', value, onChange, maxLength }) => (
  <div className="flex flex-col items-center">
    <label htmlFor={name} className="font-medium">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className="h-6 w-full max-w-44 rounded border p-2 focus:ring-1 focus:ring-black focus:outline-none"
      aria-label={label}
    />
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
};

export default InputField;
