import { create } from 'zustand';
import type {
  EmployeeListItem,
  WorkStatus,
  ViewMode,
  SortField,
  SortOrder,
} from '@/types/employee';
import { mockEmployeeList } from '@/data/mockEmployeeList';

interface ListState {
  employees: EmployeeListItem[];
  isLoading: boolean;
  viewMode: ViewMode;
  searchKeyword: string;
  statusFilter: WorkStatus | 'all';
  departmentFilters: string[];
  yearFilter: string | null;
  sortField: SortField;
  sortOrder: SortOrder;
  currentPage: number;
  pageSize: number;
  currentEmployeeId: string | null;
  hasLoaded: boolean;

  loadEmployees: () => Promise<void>;
  setViewMode: (mode: ViewMode) => void;
  setSearchKeyword: (keyword: string) => void;
  setStatusFilter: (status: WorkStatus | 'all') => void;
  toggleDepartmentFilter: (dept: string) => void;
  clearDepartmentFilters: () => void;
  setYearFilter: (year: string | null) => void;
  setSortField: (field: SortField) => void;
  toggleSortOrder: () => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setCurrentEmployeeId: (id: string | null) => void;
  clearAllFilters: () => void;
}

export const useEmployeeListStore = create<ListState>((set, get) => ({
  employees: [],
  isLoading: false,
  viewMode: 'table',
  searchKeyword: '',
  statusFilter: 'all',
  departmentFilters: [],
  yearFilter: null,
  sortField: 'hireDate',
  sortOrder: 'desc',
  currentPage: 1,
  pageSize: 10,
  currentEmployeeId: null,
  hasLoaded: false,

  loadEmployees: async () => {
    if (get().hasLoaded) return;
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 600));
    set({ employees: mockEmployeeList, isLoading: false, hasLoaded: true });
  },

  setViewMode: (mode) => set({ viewMode: mode }),

  setSearchKeyword: (keyword) =>
    set({ searchKeyword: keyword, currentPage: 1 }),

  setStatusFilter: (status) =>
    set({ statusFilter: status, currentPage: 1 }),

  toggleDepartmentFilter: (dept) =>
    set((state) => {
      const filters = state.departmentFilters.includes(dept)
        ? state.departmentFilters.filter((d) => d !== dept)
        : [...state.departmentFilters, dept];
      return { departmentFilters: filters, currentPage: 1 };
    }),

  clearDepartmentFilters: () =>
    set({ departmentFilters: [], currentPage: 1 }),

  setYearFilter: (year) => set({ yearFilter: year, currentPage: 1 }),

  setSortField: (field) =>
    set((state) => {
      if (state.sortField === field) {
        return { sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' };
      }
      return { sortField: field, sortOrder: 'desc' };
    }),

  toggleSortOrder: () =>
    set((state) => ({
      sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
    })),

  setCurrentPage: (page) => set({ currentPage: page }),

  setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),

  setCurrentEmployeeId: (id) => set({ currentEmployeeId: id }),

  clearAllFilters: () =>
    set({
      searchKeyword: '',
      statusFilter: 'all',
      departmentFilters: [],
      yearFilter: null,
      currentPage: 1,
    }),
}));
