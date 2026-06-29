import { ROOMS, SKILLS, TIME_FILTERS } from '../data/projects';

function ChipRow({ label, options, active, onSelect }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-touch">
      <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider shrink-0 w-10">
        {label}
      </span>
      {options.map((opt) => {
        const isActive = active === opt;
        return (
          <button
            key={opt}
            onClick={() => onSelect(isActive ? (label === 'Room' ? 'All' : 'All') : opt)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
              isActive
                ? 'bg-amber-500 text-white'
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

export default function FilterBar({ filters, onChange }) {
  return (
    <div className="bg-white border-b border-stone-100 sticky top-[57px] z-40 px-4 py-2.5 space-y-2">
      <ChipRow
        label="Room"
        options={ROOMS}
        active={filters.room}
        onSelect={(v) => onChange({ ...filters, room: v })}
      />
      <ChipRow
        label="Skill"
        options={SKILLS}
        active={filters.skill}
        onSelect={(v) => onChange({ ...filters, skill: v })}
      />
      <ChipRow
        label="Time"
        options={TIME_FILTERS}
        active={filters.time}
        onSelect={(v) => onChange({ ...filters, time: v })}
      />
    </div>
  );
}
