import { LayoutGrid, List } from 'lucide-react';
import { useEmployeeListStore } from '@/store/useEmployeeListStore';
import { useFilteredEmployees } from '@/hooks/useFilteredEmployees';
import type { ViewMode } from '@/types/employee';

const viewModes: { value: ViewMode; icon: typeof List; label: string }[] = [
  { value: 'table', icon: List, label: '表格视图' },
  { value: 'card', icon: LayoutGrid, label: '卡片视图' },
];

export function ViewToggle() {
  const viewMode = useEmployeeListStore((s) => s.viewMode);
  const setViewMode = useEmployeeListStore((s) => s.setViewMode);
  const { totalCount } = useFilteredEmployees();
  const allCount = useEmployeeListStore((s) => s.employees.length);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-500">
        共 <span className="font-semibold text-slate-700">{allCount}</span> 人，
        当前显示{' '}
        <span className="font-semibold text-indigo-600">{totalCount}</span> 人
      </span>
      <div className="flex items-center p-0.5 rounded-xl bg-slate-100 border border-slate-200">
        {viewModes.map((mode) => {
          const Icon = mode.icon;
          const isActive = viewMode === mode.value;
          return (
            <button
              key={mode.value}
              onClick={() => setViewMode(mode.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              title={mode.label}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
