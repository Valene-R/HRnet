import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../router/routes';

/**
 * Navigation that adapts to the current route
 * @returns {JSX.Element} The navigation component
 */
const Navigation = () => {
  const { pathname } = useLocation();

  const linkStyles = 'text-lg text-[#779432] underline transition-transform hover:scale-105 hover:text-[#485330]';

  return (
    <nav className="flex justify-center gap-x-7">
      {/* Link back to home : always visible */}
      <Link to={ROUTES.home} className={linkStyles}>
        Home
      </Link>

      {/* Link to the current list of employees : display only when on /create-employee */}
      {pathname === ROUTES.createEmployee && (
        <Link to={ROUTES.employeeList} className={linkStyles}>
          View Current Employees
        </Link>
      )}

      {/* Link back to form employee creation : display only when on /employee-list */}
      {pathname === ROUTES.employeeList && (
        <Link to={ROUTES.createEmployee} className={linkStyles}>
          Create employee
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
