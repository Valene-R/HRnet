import PropTypes from 'prop-types';

/**
 * Modal component for displaying styled messages, forms (via children), or other custom content
 * according to the type (success, error, warning, info)
 * @param {Object} props Component props
 * @param {string} [props.title] Optional modal title
 * @param {React.ReactNode} props.message The content displayed inside the modal (text or JSX)
 * @param {boolean} props.isOpen Determine if the modal is visible
 * @param {Function} props.onClose Function to call when closing the modal
 * @param {string} props.type Type of the modal (success, error, warning, info)
 * @param {React.ReactNode} [props.customButton] Custom button to replace default close button
 * @param {boolean} [props.showCloseIcon] Show a close 'X' icon in the top right corner
 * @param {boolean} [props.closeOnBackdropClick=true] Enable closing modal by clicking outside
 * @param {React.ReactNode} [props.children] Custom content inside the modal instead of default buttons
 * @param {boolean} [props.showCloseButton=false] Show a default Close button
 * @param {boolean} [props.showActionButtons] Show Save and Cancel buttons when editing forms
 * @param {boolean} [props.showSaveButton=true] Show Save button (if showActionButtons is true)
 * @param {boolean} [props.showCancelButton=true] Show Cancel button (if showActionButtons is true)
 * @param {Function} [props.onSave] Function to call when clicking the Save button
 * @param {Function} [props.onCancel] Function to call when clicking the Cancel button
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
  children,
  showCloseButton = false,
  showActionButtons = false,
  showSaveButton = true,
  showCancelButton = true,
  onSave = null,
  onCancel = null,
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
        className={`relative mx-2 rounded-xl border-4 ${styles.border} max-h-[90vh] overflow-y-auto bg-white px-6 py-5 text-center shadow-lg`}
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

        {message && <p className="mb-4 text-lg font-normal text-black">{message}</p>}

        {children}

        {customButton && <div className="mt-5">{customButton}</div>}

        {/* If no custom button is provided, render default buttons (Close or Save/Cancel) */}
        {!customButton && (
          <div className="mt-5 flex justify-center gap-4">
            {/* Default Close button */}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`cursor-pointer rounded-lg ${styles.button} px-6 py-2 font-bold text-white shadow-md`}
              >
                Close
              </button>
            )}

            {/* Action buttons (Save/Cancel), shown only if enabled */}
            {showActionButtons && (
              <>
                {showSaveButton && onSave && (
                  <button
                    onClick={onSave}
                    className="cursor-pointer rounded-lg bg-green-500 px-6 py-2 font-bold text-white hover:bg-green-700"
                  >
                    Save
                  </button>
                )}

                {showCancelButton && onCancel && (
                  <button
                    onClick={onCancel}
                    className="cursor-pointer rounded-lg bg-gray-500 px-6 py-2 font-bold text-white hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                )}
              </>
            )}
          </div>
        )}
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
  children: PropTypes.node,
  showCloseButton: PropTypes.bool,
  showActionButtons: PropTypes.bool,
  showSaveButton: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Modal;
