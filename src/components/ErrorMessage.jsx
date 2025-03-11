import PropTypes from 'prop-types';

/**
 * ErrorMessage component to display validation errors
 * @param {Object} props Component props
 * @param {string} props.message Error message to display
 * @returns {JSX.Element|null} A paragraph element displaying the error message if provided, otherwise null
 */
const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <p className="text-xs text-red-500">{message}</p>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
