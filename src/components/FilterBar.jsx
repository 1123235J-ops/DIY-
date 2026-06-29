import { Search, X } from 'lucide-react';
import { ROOMS, SKILLS, TIME_FILTERS } from '../data/projects';

export default function FilterBar({ filters, onChange }) {
  const { search, room, skill, time } = filters;

  const pill = (label, active, onClick) => (
    <button
      key={label}
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
        active
          ? 'bg-amber-500 text-white'
          : 'bg-white border border-stone-200 text-stone-600 hover:border-amber-400 hover:text-amber-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white border-b border-stone-200 sticky top-[57px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 space-y-3">
        {/* Search */}
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-8 py-2 border border-stone-200 rounded-full text-sm focus:outline-none focus:border-amber-400 bg-stone-50"
          />
          {search && (
            <button
              onClick={() => onChange({ ...filters, search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter rows */}
        <div className="space-y-2 overflow-hidden">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <span className="text-xs text-stone-400 font-medium self-center shrink-0">Room</span>
            {ROOMS.map((r) =>
              pill(r, room === r, () => onChange({ ...filters, room: r }))
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <span className="text-xs text-stone-400 font-medium self-center shrink-0">Skill</span>
            {SKILLS.map((s) =>
              pill(s, skill === s, () => onChange({ ...filters, skill: s }))
            )}
            <span className="text-xs text-stone-400 font-medium self-center shrink-0 ml-2">Time</span>
            {TIME_FILTERS.map((t) =>
              pill(t, time === t, () => onChange({ ...filters, time: t }))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
