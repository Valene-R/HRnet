import PropTypes from 'prop-types';

/**
 * Search bar with a clear button when text is entered
 * @param {string} value Current search input value
 * @param {function} onChange Function to update the search input
 * @returns {JSX.Element} The search bar component
 */
const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative mb-4 flex items-center justify-end">
      <input
        type="text"
        placeholder="Search..."
        className="rounded border p-2 focus:ring-1 focus:ring-black focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* Cross button to clear search */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2 cursor-pointer text-gray-500 hover:text-black"
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className="h-5 w-5 fill-current"
            aria-hidden="true"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
