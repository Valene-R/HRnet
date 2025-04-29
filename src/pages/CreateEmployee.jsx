import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import Modal from 'react-custom-modal-tailwindv4';
import { useEmployeeStore } from '../store/employeeStore';
import EmployeeForm from '../components/EmployeeForm';

/**
 * Page for creating a new employee
 * Display a form to input employee information, navigation links and a success modal after form submission
 * @returns {JSX.Element} The full page UI for employee creation
 */
const CreateEmployee = () => {
  // State to control the success modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to store the newly created employee
  const [createdEmployee, setCreatedEmployee] = useState(null);

  // Zustand store function to add a new employee to the list
  const { addEmployee } = useEmployeeStore();

  // Reference to hold the reset function from EmployeeForm
  const resetFormRef = useRef(null); // Ref to store the reset function

  /**
   * Handle form submission by saving the employee to Zustand store
   * @param {Object} data The form data
   */
  const handleSave = (data) => {
    addEmployee(data); // Use store Zustand
    setCreatedEmployee(data);
    setIsModalOpen(true);

    // Call the reset function only if this is a new employee (no id)
    if (!data.id && resetFormRef.current) resetFormRef.current();
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
        {/* Form */}
        <EmployeeForm
          onSave={handleSave}
          showSubmitButton={true}
          onReset={(resetFn) => (resetFormRef.current = resetFn)} // Store the reset function in the ref
        />

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
          showCloseButton={true}
        />
      </div>
    </div>
  );
};

export default CreateEmployee;
