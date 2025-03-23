import { Link } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import logo from '../assets/logo_WealthHealth.png';

/**
 * Home page of the HRnet application, displaying a welcome message and logo with a button to enter the application
 * @returns {JSX.Element} The Home page component
 */
const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-8 bg-gray-100 text-center">
      <div className="flex flex-col justify-center">
        <img src={logo} alt="HRNet Logo" className="h-auto max-w-xs" />
        <div className="mt-4 text-center">
          <p className="text-lg font-bold tracking-wider text-[#485330]">
            <span className="text-2xl">W</span>EALTH <span className="text-2xl">H</span>EALTH
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-4xl font-bold text-gray-800">Welcome to HRnet</h1>
        <p className="mt-2 text-lg text-gray-600">Your Employee Management Solution</p>
      </div>

      <Link
        to={ROUTES.createEmployee}
        className="mt-6 transform rounded-lg bg-[#779432] px-6 py-3 text-lg font-bold text-white transition-transform hover:scale-105 hover:bg-[#485330]"
        aria-label="Enter HRNet Application"
      >
        Enter
      </Link>
    </div>
  );
};

export default Home;
