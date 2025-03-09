import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import ItemsPerPageSelect from '../components/ItemsPerPageSelect';
import { mockEmployees } from '../mockData/mockEmployees';
import { formatDateForDisplay } from '../utils/format';

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

// Create a new employee list with properly formatted dates
const formattedEmployees = mockEmployees.map((employee) => ({
  ...employee,
  startDate: formatDateForDisplay(employee.startDate),
  dateOfBirth: formatDateForDisplay(employee.dateOfBirth),
}));

/**
 * Page displaying the list of employees
 * @returns {JSX.Element} The EmployeeList page component
 */
const EmployeeList = () => {
  const [search, setSearch] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
  }, [search]);

  // Paginate the filtered employees
  const paginatedEmployees = useMemo(() => {
    return filteredEmployees.slice(0, itemsPerPage);
  }, [filteredEmployees, itemsPerPage]);

  return (
    <div className="mx-5 mt-10 text-center">
      <h1 className="text-3xl font-bold">Current Employees</h1>

      <div className="mb-4 flex items-center justify-between">
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

      {/* Link back to home */}
      <Link to={ROUTES.home} className="text-violet-900 underline">
        Home
      </Link>
    </div>
  );
};

export default EmployeeList;
