import PropTypes from 'prop-types';

/**
 * Modal component for displaying messages
 * @param {Object} props Component props
 * @param {string} [props.title] Optional modal title
 * @param {React.ReactNode} props.message The content displayed inside the modal (text or JSX)
 * @param {boolean} props.isOpen Determine if the modal is visible
 * @param {Function} props.onClose Function to call when closing the modal
 * @returns {JSX.Element|null} The modal component if open, otherwise null
 */
const Modal = ({ title, message, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-xs" onClick={onClose}>
      <div
        className="mx-2 rounded-xl border-4 border-green-500 bg-white px-6 py-5 text-center shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {title && <h2 className="mb-2 text-xl font-bold text-green-700">{title}</h2>}
        <p className="text-lg font-normal text-black">{message}</p>
        <button
          onClick={onClose}
          className="mt-5 cursor-pointer rounded-lg bg-green-500 px-6 py-2 font-bold text-white shadow-md transition-all hover:bg-green-700 focus:ring-1 focus:ring-black focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.node.isRequired, // Accept JSX, text ou React component
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
