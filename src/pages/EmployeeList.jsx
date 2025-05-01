import { useState, useMemo, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import ItemsPerPageSelect from '../components/ItemsPerPageSelect';
import Pagination from '../components/Pagination';
import { mockEmployees } from '../mockData/mockEmployees';
import { formatDateForDisplay, formatToISO } from '../utils/format';
import { useEmployeeStore } from '../store/employeeStore';
import Modal from 'react-custom-modal-tailwindv4';
import EmployeeForm from '../components/EmployeeForm';

// Define the columns structure for the DataTable component
const columns = [
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Start Date', key: 'startDate' },
  { label: 'Department', key: 'department' },
  { label: 'Date of Birth', key: 'dateOfBirth' },
  { label: 'Street', key: 'street' },
  { label: 'City', key: 'city' },
  { label: 'State', key: 'state' },
  { label: 'Zip Code', key: 'zipCode' },
];

/**
 * Page displaying the list of employees
 * @returns {JSX.Element} The EmployeeList page component
 */
const EmployeeList = () => {
  const [search, setSearch] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Use mock data (true) or real data (false)
  const isUsingMockData = false;

  // Load employees from Zustand or use mock data for testing
  const { employees, deleteEmployee, updateEmployee } = useEmployeeStore();
  const employeeListData = isUsingMockData ? mockEmployees : employees;

  // Format the employee dates for display
  const formattedEmployees = useMemo(() => {
    return employeeListData.map((employee) => ({
      ...employee,
      startDate: formatDateForDisplay(employee.startDate),
      dateOfBirth: formatDateForDisplay(employee.dateOfBirth),
    }));
  }, [employeeListData]);

  // Filter employees based on search input
  const filteredEmployees = useMemo(() => {
    const lowerCaseSearch = search.toLowerCase().trim();

    return formattedEmployees.filter((employee) =>
      Object.values(employee).some((value) =>
        // Check if any value (string or number) contains the search term
        typeof value === 'string' || typeof value === 'number'
          ? value.toString().toLowerCase().includes(lowerCaseSearch)
          : false,
      ),
    );
  }, [search, formattedEmployees]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  // Reset currentPage if it exceeds totalPages or if there are no results
  useEffect(() => {
    if (filteredEmployees.length === 0) {
      setCurrentPage(0); // No results
    } else if (currentPage === 0 || currentPage > totalPages) {
      setCurrentPage(1); // Reset to page 1 if results reappear
    }
  }, [filteredEmployees.length, totalPages, currentPage]);

  /**
   * Handle employee editing
   * Convert date fields to ISO format and open the edit modal
   * @param {Object} employee The employee to edit
   */
  const handleEdit = (employee) => {
    // Convert 'MM/DD/YYYY' dates to 'YYYY-MM-DD' format for the form
    const editedEmployee = {
      ...employee,
      startDate: employee.startDate && employee.startDate !== 'N/A' ? formatToISO(employee.startDate) : '',
      dateOfBirth: employee.dateOfBirth && employee.dateOfBirth !== 'N/A' ? formatToISO(employee.dateOfBirth) : '',
    };
    setSelectedEmployee(editedEmployee);
    setIsEditModalOpen(true);
  };

  /**
   * Handle deleting an employee
   * Open the delete confirmation modal
   * @param {Object} employee The employee to delete
   */
  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  /**
   * Confirm the deletion of the selected employee
   */
  const confirmDelete = () => {
    deleteEmployee(selectedEmployee.id);
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
  };

  /**
   * Save the changes made to an employee
   * @param {Object} updatedEmployee The updated employee data
   */
  const handleSave = (updatedEmployee) => {
    if (selectedEmployee) {
      updateEmployee(selectedEmployee.id, updatedEmployee);
      setSelectedEmployee(null);
    }
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-100 px-4 py-8 text-center">
      <div className="w-full max-w-5xl">
        <div className="mb-6 flex w-full max-w-5xl flex-col items-center justify-between gap-x-4 xl:flex-row">
          {/* Dropdown to select the number of displayed entries */}
          <ItemsPerPageSelect
            value={itemsPerPage}
            onChange={setItemsPerPage}
            options={[10, 25, 50, 100]}
            labelBefore="Show"
            labelAfter="entries"
          />

          {/* Search bar */}
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Employee data table */}
        <DataTable
          data={filteredEmployees}
          columns={columns}
          noResultsMessage="No matching records found"
          onEdit={handleEdit}
          onDelete={handleDelete}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />

        {/* Modal with a pre-filled form to edit the selected employee */}
        {isEditModalOpen && (
          <Modal
            title="Edit Employee"
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            type="info"
            showCloseIcon={true}
            customButton={false}
            showActionButtons={true}
            showSaveButton={false} // Disable the Save button
            showCancelButton={true} // Enable the Cancel button
            onCancel={() => setIsEditModalOpen(false)}
          >
            <div className="max-h-[80vh] overflow-y-auto">
              {/* Form reused to edit the selected employee */}
              <EmployeeForm
                existingEmployee={selectedEmployee}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSave} // Save function passed to the form
                showSubmitButton={true}
              />
            </div>
          </Modal>
        )}

        {/* Modal to delete the selected employee */}
        {isDeleteModalOpen && (
          <Modal
            title="Delete Employee"
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            type="warning"
            // Custom buttons to confirm or cancel deletion
            customButton={
              <div className="flex justify-center gap-5">
                <button
                  className="cursor-pointer rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  className="cursor-pointer rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-700"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            }
            message={
              <>
                Are you sure you want to delete{' '}
                <strong className="text-2xl text-black">
                  {selectedEmployee?.firstName} {selectedEmployee?.lastName}
                </strong>{' '}
                ?
              </>
            }
          ></Modal>
        )}

        {/* Pagination to navigate between employee pages */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          totalEntries={filteredEmployees.length}
          totalUnfilteredEntries={formattedEmployees.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default EmployeeList;
