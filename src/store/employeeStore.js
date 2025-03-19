import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
          employees: [...state.employees, employee],
        })),
    }),
    {
      name: 'employee-storage', // Local storage key
    },
  ),
);
