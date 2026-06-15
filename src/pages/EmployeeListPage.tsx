import { useEffect } from 'react';
import { Users, Plus } from 'lucide-react';
import { SearchBar } from '@/components/list/SearchBar';
import { FilterBar, FilterTags } from '@/components/list/FilterBar';
import { ViewToggle } from '@/components/list/ViewToggle';
import { TableView } from '@/components/list/TableView';
import { CardView } from '@/components/list/CardView';
import { Pagination } from '@/components/list/Pagination';
import { ListSkeleton } from '@/components/list/ListSkeleton';
import { EmptyState } from '@/components/list/EmptyState';
import { useEmployeeListStore } from '@/store/useEmployeeListStore';
import { useFilteredEmployees } from '@/hooks/useFilteredEmployees';

export default function EmployeeListPage() {
  const isLoading = useEmployeeListStore((s) => s.isLoading);
  const viewMode = useEmployeeListStore((s) => s.viewMode);
  const loadEmployees = useEmployeeListStore((s) => s.loadEmployees);
  const { totalCount } = useFilteredEmployees();

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const hasResults = totalCount > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                员工档案管理
              </h1>
              <p className="text-sm text-slate-400">
                上海星辰科技有限公司 · HR 系统
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled
              className="group relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
              title="功能开发中"
            >
              <Plus className="w-4 h-4" />
              <span>新增员工</span>
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="px-2.5 py-1.5 text-xs text-white bg-slate-800 rounded-lg whitespace-nowrap shadow-lg">
                  功能开发中，敬请期待
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] p-4 mb-5">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <SearchBar />
            <FilterBar />
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100">
            <FilterTags />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <ViewToggle />
        </div>

        {isLoading ? (
          <ListSkeleton />
        ) : !hasResults ? (
          <EmptyState type="no-results" />
        ) : (
          <div className="space-y-4">
            {viewMode === 'table' ? <TableView /> : <CardView />}
            <Pagination />
          </div>
        )}
      </div>
    </div>
  );
}
