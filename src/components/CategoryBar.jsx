import { STYLES } from '../data/projects';

export default function CategoryBar({ active, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-2.5 bg-white border-b border-stone-100 no-scroll">
      {STYLES.map(({ id, emoji, label }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`flex-none flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
            active === id
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          {emoji} {label}
        </button>
      ))}
    </div>
  );
}
