import { LayoutGrid, List } from 'lucide-react';
import { useEmployeeListStore } from '@/store/useEmployeeListStore';
import { cn } from '@/lib/utils';

function TableSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-pulse">
      <div className="bg-slate-50/50 border-b border-slate-100 px-4 py-3">
        <div className="flex gap-4">
          <div className="w-8 h-4 bg-slate-200 rounded" />
          <div className="w-32 h-4 bg-slate-200 rounded" />
          <div className="flex-1 h-4 bg-slate-200 rounded" />
          <div className="w-24 h-4 bg-slate-200 rounded" />
          <div className="w-20 h-4 bg-slate-200 rounded" />
          <div className="w-24 h-4 bg-slate-200 rounded" />
          <div className="w-20 h-4 bg-slate-200 rounded" />
        </div>
      </div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="px-4 py-3.5 flex items-center gap-4">
            <div className="w-8 h-4 bg-slate-100 rounded" />
            <div className="flex items-center gap-3 w-56">
              <div className="w-9 h-9 bg-slate-200 rounded-full" />
              <div className="space-y-1.5 flex-1">
                <div className="w-20 h-3.5 bg-slate-200 rounded" />
                <div className="w-16 h-2.5 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="flex-1 h-3.5 bg-slate-100 rounded" />
            <div className="w-24 h-3.5 bg-slate-100 rounded" />
            <div className="w-16 h-6 bg-slate-100 rounded-lg" />
            <div className="w-24 h-3.5 bg-slate-100 rounded font-mono" />
            <div className="w-16 h-3.5 bg-slate-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 bg-slate-200 rounded-xl shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="w-20 h-4 bg-slate-200 rounded" />
              <div className="w-16 h-3 bg-slate-100 rounded" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-3 bg-slate-100 rounded" />
            <div className="w-3/4 h-3 bg-slate-100 rounded" />
            <div className="w-1/2 h-3 bg-slate-100 rounded" />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="w-20 h-3 bg-slate-100 rounded" />
              <div className="w-16 h-3 bg-slate-100 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ListSkeleton() {
  const viewMode = useEmployeeListStore((s) => s.viewMode);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-80 h-10 bg-white border border-slate-200 rounded-xl animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-32 h-4 bg-slate-200 rounded animate-pulse" />
          <div className="w-20 h-8 bg-slate-100 rounded-xl animate-pulse" />
        </div>
      </div>
      {viewMode === 'table' ? <TableSkeleton /> : <CardSkeleton />}
    </div>
  );
}
