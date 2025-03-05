import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import SearchBar from '../components/SearchBar';

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

      {/* Link back to home */}
      <Link to={ROUTES.home} className="text-violet-900 underline">
        Home
      </Link>
    </div>
  );
};

export default EmployeeList;
