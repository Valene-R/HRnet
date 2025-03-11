import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import { states } from '../data/states';
import { departments } from '../data/departments';
import InputField from '../components/InputField';
import DropdownSelect from '../components/DropdownSelect';
import Modal from '../components/Modal';
import ErrorMessage from '../components/ErrorMessage';

/**
 * Page for creating a new employee
 * @returns {JSX.Element} A form with multiple fields (inputs and selects) to create an employee
 */
const CreateEmployee = () => {
  // Initial values for the form fields
  const initialFormData = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: 'Alabama',
    zipCode: '',
    department: 'Sales',
  };

  // Field labels for dynamic error messages
  const fieldLabels = {
    firstName: 'First Name',
    lastName: 'Last Name',
    dateOfBirth: 'Date of Birth',
    startDate: 'Start Date',
    street: 'Street',
    city: 'City',
    state: 'State',
    zipCode: 'Zip Code',
    department: 'Department',
  };

  // State to store the form data
  const [formData, setFormData] = useState(initialFormData);

  // State to control the success modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to manage form validation errors
  const [errors, setErrors] = useState({});

  /**
   * Handle form field changes
   * @param {Event} event The event triggered
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData, // Preserve previous data (immutability)
      [name]: value, // Update the changed field only
    }));

    // Update the error message: clear if not empty, show error if empty
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() ? '' : `${fieldLabels[name]} is required`,
    }));
  };

  /**
   * Validate the form by checking for empty fields
   * @returns {boolean} True if the form is valid, false if invalid
   */
  const validateForm = () => {
    const newErrors = Object.fromEntries(
      Object.entries(formData)
        .filter(([, value]) => !value.trim()) // Check for empty fields
        .map(([key]) => [key, `${fieldLabels[key]} is required`]), // Map to error messages
    );

    setErrors(newErrors);
    return !Object.keys(newErrors).length; // Return true if there are no error
  };

  /**
   * Handle form submission
   * @param {Event} event The form submission event
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Stop submission if validation fails
    if (!validateForm()) return;

    // Retrieve existing employees (or an empty array if none exist yet)
    const employees = JSON.parse(localStorage.getItem('employees')) || [];

    // Ensure employees is always an array (avoid potential errors)
    const employeesArray = Array.isArray(employees) ? employees : [];

    // Create a new immutable list (spread operator) by adding the new employee
    const updatedEmployees = [...employeesArray, formData];

    localStorage.setItem('employees', JSON.stringify(updatedEmployees)); // Save updated list

    // Open success modal after form submission
    setIsModalOpen(true);
  };

  return (
    <div className="mt-10 text-center">
      <h1 className="text-3xl font-bold">HRnet</h1>
      <Link to={ROUTES.employeeList} className="text-violet-900 underline">
        View Current Employees
      </Link>
      <h2 className="mt-4 text-2xl">Create Employee</h2>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center space-y-4">
        <div>
          <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <ErrorMessage message={errors.firstName} />
        </div>

        <div>
          <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          <ErrorMessage message={errors.lastName} />
        </div>

        <div>
          <InputField label="Date of Birth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
          <ErrorMessage message={errors.dateOfBirth} />
        </div>

        <div>
          <InputField label="Start Date" name="startDate" value={formData.startDate} onChange={handleChange} />
          <ErrorMessage message={errors.startDate} />
        </div>

        <fieldset className="border p-4">
          <legend className="font-bold">Address</legend>

          <div>
            <InputField label="Street" name="street" value={formData.street} onChange={handleChange} />
            <ErrorMessage message={errors.street} />
          </div>

          <div>
            <InputField label="City" name="city" value={formData.city} onChange={handleChange} />
            <ErrorMessage message={errors.city} />
          </div>

          <div>
            <DropdownSelect
              label="State"
              name="state"
              value={formData.state}
              options={states}
              onChange={handleChange}
            />
            <ErrorMessage message={errors.state} />
          </div>

          <div>
            <InputField label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} />
            <ErrorMessage message={errors.zipCode} />
          </div>
        </fieldset>

        <div>
          <DropdownSelect
            label="Department"
            name="department"
            value={formData.department}
            options={departments}
            onChange={handleChange}
          />
          <ErrorMessage message={errors.department} />
        </div>

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
                {formData.firstName} {formData.lastName}
              </strong>{' '}
              has been created!
            </>
          }
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setFormData(initialFormData); // Reset the form fields when modal is closed
            setErrors({}); // Clear previous errors
          }}
          type="success"
          showCloseIcon={true}
        />
      </form>
    </div>
  );
};

export default CreateEmployee;
