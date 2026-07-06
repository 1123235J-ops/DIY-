import { Compass, LayoutGrid, Bookmark } from 'lucide-react';

const TABS = [
  { id: 'explore',    Icon: Compass,    label: 'Explore' },
  { id: 'categories', Icon: LayoutGrid, label: 'Styles' },
  { id: 'saved',      Icon: Bookmark,   label: 'Saved' },
];

export default function BottomNav({ active, onChange, savedCount }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-100 pb-[env(safe-area-inset-bottom)]">
      <div className="flex">
        {TABS.map(({ id, Icon, label }) => {
          const isActive = active === id;
          const showBadge = id === 'saved' && savedCount > 0;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors relative ${
                isActive ? 'text-amber-500' : 'text-stone-400'
              }`}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                {showBadge && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {savedCount > 9 ? '9+' : savedCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
