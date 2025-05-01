import { useLocation, Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { ROUTES } from '../router/routes';

/**
 * Determine the dynamic page title based on the current route
 * @param {string} pathname The current location pathname
 * @returns {string} The page title to display
 */
const getTitle = (pathname) => {
  switch (pathname) {
    case ROUTES.createEmployee:
      return 'Create Employee';
    case ROUTES.employeeList:
      return 'Current Employees';
    case ROUTES.home:
    default:
      return 'Welcome to HRnet';
  }
};

/**
 * Main layout component wrapping pages with shared layout and styles
 * @returns {JSX.Element} The layout structure
 */
const Layout = () => {
  const { pathname } = useLocation();
  const containerWidth = pathname === ROUTES.employeeList ? 'max-w-5xl' : 'max-w-lg';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-8 text-center">
      <header>
        <h1 className="mb-6 text-4xl font-bold text-[#485330]">{getTitle(pathname)}</h1>
      </header>

      <div className={`w-full ${containerWidth}`}>
        <Navigation />

        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
