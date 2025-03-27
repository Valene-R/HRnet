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
import { useEmployeeStore } from '../store/employeeStore';

/**
 * Page for creating a new employee
 * @returns {JSX.Element} A form with multiple fields (inputs and selects) to create an employee
 */
const CreateEmployee = () => {
  // State to control the success modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to store the newly created employee
  const [createdEmployee, setCreatedEmployee] = useState(null);

  // Zustand store function to add a new employee to the list
  const { addEmployee } = useEmployeeStore();

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
      state: 'AL',
      zipCode: '',
      department: 'Sales',
    },
  });

  /**
   * Handle form submission by saving the employee to localStorage
   * @param {Object} data The form data
   */
  const onSubmit = (data) => {
    addEmployee(data); // Use store Zustand
    setCreatedEmployee(data);
    setIsModalOpen(true);
    reset(); // Reset the form
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-8 text-center">
      <h1 className="mb-6 text-4xl font-bold text-[#485330]">Create employee</h1>

      <div className="flex gap-x-7">
        {/* Link back to home */}
        <Link
          to={ROUTES.home}
          className="mb-6 cursor-pointer text-lg text-[#779432] underline transition-transform hover:scale-105 hover:text-[#485330]"
        >
          Home
        </Link>
        {/* Link to the current list of employees */}
        <Link
          to={ROUTES.employeeList}
          className="mb-6 cursor-pointer text-lg text-[#779432] underline transition-transform hover:scale-105 hover:text-[#485330]"
        >
          View Current Employees
        </Link>
      </div>

      <div className="mb-10 w-full max-w-lg rounded-lg bg-white p-8 shadow-lg shadow-[#485330]/30">
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

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full max-w-3xs transform cursor-pointer rounded-lg bg-[#779432] px-6 py-3 text-lg font-bold text-white transition-transform hover:scale-105 hover:bg-[#485330] focus:ring-1 focus:ring-black focus:outline-none"
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
    </div>
  );
};

export default CreateEmployee;
