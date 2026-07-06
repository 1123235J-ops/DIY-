import { Search, X, SlidersHorizontal } from 'lucide-react';

export default function Header({ search, onSearch, filterCount, onFilterOpen }) {
  return (
    <header className="bg-white border-b border-stone-100 sticky top-0 z-50">
      <div className="flex items-center gap-2 px-4 py-3">
        <div className="font-black text-stone-900 text-xl tracking-tight shrink-0 leading-none">
          Build<span className="text-amber-500">It</span>
        </div>

        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <input
            type="search"
            placeholder="Search 130+ projects…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-8 pr-7 py-2 bg-stone-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
          />
          {search && (
            <button
              onClick={() => onSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X size={13} />
            </button>
          )}
        </div>

        <button
          onClick={onFilterOpen}
          className={`relative shrink-0 w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
            filterCount > 0 ? 'bg-amber-500 text-white' : 'bg-stone-100 text-stone-600'
          }`}
          aria-label="Filters"
        >
          <SlidersHorizontal size={16} />
          {filterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {filterCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
