import { useEmployeeStore } from '../store/employeeStore';
import { mockEmployees } from '../mockData/mockEmployees';

// Use mock data (true) or real data (false)
export const isUsingMockData = false;

/**
 * Get the employee list, either from the mock or Zustand store
 * @returns {Array} List of employees
 */
export const getEmployeeList = () => {
  const { employees } = useEmployeeStore.getState();
  return isUsingMockData ? mockEmployees : employees;
};
