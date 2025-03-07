import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
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

  return (
    <div className="mt-10 text-center">
      <h1 className="text-3xl font-bold">Current Employees</h1>

      {/* Search bar */}
      <SearchBar value={search} onChange={setSearch} />

      {/* Employee data table */}
      <DataTable data={formattedEmployees} columns={columns} />

      {/* Link back to home */}
      <Link to={ROUTES.home} className="text-violet-900 underline">
        Home
      </Link>
    </div>
  );
};

export default EmployeeList;
