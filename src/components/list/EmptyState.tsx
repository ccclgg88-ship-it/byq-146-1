import { SearchX, RotateCcw } from 'lucide-react';
import { useEmployeeListStore } from '@/store/useEmployeeListStore';

interface EmptyStateProps {
  type: 'no-results' | 'no-data';
}

export function EmptyState({ type }: EmptyStateProps) {
  const clearAllFilters = useEmployeeListStore((s) => s.clearAllFilters);

  if (type === 'no-data') {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-20 h-20 mb-5 rounded-2xl bg-slate-50 flex items-center justify-center">
          <SearchX className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">暂无员工数据</h3>
        <p className="text-sm text-slate-400 mb-6">员工档案列表为空，请添加员工后再查看</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-slate-200 border-dashed">
      <div className="w-20 h-20 mb-5 rounded-2xl bg-amber-50 flex items-center justify-center">
        <SearchX className="w-10 h-10 text-amber-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mb-2">未找到匹配的员工</h3>
      <p className="text-sm text-slate-400 mb-6">没有符合当前筛选条件的员工，请调整筛选条件后重试</p>
      <button
        onClick={clearAllFilters}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-sm shadow-indigo-500/25 transition-all hover:-translate-y-0.5"
      >
        <RotateCcw className="w-4 h-4" />
        清除筛选条件
      </button>
    </div>
  );
}
