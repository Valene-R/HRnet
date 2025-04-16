import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

/**
 * Zustand store for managing employees
 * The store persists data in localStorage to retain state across page reloads
 */
export const useEmployeeStore = create(
  persist(
    (set) => ({
      employees: [], // List of stored employees

      // Add a new employee to the list
      addEmployee: (employee) =>
        set((state) => ({
          employees: [
            ...state.employees,
            { ...employee, id: nanoid() }, // Generate a unique ID for each new employee
          ],
        })),

      // Delete an employee by ID
      deleteEmployee: (id) =>
        set((state) => ({
          employees: state.employees.filter((employee) => employee.id !== id),
        })),

      // Update an employee's data by matching their ID
      updateEmployee: (id, updatedData) =>
        set((state) => ({
          employees: state.employees.map((employee) =>
            employee.id === id ? { ...employee, ...updatedData } : employee,
          ),
        })),
    }),
    {
      name: 'employee-storage', // Local storage key
    },
  ),
);
