import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useEmployeeListStore } from '@/store/useEmployeeListStore';

export function SearchBar() {
  const setSearchKeyword = useEmployeeListStore((s) => s.setSearchKeyword);
  const searchKeyword = useEmployeeListStore((s) => s.searchKeyword);
  const [inputValue, setInputValue] = useState(searchKeyword);

  useEffect(() => {
    setInputValue(searchKeyword);
  }, [searchKeyword]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchKeyword(inputValue.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, setSearchKeyword]);

  return (
    <div className="relative flex-1 max-w-xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        type="text"
        placeholder="搜索姓名、工号、部门、岗位..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full pl-12 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/80 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white transition-all"
      />
      {inputValue && (
        <button
          onClick={() => setInputValue('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200/70 text-slate-400 hover:text-slate-600 transition-colors"
          title="清除搜索"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
