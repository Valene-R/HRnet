import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputField from './InputField';
import DropdownSelect from './DropdownSelect';
import ErrorMessage from './ErrorMessage';
import { states } from '../data/states';
import { departments } from '../data/departments';
import { capitalizeFirstLetter, normalizeText, normalizeAlphaNumeric, normalizeDigits } from '../utils/normalize';
import DatePicker from './DatePicker';
import { getMinBirthDate, getMaxBirthDate, getMinStartDate, getToday } from '../utils/dateLimits';

/**
 * Form for creating or editing an employee
 * @param {Object} props
 * @param {Object} [props.existingEmployee] The employee data to be edited, if any
 * @param {Function} [props.onClose] Callback function called after saving (e.g. to close an edit modal)
 * @param {Function} props.onSave Callback function to handle saving the employee data
 * @param {Function} [props.onReset] Callback to pass the internal reset function to the parent component
 * @param {boolean} props.showSubmitButton Show or hide the submit button
 * @returns {JSX.Element} The form
 */
const EmployeeForm = ({ existingEmployee, onClose, onSave, onReset, showSubmitButton = false }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: existingEmployee || {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      street: '',
      city: '',
      state: 'AL',
      zipCode: '',
      department: 'Sales',
    },
  });

  useEffect(() => {
    // If an existing employee is provided (edit mode), update all form fields with their data
    if (existingEmployee) {
      reset(existingEmployee);
    }
    // If onReset is provided, pass reset to parent
    if (onReset) {
      onReset(() => reset());
    }
  }, [existingEmployee, onReset, reset]);

  /**
   * Handle form submission
   * Call `onSave` with the form data, and optionally `onClose` if in edit mode
   * @param {Object} data Form data
   */
  const onSubmit = (data) => {
    if (onSave) {
      onSave(data);
    }
    if (onClose) {
      onClose(); // Close the modal if in edit mode
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-4">
      {/* First Name */}
      <div>
        <Controller
          name="firstName"
          control={control}
          rules={{
            required: 'First Name is required',
            maxLength: { value: 15, message: 'Maximum 15 characters allowed' },
          }}
          render={({ field: { onChange, ...field } }) => (
            <InputField
              label="First Name"
              {...field}
              onChange={(e) => onChange(capitalizeFirstLetter(e.target.value))}
              maxLength={16}
            />
          )}
        />
        <ErrorMessage message={errors.firstName?.message} />
      </div>

      {/* Last Name */}
      <div>
        <Controller
          name="lastName"
          control={control}
          rules={{
            required: 'Last Name is required',
            maxLength: { value: 15, message: 'Maximum 15 characters allowed' },
          }}
          render={({ field: { onChange, ...field } }) => (
            <InputField
              label="Last Name"
              {...field}
              onChange={(e) => onChange(capitalizeFirstLetter(e.target.value))}
              maxLength={16}
            />
          )}
        />
        <ErrorMessage message={errors.lastName?.message} />
      </div>

      {/* Date of Birth */}
      <div>
        <Controller
          name="dateOfBirth"
          control={control}
          rules={{
            required: 'Date of Birth is required',
            validate: (value) => {
              const date = new Date(value);
              const min = getMinBirthDate();
              const max = getMaxBirthDate();
              if (date < min || date > max) {
                return `Date must be between ${min.toLocaleDateString()} and ${max.toLocaleDateString()}`;
              }
              return true;
            },
          }}
          render={({ field: { value, onChange, name } }) => (
            <DatePicker label="Date of Birth" name={name} value={value} onChange={onChange} />
          )}
        />
        <ErrorMessage message={errors.dateOfBirth?.message} />
      </div>

      {/* Start Date */}
      <div>
        <Controller
          name="startDate"
          control={control}
          rules={{
            required: 'Start Date is required',
            validate: (value) => {
              const date = new Date(value);
              const min = getMinStartDate();
              const max = getToday();
              if (date < min || date > max) {
                return `Start date must be between ${min.toLocaleDateString()} and ${max.toLocaleDateString()}`;
              }
              return true;
            },
          }}
          render={({ field: { value, onChange, name } }) => (
            <DatePicker label="Start Date" name={name} value={value} onChange={onChange} />
          )}
        />
        <ErrorMessage message={errors.startDate?.message} />
      </div>

      {/* Address Section */}
      <fieldset className="mt-4 rounded-lg border-2 border-[#779432] px-12 py-4">
        <legend className="font-bold text-[#485330]">Address</legend>

        {/* Street */}
        <div>
          <Controller
            name="street"
            control={control}
            rules={{
              required: 'Street is required',
              maxLength: { value: 20, message: 'Maximum 20 characters allowed' },
            }}
            render={({ field: { onChange, ...field } }) => (
              <InputField
                label="Street"
                type="text"
                {...field}
                onChange={(e) => onChange(capitalizeFirstLetter(normalizeAlphaNumeric(e.target.value)))}
                maxLength={21}
              />
            )}
          />
          <ErrorMessage message={errors.street?.message} />
        </div>

        {/* City */}
        <div>
          <Controller
            name="city"
            control={control}
            rules={{
              required: 'City is required',
              maxLength: { value: 20, message: 'Maximum 20 characters allowed' },
            }}
            render={({ field: { onChange, ...field } }) => (
              <InputField
                label="City"
                type="text"
                {...field}
                onChange={(e) => onChange(capitalizeFirstLetter(normalizeText(e.target.value)))}
                maxLength={21}
              />
            )}
          />
          <ErrorMessage message={errors.city?.message} />
        </div>

        {/* State */}
        <div>
          <Controller
            name="state"
            control={control}
            rules={{ required: 'State is required' }}
            render={({ field: { onChange, ...field } }) => (
              <DropdownSelect
                label="State"
                options={states}
                {...field}
                onChange={(e) => onChange(e.target.value.toUpperCase())}
              />
            )}
          />
          <ErrorMessage message={errors.state?.message} />
        </div>

        {/* Zip Code */}
        <div>
          <Controller
            name="zipCode"
            control={control}
            rules={{
              required: 'Zip Code is required',
              pattern: {
                value: /^\d{5}$/,
                message: 'Zip Code must be exactly 5 digits',
              },
            }}
            render={({ field: { onChange, ...field } }) => (
              <InputField label="Zip Code" {...field} onChange={(e) => onChange(normalizeDigits(e.target.value))} />
            )}
          />
          <ErrorMessage message={errors.zipCode?.message} />
        </div>
      </fieldset>

      {/* Department */}
      <div>
        <Controller
          name="department"
          control={control}
          rules={{ required: 'Department is required' }}
          render={({ field }) => <DropdownSelect label="Department" options={departments} {...field} />}
        />
        <ErrorMessage message={errors.department?.message} />
      </div>

      {showSubmitButton && (
        <button
          type="submit"
          className="mt-6 w-full max-w-3xs transform cursor-pointer rounded-lg bg-[#779432] px-6 py-3 text-lg font-bold text-white transition-transform hover:scale-105 hover:bg-[#485330] focus:ring-1 focus:ring-black focus:outline-none"
        >
          Save
        </button>
      )}
    </form>
  );
};

EmployeeForm.propTypes = {
  existingEmployee: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    dateOfBirth: PropTypes.string,
    startDate: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    department: PropTypes.string,
  }),
  onClose: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  showSubmitButton: PropTypes.bool,
};

export default EmployeeForm;
