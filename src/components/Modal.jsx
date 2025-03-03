import PropTypes from 'prop-types';

/**
 * Modal component for displaying messages according to the type (success, error, warning, info)
 * @param {Object} props Component props
 * @param {string} [props.title] Optional modal title
 * @param {React.ReactNode} props.message The content displayed inside the modal (text or JSX)
 * @param {boolean} props.isOpen Determine if the modal is visible
 * @param {Function} props.onClose Function to call when closing the modal
 * @param {string} props.type Type of the modal (success, error, warning, info)
 * @param {React.ReactNode} [props.customButton] Custom button to replace default close button
 * @param {boolean} [props.showCloseIcon] Show a close 'X' icon in the top right corner
 * @param {boolean} [props.closeOnBackdropClick=true] Enable closing modal by clicking outside
 * @returns {JSX.Element|null} The modal component if open, otherwise null
 */
const Modal = ({
  title,
  message,
  isOpen,
  onClose,
  type,
  customButton,
  showCloseIcon = false,
  closeOnBackdropClick = true,
}) => {
  if (!isOpen) return null;

  // Define the border, title, and button styles for each modal type
  const typeStyles = {
    success: { border: 'border-green-500', title: 'text-green-700', button: 'bg-green-500 hover:bg-green-700' },
    error: { border: 'border-red-500', title: 'text-red-700', button: 'bg-red-500 hover:bg-red-700' },
    warning: { border: 'border-yellow-500', title: 'text-yellow-700', button: 'bg-yellow-500 hover:bg-yellow-700' },
    info: { border: 'border-blue-500', title: 'text-blue-700', button: 'bg-blue-500 hover:bg-blue-700' },
  };

  const styles = typeStyles[type];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-label={title ? undefined : `${type} Modal`}
      // Close the modal when clicking outside, unless 'closeOnBackdropClick' is false
      onClick={closeOnBackdropClick ? onClose : undefined}
    >
      <div
        className={`relative mx-2 rounded-xl border-4 ${styles.border} bg-white px-6 py-5 text-center shadow-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close 'X' button in the top-right corner (optional) */}
        {showCloseIcon && (
          <button
            onClick={onClose}
            className="absolute top-1 right-1 cursor-pointer text-2xl font-bold text-gray-700 hover:text-black focus:ring-1 focus:ring-black focus:outline-none"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {title && (
          <h2 id="modal-title" className={`mb-2 text-xl font-bold ${styles.title}`}>
            {title}
            <span className="sr-only"> Modal</span>
          </h2>
        )}
        <p className="text-lg font-normal text-black">{message}</p>

        <div className="mt-5 flex justify-center">
          {/* Use the custom button if provided; otherwise, render the default close button */}
          {customButton ? (
            customButton
          ) : (
            <button
              onClick={onClose}
              className={`cursor-pointer rounded-lg ${styles.button} px-6 py-2 font-bold text-white shadow-md transition-all focus:ring-1 focus:ring-black focus:outline-none`}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.node.isRequired, // Accept JSX, text or React component
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
  showCloseIcon: PropTypes.bool,
  customButton: PropTypes.node,
  closeOnBackdropClick: PropTypes.bool,
};

export default Modal;
