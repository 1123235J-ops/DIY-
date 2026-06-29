import { X, Clock, DollarSign, Star, Wrench, ShoppingCart, ListChecks, Bookmark } from 'lucide-react';

const SKILL_COLOR = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-blue-100 text-blue-700',
  Advanced: 'bg-purple-100 text-purple-700',
};

export default function ProjectModal({ project, onClose, saved, onSave }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Sheet */}
      <div
        className="relative bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90svh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-stone-100 p-4 flex items-start justify-between gap-3 z-10">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{project.image}</span>
            <div>
              <h2 className="font-bold text-stone-900 leading-snug">{project.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SKILL_COLOR[project.skill]}`}>
                  {project.skill}
                </span>
                <span className="text-xs text-stone-400">{project.room}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 shrink-0">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Clock, label: 'Time', value: project.time },
              { icon: DollarSign, label: 'Est. cost', value: `~$${project.cost}` },
              { icon: Star, label: 'Rating', value: project.rating, fill: true },
            ].map(({ icon: Icon, label, value, fill }) => (
              <div key={label} className="bg-stone-50 rounded-xl p-3 text-center">
                <Icon size={16} className="mx-auto mb-1 text-amber-500" fill={fill ? 'currentColor' : 'none'} />
                <div className="text-sm font-semibold text-stone-900">{value}</div>
                <div className="text-xs text-stone-400">{label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-stone-600 leading-relaxed">{project.description}</p>

          {/* Tools */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Wrench size={14} className="text-amber-500" />
              <h4 className="text-sm font-semibold text-stone-800">Tools needed</h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <span key={tool} className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShoppingCart size={14} className="text-amber-500" />
              <h4 className="text-sm font-semibold text-stone-800">Materials list</h4>
            </div>
            <ul className="space-y-1.5">
              {project.materials.map((m) => (
                <li key={m} className="flex items-start gap-2 text-sm text-stone-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="bg-amber-50 rounded-xl p-4 flex items-center gap-3">
            <ListChecks size={20} className="text-amber-600 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-stone-800">
                {project.steps}-step guide included
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                Full instructions with photos available
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={() => onSave(project.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                saved
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'border-stone-200 text-stone-600 hover:border-amber-400 hover:text-amber-600'
              }`}
            >
              <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
              {saved ? 'Saved' : 'Save project'}
            </button>
            <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-full text-sm font-semibold transition-colors">
              Start this project →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
