import { useState, useRef, useEffect } from 'react';
import {
  Filter,
  ChevronDown,
  X,
  Building2,
  Calendar,
  UserCheck,
} from 'lucide-react';
import { useEmployeeListStore } from '@/store/useEmployeeListStore';
import { departments, workStatuses, hireYears } from '@/data/mockEmployeeList';
import type { WorkStatus } from '@/types/employee';

const statusOptions: { value: WorkStatus | 'all'; label: string; color: string }[] = [
  { value: 'all', label: '全部', color: 'bg-slate-100 text-slate-600' },
  { value: '在职', label: '在职', color: 'bg-emerald-100 text-emerald-700' },
  { value: '试用期', label: '试用期', color: 'bg-sky-100 text-sky-700' },
  { value: '离职', label: '离职', color: 'bg-slate-100 text-slate-600' },
  { value: '停薪留职', label: '停薪留职', color: 'bg-amber-100 text-amber-700' },
];

export function FilterBar() {
  const statusFilter = useEmployeeListStore((s) => s.statusFilter);
  const departmentFilters = useEmployeeListStore((s) => s.departmentFilters);
  const yearFilter = useEmployeeListStore((s) => s.yearFilter);
  const setStatusFilter = useEmployeeListStore((s) => s.setStatusFilter);
  const toggleDepartmentFilter = useEmployeeListStore((s) => s.toggleDepartmentFilter);
  const clearDepartmentFilters = useEmployeeListStore((s) => s.clearDepartmentFilters);
  const setYearFilter = useEmployeeListStore((s) => s.setYearFilter);
  const clearAllFilters = useEmployeeListStore((s) => s.clearAllFilters);

  const [deptOpen, setDeptOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const deptRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (deptRef.current && !deptRef.current.contains(e.target as Node)) {
        setDeptOpen(false);
      }
      if (yearRef.current && !yearRef.current.contains(e.target as Node)) {
        setYearOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeFilterCount =
    (statusFilter !== 'all' ? 1 : 0) +
    departmentFilters.length +
    (yearFilter ? 1 : 0);

  const getStatusLabel = () => {
    const opt = statusOptions.find((s) => s.value === statusFilter);
    return opt?.label || '全部';
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
        <UserCheck className="w-4 h-4 text-slate-500" />
        <span className="text-xs text-slate-500 mr-1">状态</span>
        <div className="flex gap-1">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                statusFilter === opt.value
                  ? `${opt.color} ring-1 ring-inset ring-current/10`
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative" ref={deptRef}>
        <button
          onClick={() => {
            setDeptOpen(!deptOpen);
            setYearOpen(false);
          }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border shadow-sm transition-all ${
            departmentFilters.length > 0
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>部门 {departmentFilters.length > 0 && `(${departmentFilters.length})`}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${deptOpen ? 'rotate-180' : ''}`} />
        </button>
        {deptOpen && (
          <div className="absolute top-full left-0 mt-2 w-72 max-h-80 overflow-y-auto bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-30">
            {departmentFilters.length > 0 && (
              <div className="px-3 pb-2 mb-1 border-b border-slate-100">
                <button
                  onClick={clearDepartmentFilters}
                  className="text-xs text-indigo-600 hover:text-indigo-700"
                >
                  清除部门筛选
                </button>
              </div>
            )}
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => toggleDepartmentFilter(dept)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors flex items-center justify-between ${
                  departmentFilters.includes(dept) ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'
                }`}
              >
                <span className="truncate">{dept}</span>
                {departmentFilters.includes(dept) && (
                  <X className="w-3.5 h-3.5 shrink-0" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative" ref={yearRef}>
        <button
          onClick={() => {
            setYearOpen(!yearOpen);
            setDeptOpen(false);
          }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border shadow-sm transition-all ${
            yearFilter
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>入职年份 {yearFilter && `(${yearFilter})`}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${yearOpen ? 'rotate-180' : ''}`} />
        </button>
        {yearOpen && (
          <div className="absolute top-full left-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-30">
            <button
              onClick={() => {
                setYearFilter(null);
                setYearOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors ${
                !yearFilter ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'
              }`}
            >
              全部年份
            </button>
            {hireYears.map((year) => (
              <button
                key={year}
                onClick={() => {
                  setYearFilter(yearFilter === year ? null : year);
                  setYearOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors ${
                  yearFilter === year ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'
                }`}
              >
                {year} 年
              </button>
            ))}
          </div>
        )}
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearAllFilters}
          className="flex items-center gap-1 px-2.5 py-2 text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          <span>清除全部</span>
        </button>
      )}
    </div>
  );
}

export function FilterTags() {
  const statusFilter = useEmployeeListStore((s) => s.statusFilter);
  const departmentFilters = useEmployeeListStore((s) => s.departmentFilters);
  const yearFilter = useEmployeeListStore((s) => s.yearFilter);
  const setStatusFilter = useEmployeeListStore((s) => s.setStatusFilter);
  const toggleDepartmentFilter = useEmployeeListStore((s) => s.toggleDepartmentFilter);
  const setYearFilter = useEmployeeListStore((s) => s.setYearFilter);

  const tags: { label: string; onRemove: () => void }[] = [];

  if (statusFilter !== 'all') {
    tags.push({
      label: `状态：${statusFilter}`,
      onRemove: () => setStatusFilter('all'),
    });
  }
  if (yearFilter) {
    tags.push({
      label: `入职：${yearFilter}年`,
      onRemove: () => setYearFilter(null),
    });
  }
  departmentFilters.forEach((dept) => {
    tags.push({
      label: dept,
      onRemove: () => toggleDepartmentFilter(dept),
    });
  });

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-slate-400 flex items-center gap-1">
        <Filter className="w-3.5 h-3.5" />
        筛选：
      </span>
      {tags.map((tag, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100"
        >
          {tag.label}
          <button
            onClick={tag.onRemove}
            className="hover:bg-indigo-100 rounded-full p-0.5 -mr-0.5 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
    </div>
  );
}
