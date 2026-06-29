import { Hammer, Search, X } from 'lucide-react';

export default function Header({ search, onSearch }) {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-amber-500 p-1.5 rounded-lg">
            <Hammer size={18} className="text-white" />
          </div>
          <span className="font-bold text-stone-900 tracking-tight">
            Build<span className="text-amber-500">It</span>
          </span>
        </div>

        {/* Search bar — takes remaining width */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <input
            type="search"
            placeholder="Search 42 projects..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-stone-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-colors"
          />
          {search && (
            <button
              onClick={() => onSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
