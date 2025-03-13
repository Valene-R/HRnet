import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import { states } from '../data/states';
import { departments } from '../data/departments';
import InputField from '../components/InputField';
import DropdownSelect from '../components/DropdownSelect';
import Modal from '../components/Modal';
import ErrorMessage from '../components/ErrorMessage';
import { capitalizeFirstLetter, normalizeText, normalizeAlphaNumeric, normalizeDigits } from '../utils/normalize';

/**
 * Page for creating a new employee
 * @returns {JSX.Element} A form with multiple fields (inputs and selects) to create an employee
 */
const CreateEmployee = () => {
  // State to control the success modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to store the newly created employee
  const [createdEmployee, setCreatedEmployee] = useState(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      street: '',
      city: '',
      state: 'Alabama',
      zipCode: '',
      department: 'Sales',
    },
  });

  /**
   * Handle form submission by saving the employee to localStorage
   * @param {Object} data The form data
   */
  const onSubmit = (data) => {
    // Retrieve existing employees (or an empty array if none exist yet)
    const employees = JSON.parse(localStorage.getItem('employees')) || [];

    // Create a new immutable list (spread operator) by adding the new employee
    const updatedEmployees = [...employees, data];
    localStorage.setItem('employees', JSON.stringify(updatedEmployees)); // Save updated list

    setCreatedEmployee(data);
    setIsModalOpen(true); // Open success modal after form submission
    reset(); // Reset form fields after successful submission
  };

  return (
    <div className="mt-10 text-center">
      <h1 className="text-3xl font-bold">HRnet</h1>

      {/* Navigation Link */}
      <Link to={ROUTES.employeeList} className="text-violet-900 underline">
        View Current Employees
      </Link>
      <h2 className="mt-4 text-2xl">Create Employee</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col items-center space-y-4">
        {/* First Name */}
        <div>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: 'First Name is required' }}
            render={({ field: { onChange, ...field } }) => (
              <InputField
                label="First Name"
                {...field}
                onChange={(e) => onChange(capitalizeFirstLetter(e.target.value))}
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
            rules={{ required: 'Last Name is required' }}
            render={({ field: { onChange, ...field } }) => (
              <InputField
                label="Last Name"
                {...field}
                onChange={(e) => onChange(capitalizeFirstLetter(e.target.value))}
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
            rules={{ required: 'Date of Birth is required' }}
            render={({ field }) => <InputField label="Date of Birth" type="date" {...field} />}
          />
          <ErrorMessage message={errors.dateOfBirth?.message} />
        </div>

        {/* Start Date */}
        <div>
          <Controller
            name="startDate"
            control={control}
            rules={{ required: 'Start Date is required' }}
            render={({ field }) => <InputField label="Start Date" type="date" {...field} />}
          />
          <ErrorMessage message={errors.startDate?.message} />
        </div>

        {/* Address Section */}
        <fieldset className="border p-4">
          <legend className="font-bold">Address</legend>

          {/* Street */}
          <div>
            <Controller
              name="street"
              control={control}
              rules={{ required: 'Street is required' }}
              render={({ field: { onChange, ...field } }) => (
                <InputField
                  label="Street"
                  type="text"
                  {...field}
                  onChange={(e) => onChange(capitalizeFirstLetter(normalizeAlphaNumeric(e.target.value)))}
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
              rules={{ required: 'City is required' }}
              render={({ field: { onChange, ...field } }) => (
                <InputField
                  label="City"
                  type="text"
                  {...field}
                  onChange={(e) => onChange(capitalizeFirstLetter(normalizeText(e.target.value)))}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 cursor-pointer rounded border-1 bg-gray-100 px-4 py-2 text-black hover:bg-gray-200 focus:ring-1 focus:ring-black focus:outline-none"
        >
          Save
        </button>

        {/* Success modal displayed after employee creation */}
        <Modal
          title="Success"
          message={
            <>
              Employee{' '}
              <strong className="text-2xl text-black">
                {createdEmployee?.firstName} {createdEmployee?.lastName}
              </strong>{' '}
              has been created!
            </>
          }
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type="success"
          showCloseIcon={true}
        />
      </form>
    </div>
  );
};

export default CreateEmployee;
