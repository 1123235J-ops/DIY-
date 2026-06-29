import { STYLES } from '../data/projects';

export default function StylesView({ onSelectStyle }) {
  return (
    <div className="px-4 py-4">
      <h2 className="font-bold text-stone-900 text-lg mb-1">Browse by Style</h2>
      <p className="text-sm text-stone-500 mb-4">Pick an aesthetic to filter projects.</p>

      <div className="grid grid-cols-2 gap-3">
        {STYLES.filter((s) => s.id !== 'All').map((style) => (
          <button
            key={style.id}
            onClick={() => onSelectStyle(style.id)}
            className={`${style.color} rounded-2xl p-4 text-left flex items-center gap-3 active:scale-95 transition-transform hover:brightness-95`}
          >
            <span className="text-3xl">{style.emoji}</span>
            <div>
              <div className="font-bold text-sm">{style.label}</div>
              <div className="text-xs opacity-70 mt-0.5">See projects →</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
