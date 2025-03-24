import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import ItemsPerPageSelect from '../components/ItemsPerPageSelect';
import Pagination from '../components/Pagination';
import { mockEmployees } from '../mockData/mockEmployees';
import { formatDateForDisplay } from '../utils/format';
import { useEmployeeStore } from '../store/employeeStore';

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

  // Use mock data (true) or real data (false)
  const isUsingMockData = false;

  // Load employees from Zustand or use mock data for testing
  const { employees } = useEmployeeStore();
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

  // Paginate the filtered employees
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEmployees.slice(startIndex, endIndex);
  }, [filteredEmployees, itemsPerPage, currentPage]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-100 px-4 py-8 text-center">
      <h1 className="mb-6 text-4xl font-bold text-[#5A6B40]">Current Employees</h1>

      <div className="flex gap-x-7">
        {/* Link back to home */}
        <Link
          to={ROUTES.home}
          className="mb-6 cursor-pointer text-lg text-[#779432] underline transition-transform hover:scale-105 hover:text-[#485330]"
        >
          Home
        </Link>
        {/* Link back to form employee creation */}
        <Link
          to={ROUTES.createEmployee}
          className="mb-6 cursor-pointer text-lg text-[#779432] underline transition-transform hover:scale-105 hover:text-[#485330]"
        >
          Create employee
        </Link>
      </div>

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
        <DataTable data={paginatedEmployees} columns={columns} noResultsMessage="No matching records found" />

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
