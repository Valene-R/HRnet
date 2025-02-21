import PropTypes from 'prop-types';

/**
 * InputField component for entering text
 * @param {Object} props Component props
 * @returns {JSX.Element} The input field
 */
const InputField = ({ label, name, type = 'text', value, onChange }) => (
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
};

export default InputField;
