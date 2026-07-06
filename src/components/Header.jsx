import { Hammer, Search, X } from 'lucide-react';

export default function Header({ search, onSearch, totalCount }) {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-amber-500 p-1.5 rounded-lg shadow-sm shadow-amber-200">
            <Hammer size={17} className="text-white" />
          </div>
          <div className="leading-none">
            <span className="font-black text-stone-900 tracking-tight text-base">Build</span>
            <span className="font-black text-amber-500 tracking-tight text-base">It</span>
            {totalCount && (
              <span className="ml-1.5 text-[10px] font-semibold text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded-full">
                {totalCount} projects
              </span>
            )}
          </div>
        </div>

        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <input
            type="search"
            placeholder="Search projects, styles…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-8 pr-8 py-2 bg-stone-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
          />
          {search && (
            <button
              onClick={() => onSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
