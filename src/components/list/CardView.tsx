import { useNavigate } from 'react-router-dom';
import { AlertTriangle, BadgeCheck, User } from 'lucide-react';
import { useEmployeeListStore } from '@/store/useEmployeeListStore';
import { useFilteredEmployees } from '@/hooks/useFilteredEmployees';
import { formatDate } from '@/utils/dateUtils';
import type { EmployeeListItem } from '@/types/employee';

const STATUS_STYLES: Record<string, string> = {
  在职: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  试用期: 'bg-sky-50 text-sky-700 border-sky-100',
  离职: 'bg-slate-50 text-slate-600 border-slate-200',
  停薪留职: 'bg-amber-50 text-amber-700 border-amber-100',
};

export function CardView() {
  const navigate = useNavigate();
  const { paginated } = useFilteredEmployees();
  const currentEmployeeId = useEmployeeListStore((s) => s.currentEmployeeId);
  const setCurrentEmployeeId = useEmployeeListStore((s) => s.setCurrentEmployeeId);

  const handleCardClick = (emp: EmployeeListItem) => {
    setCurrentEmployeeId(emp.employeeId);
    navigate(`/employee/${emp.employeeId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {paginated.map((emp) => {
        const isCurrent = currentEmployeeId === emp.employeeId;
        return (
          <div
            key={emp.employeeId}
            onClick={() => handleCardClick(emp)}
            className={`group relative bg-white rounded-2xl border shadow-sm p-5 cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 ${
              isCurrent
                ? 'border-indigo-300 ring-2 ring-indigo-100'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            {isCurrent && (
              <div className="absolute -top-2 -right-2 z-10">
                <div className="bg-indigo-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  当前查看
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 mb-3">
              <div className="relative shrink-0">
                <img
                  src={emp.avatar}
                  alt={emp.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-sm"
                />
                {emp.hasExpiringContract && (
                  <div
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center"
                    title="合同即将到期"
                  >
                    <AlertTriangle className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-semibold text-slate-800 truncate">
                    {emp.name}
                  </h3>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {emp.employeeId}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border ${
                    STATUS_STYLES[emp.status] ||
                    'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  {emp.status}
                </span>
                <span className="text-xs text-slate-400">
                  {emp.level.split('-')[0]}
                </span>
              </div>

              <div className="text-sm text-slate-600 truncate" title={emp.position}>
                {emp.position}
              </div>

              <div className="text-xs text-slate-400 truncate" title={emp.department}>
                {emp.department}
              </div>

              <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100">
                <div className="text-xs text-slate-400">
                  入职{' '}
                  <span className="text-slate-500 font-medium">
                    {formatDate(emp.hireDate)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <User className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[80px]">{emp.supervisor}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
