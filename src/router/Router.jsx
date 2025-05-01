import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routes';
import Layout from '../components/Layout';
import CreateEmployee from '../pages/CreateEmployee';
import EmployeeList from '../pages/EmployeeList';
import Home from '../pages/Home';

/**
 * Define and handle the application routes
 * @returns {JSX.Element} The router configuration
 */
export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<Home />} />
      <Route element={<Layout />}>
        <Route path={ROUTES.createEmployee} element={<CreateEmployee />} />
        <Route path={ROUTES.employeeList} element={<EmployeeList />} />
      </Route>

      {/* Redirect all unknown routes to the home page */}
      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  );
}
