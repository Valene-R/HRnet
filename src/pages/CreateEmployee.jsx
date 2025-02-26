import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import { states } from '../data/states';
import { departments } from '../data/departments';
import InputField from '../components/InputField';
import DropdownSelect from '../components/DropdownSelect';
import Modal from '../components/Modal';

/**
 * Page for creating a new employee
 * @returns {JSX.Element} A form with multiple input fields to create an employee
 */
const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: 'Alabama',
    zipCode: '',
    department: 'Sales',
  });

  // State to control the success modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Handle form field changes
   * @param {Event} event The event triggered by input change
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData, // Preserve previous data (immutability)
      [name]: value, // Update the changed field only
    }));
  };

  /**
   * Handle form submission
   * @param {Event} event The form submission event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
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
        <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
        <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
        <InputField label="Date of Birth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
        <InputField label="Start Date" name="startDate" value={formData.startDate} onChange={handleChange} />

        <fieldset className="border p-4">
          <legend className="font-bold">Address</legend>
          <InputField label="Street" name="street" value={formData.street} onChange={handleChange} />
          <InputField label="City" name="city" value={formData.city} onChange={handleChange} />

          <DropdownSelect label="State" name="state" value={formData.state} options={states} onChange={handleChange} />

          <InputField label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} />
        </fieldset>

        <DropdownSelect
          label="Department"
          name="department"
          value={formData.department}
          options={departments}
          onChange={handleChange}
        />

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
          onClose={() => setIsModalOpen(false)}
        />
      </form>
    </div>
  );
};

export default CreateEmployee;
