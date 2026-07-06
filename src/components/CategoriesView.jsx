import { STYLES, projects } from '../data/projects';

export default function CategoriesView({ onSelectStyle }) {
  const stylesWithCount = STYLES.filter((s) => s.id !== 'All').map((s) => ({
    ...s,
    count: projects.filter((p) => p.style === s.id).length,
  }));

  return (
    <div className="px-4 pt-4 pb-4">
      <div className="grid grid-cols-2 gap-3">
        {stylesWithCount.map(({ id, emoji, label, gradient, count }) => (
          <button
            key={id}
            onClick={() => onSelectStyle(id)}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-5 text-left aspect-square flex flex-col justify-between active:scale-[0.97] transition-transform`}
          >
            <span className="text-3xl">{emoji}</span>
            <div>
              <div className="text-white font-bold text-base leading-tight drop-shadow">{label}</div>
              <div className="text-white/70 text-xs mt-0.5">{count} projects</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
