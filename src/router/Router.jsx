import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routes';
import CreateEmployee from '../pages/CreateEmployee';
import EmployeeList from '../pages/EmployeeList';

/**
 * Define and handle the application routes
 * @returns {JSX.Element} The router configuration
 */
export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<Navigate to={ROUTES.createEmployee} replace />} />
      <Route path={ROUTES.createEmployee} element={<CreateEmployee />} />
      <Route path={ROUTES.employeeList} element={<EmployeeList />} />
    </Routes>
  );
}
