import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { ROOMS, SKILLS, TIME_FILTERS, BUDGET_FILTERS, SORT_OPTIONS } from '../data/projects';

function ChipRow({ label, options, active, onSelect }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-touch">
      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider shrink-0 w-9">
        {label}
      </span>
      {options.map((opt) => {
        const isActive = active === opt;
        return (
          <button
            key={opt}
            onClick={() => onSelect(isActive ? options[0] : opt)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              isActive
                ? 'bg-amber-500 text-white shadow-sm shadow-amber-200'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default function FilterBar({ filters, onChange, sort, onSort }) {
  const activeCount = [
    filters.room !== 'All',
    filters.skill !== 'All',
    filters.time !== 'All',
    filters.budget !== 'Any budget',
  ].filter(Boolean).length;

  return (
    <div className="bg-white border-b border-stone-100 sticky top-[57px] z-40 px-4 py-2.5 space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <SlidersHorizontal size={12} />
          <span className="font-medium">Filters</span>
          {activeCount > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        {/* Sort dropdown */}
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value)}
            className="appearance-none text-xs text-stone-600 bg-stone-100 rounded-full pl-3 pr-7 py-1.5 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown size={10} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
        </div>
      </div>

      <ChipRow label="Room"   options={ROOMS}          active={filters.room}   onSelect={(v) => onChange({ ...filters, room: v })} />
      <ChipRow label="Skill"  options={SKILLS}         active={filters.skill}  onSelect={(v) => onChange({ ...filters, skill: v })} />
      <ChipRow label="Time"   options={TIME_FILTERS}   active={filters.time}   onSelect={(v) => onChange({ ...filters, time: v })} />
      <ChipRow label="Budget" options={BUDGET_FILTERS} active={filters.budget} onSelect={(v) => onChange({ ...filters, budget: v })} />
    </div>
  );
}
