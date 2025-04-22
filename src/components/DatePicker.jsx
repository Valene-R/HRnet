import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { formatToISO, isValidMMDDYYYY } from '../utils/format';

/**
 * Custom DatePicker using react-datepicker
 * Allow both manual typing and calendar selection
 * Add a button to return to today and visually grays out days outside the current month
 * @param {Object} props Component props
 * @param {string} props.label Field label shown above the input
 * @param {string} props.name Input name/id
 * @param {string} props.value ISO date string (YYYY-MM-DD)
 * @param {function} props.onChange Callback triggered with new date in ISO format
 * @returns {JSX.Element} The rendered date picker component
 */
const DatePicker = ({ label, name, value, onChange }) => {
  // Parse the input value to a Date object (or null if invalid)
  // Parsed value used as the currently selected date in the datepicker
  const parsedDate = value ? new Date(value) : null;

  // Keep track of the current month displayed in the calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());

  /**
   * Handle selection of a date (either from calendar or typed)
   * and convert it to ISO format (YYYY-MM-DD)
   * @param {Date} date Selected date object
   */
  const handleChange = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      onChange(formatToISO(date.toLocaleDateString('en-US')));
    } else {
      onChange('');
    }
  };

  /**
   * Handle direct typing input in MM/DD/YYYY format and sanitize input
   * Only allow digits and slashes, and validate against a known format
   * @param {Event} event The raw input change event
   */
  const handleRawChange = (event) => {
    const input = event?.target?.value ?? '';
    const sanitized = input.replace(/[^\d/]/g, '');

    if (isValidMMDDYYYY(sanitized)) {
      onChange(formatToISO(sanitized));
    }
  };

  /**
   * Add a custom class to days outside of the currently shown month to visually gray them out
   * @param {Date} date The date being rendered in the calendar
   * @returns {string} class name or empty string
   */
  const getDayClass = (date) => {
    return date.getMonth() !== currentMonth.getMonth() ? 'react-datepicker__days--outside-month' : '';
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="mb-1 block font-medium">
          {label}
        </label>
      )}

      {/* Main date picker component */}
      <ReactDatePicker
        selected={parsedDate}
        onChange={handleChange}
        onChangeRaw={handleRawChange}
        // Restrict typing to valid characters (digits and slash) : prevent invalid key input in the date field
        onKeyDown={(e) => {
          if (!/[0-9/]/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
            e.preventDefault();
          }
        }}
        name={name}
        id={name}
        className="h-6 w-full max-w-44 rounded border p-2 focus:ring-1 focus:ring-black focus:outline-none"
        dateFormat="MM/dd/yyyy"
        placeholderText="MM/DD/YYYY"
        showPopperArrow={false} // Hide the small arrow on the calendar popup
        autoComplete="off" // Prevent browser autocomplete
        dayClassName={getDayClass} // Custom class for days outside the current month
        onMonthChange={(date) => setCurrentMonth(date)} // Update currentMonth when user changes month
        onCalendarOpen={() => setCurrentMonth(parsedDate || new Date())} // Set correct month when calendar opens
        // Custom calendar header with today shortcut (Home icon) and month navigation
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <div className="flex items-center justify-between bg-gray-100 px-2 py-1">
            {/* Home icon to quickly jump to today */}
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                handleChange(today);
                setCurrentMonth(today);
              }}
              className="cursor-pointer transition-transform hover:text-blue-600"
              title="Today"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 576 512" fill="currentColor">
                <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
              </svg>
            </button>

            {/* Month and year navigation with arrows */}
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              {/* Previous month arrow */}
              <button onClick={decreaseMonth} type="button" className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M128 256c0-6.7 2.8-13 7.7-17.6l112-104c7-6.5 17.2-8.2 25.9-4.4s14.4 12.5 14.4 22l0 208c0 9.5-5.7 18.2-14.4 22s-18.9 2.1-25.9-4.4l-112-104c-4.9-4.5-7.7-10.9-7.7-17.6z" />
                </svg>
              </button>

              {/* Display current month and year */}
              <span>
                {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
              </span>

              {/* Next month arrow */}
              <button onClick={increaseMonth} type="button" className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M320 256c0 6.7-2.8 13-7.7 17.6l-112 104c-7 6.5-17.2 8.2-25.9 4.4s-14.4-12.5-14.4-22l0-208c0-9.5 5.7-18.2 14.4-22s18.9-2.1 25.9 4.4l112 104c4.9 4.5 7.7 10.9 7.7 17.6z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default DatePicker;
