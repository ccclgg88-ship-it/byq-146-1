import { useNavigate } from 'react-router-dom';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  BadgeCheck,
} from 'lucide-react';
import { useEmployeeListStore } from '@/store/useEmployeeListStore';
import { useFilteredEmployees } from '@/hooks/useFilteredEmployees';
import { formatDate } from '@/utils/dateUtils';
import type { SortField, EmployeeListItem } from '@/types/employee';
import { cn } from '@/lib/utils';

interface SortHeaderProps {
  field: SortField;
  label: string;
  className?: string;
}

function SortHeader({ field, label, className }: SortHeaderProps) {
  const sortField = useEmployeeListStore((s) => s.sortField);
  const sortOrder = useEmployeeListStore((s) => s.sortOrder);
  const setSortField = useEmployeeListStore((s) => s.setSortField);

  const isActive = sortField === field;

  return (
    <th
      className={cn(
        'px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer select-none hover:bg-slate-50/70 transition-colors',
        className
      )}
      onClick={() => setSortField(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        {isActive ? (
          sortOrder === 'asc' ? (
            <ArrowUp className="w-3.5 h-3.5 text-indigo-600" />
          ) : (
            <ArrowDown className="w-3.5 h-3.5 text-indigo-600" />
          )
        ) : (
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-300" />
        )}
      </div>
    </th>
  );
}

const STATUS_STYLES: Record<string, string> = {
  在职: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  试用期: 'bg-sky-50 text-sky-700 border-sky-100',
  离职: 'bg-slate-50 text-slate-600 border-slate-200',
  停薪留职: 'bg-amber-50 text-amber-700 border-amber-100',
};

export function TableView() {
  const navigate = useNavigate();
  const { paginated, filtered } = useFilteredEmployees();
  const currentPage = useEmployeeListStore((s) => s.currentPage);
  const pageSize = useEmployeeListStore((s) => s.pageSize);
  const currentEmployeeId = useEmployeeListStore((s) => s.currentEmployeeId);
  const setCurrentEmployeeId = useEmployeeListStore((s) => s.setCurrentEmployeeId);

  const handleRowClick = (emp: EmployeeListItem) => {
    setCurrentEmployeeId(emp.employeeId);
    navigate(`/employee/${emp.employeeId}`);
  };

  const startIdx = (currentPage - 1) * pageSize;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-14">
                #
              </th>
              <SortHeader field="name" label="员工" className="w-56" />
              <SortHeader field="department" label="部门" />
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-40">
                岗位
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-28">
                在职状态
              </th>
              <SortHeader field="hireDate" label="入职日期" className="w-36" />
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">
                直属上级
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginated.map((emp, idx) => (
              <tr
                key={emp.employeeId}
                onClick={() => handleRowClick(emp)}
                className={`cursor-pointer transition-colors group ${
                  currentEmployeeId === emp.employeeId
                    ? 'bg-indigo-50/60'
                    : 'hover:bg-slate-50/60'
                }`}
              >
                <td className="px-4 py-3.5 text-sm text-slate-400 font-mono">
                  {startIdx + idx + 1}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm"
                      />
                      {emp.hasExpiringContract && (
                        <div
                          className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center"
                          title="合同即将到期"
                        >
                          <AlertTriangle className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-slate-800 truncate">
                          {emp.name}
                        </span>
                        {currentEmployeeId === emp.employeeId && (
                          <BadgeCheck className="w-4 h-4 text-indigo-500" />
                        )}
                      </div>
                      <div className="text-xs text-slate-400 font-mono truncate">
                        {emp.employeeId}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-sm text-slate-600 truncate max-w-xs">
                  {emp.department}
                </td>
                <td className="px-4 py-3.5 text-sm text-slate-600">
                  <div className="truncate max-w-[200px]">{emp.position}</div>
                  <div className="text-xs text-slate-400">{emp.level}</div>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-lg border ${
                      STATUS_STYLES[emp.status] ||
                      'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-sm text-slate-500 font-mono">
                  {formatDate(emp.hireDate)}
                </td>
                <td className="px-4 py-3.5 text-sm text-slate-500 truncate">
                  {emp.supervisor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
