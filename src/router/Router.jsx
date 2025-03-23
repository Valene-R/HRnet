import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes';
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
      <Route path={ROUTES.createEmployee} element={<CreateEmployee />} />
      <Route path={ROUTES.employeeList} element={<EmployeeList />} />
    </Routes>
  );
}
