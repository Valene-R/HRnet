import { Link } from 'react-router-dom';
import { ROUTES } from '../router/routes';

/**
 * Page for creating a new employee
 * @returns {JSX.Element} The CreateEmployee page component
 */
const CreateEmployee = () => {
  return (
    <div className="mt-10 text-center">
      <h1 className="text-3xl font-bold">HRnet</h1>
      <Link to={ROUTES.employeeList} className="text-violet-900 underline">
        View Current Employees
      </Link>
      <h2 className="mt-4 text-2xl">Create Employee</h2>
    </div>
  );
};

export default CreateEmployee;
