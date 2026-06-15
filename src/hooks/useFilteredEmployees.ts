import { useMemo } from 'react';
import { useEmployeeListStore } from '@/store/useEmployeeListStore';
import type { EmployeeListItem } from '@/types/employee';

export function useFilteredEmployees() {
  const employees = useEmployeeListStore((s) => s.employees);
  const searchKeyword = useEmployeeListStore((s) => s.searchKeyword);
  const statusFilter = useEmployeeListStore((s) => s.statusFilter);
  const departmentFilters = useEmployeeListStore((s) => s.departmentFilters);
  const yearFilter = useEmployeeListStore((s) => s.yearFilter);
  const sortField = useEmployeeListStore((s) => s.sortField);
  const sortOrder = useEmployeeListStore((s) => s.sortOrder);
  const currentPage = useEmployeeListStore((s) => s.currentPage);
  const pageSize = useEmployeeListStore((s) => s.pageSize);

  const filtered = useMemo(() => {
    let result = [...employees];

    if (searchKeyword) {
      const kw = searchKeyword.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(kw) ||
          e.employeeId.toLowerCase().includes(kw) ||
          e.department.toLowerCase().includes(kw) ||
          e.position.toLowerCase().includes(kw)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((e) => e.status === statusFilter);
    }

    if (departmentFilters.length > 0) {
      result = result.filter((e) => departmentFilters.includes(e.department));
    }

    if (yearFilter) {
      result = result.filter((e) => e.hireDate.startsWith(yearFilter));
    }

    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'hireDate':
          comparison = a.hireDate.localeCompare(b.hireDate);
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name, 'zh-CN');
          break;
        case 'department':
          comparison = a.department.localeCompare(b.department, 'zh-CN');
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [employees, searchKeyword, statusFilter, departmentFilters, yearFilter, sortField, sortOrder]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;

  return {
    filtered,
    paginated,
    totalPages,
    totalCount: filtered.length,
  };
}

export function getRowIndex(
  item: EmployeeListItem,
  list: EmployeeListItem[],
  currentPage: number,
  pageSize: number
): number {
  const idx = list.findIndex((e) => e.employeeId === item.employeeId);
  if (idx === -1) return 0;
  return idx + 1 + (currentPage - 1) * pageSize;
}
