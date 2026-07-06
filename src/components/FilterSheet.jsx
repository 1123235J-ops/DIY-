import { useEffect } from 'react';
import { X } from 'lucide-react';
import { ROOMS, SKILLS, TIME_FILTERS, BUDGET_MAX, SORT_OPTIONS } from '../data/projects';

const BUDGETS = Object.keys(BUDGET_MAX);

function ChipGroup({ label, options, value, onChange }) {
  return (
    <div className="mb-5">
      <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              value === opt
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FilterSheet({ isOpen, onClose, filters, onChange, sort, onSort, onReset }) {
  useEffect(() => {
    if (!isOpen) return;
    const h = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', h);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const update = (key) => (val) => onChange({ ...filters, [key]: val });
  const activeSort = SORT_OPTIONS.find((s) => s.value === sort);

  return (
    <div className="fixed inset-0 z-[60] flex items-end" role="dialog" aria-modal>
      <div className="absolute inset-0 bg-black/40 fade-enter" onClick={onClose} />
      <div className="relative bg-white w-full rounded-t-3xl max-h-[85dvh] flex flex-col sheet-enter shadow-2xl">
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-stone-100 shrink-0">
          <h2 className="font-bold text-stone-900 text-base">Filter &amp; Sort</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 text-stone-600"
          >
            <X size={16} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-4 no-scroll scroll-ios">
          <ChipGroup
            label="Sort by"
            options={SORT_OPTIONS.map((s) => s.label)}
            value={activeSort?.label}
            onChange={(val) => onSort(SORT_OPTIONS.find((s) => s.label === val)?.value ?? 'popular')}
          />
          <ChipGroup label="Room" options={ROOMS} value={filters.room} onChange={update('room')} />
          <ChipGroup label="Skill level" options={SKILLS} value={filters.skill} onChange={update('skill')} />
          <ChipGroup label="Time available" options={TIME_FILTERS} value={filters.time} onChange={update('time')} />
          <ChipGroup label="Budget" options={BUDGETS} value={filters.budget} onChange={update('budget')} />
        </div>

        <div className="shrink-0 px-5 pt-3 border-t border-stone-100 flex gap-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <button
            onClick={() => { onReset(); onClose(); }}
            className="flex-1 py-3 rounded-2xl border-2 border-stone-200 text-stone-600 font-bold text-sm"
          >
            Reset all
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl bg-amber-500 text-white font-bold text-sm shadow-sm shadow-amber-200"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
