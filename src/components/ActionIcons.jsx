import PropTypes from 'prop-types';

/**
 * Display edit and delete icons for each row
 * @param {Object} props
 * @param {Function} props.onEdit Function to call when the edit button is clicked
 * @param {Function} props.onDelete Function to call when the delete button is clicked
 */
const ActionIcons = ({ onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {/* Edit button */}
      <button
        onClick={onEdit}
        aria-label="Edit"
        className="p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 cursor-pointer transition-colors hover:text-blue-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </button>

      {/* Delete button */}
      <button
        onClick={onDelete}
        aria-label="Delete"
        className="p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 cursor-pointer transition-colors hover:text-red-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 6h18" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </div>
  );
};

ActionIcons.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ActionIcons;
