import { STYLES } from '../data/projects';

export default function StyleGallery({ activeStyle, onSelect }) {
  return (
    <div className="bg-white border-b border-stone-100">
      <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-touch px-4 py-3">
        {STYLES.map((s) => {
          const active = activeStyle === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              className={`flex flex-col items-center gap-1.5 shrink-0 transition-all ${
                active ? 'opacity-100' : 'opacity-60 hover:opacity-80'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all border-2 ${
                  active
                    ? 'border-amber-500 shadow-md scale-105 bg-amber-50'
                    : 'border-transparent bg-stone-100'
                }`}
              >
                {s.emoji}
              </div>
              <span
                className={`text-[10px] font-medium leading-tight text-center max-w-[56px] ${
                  active ? 'text-amber-600' : 'text-stone-500'
                }`}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
