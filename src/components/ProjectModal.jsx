import { useEffect } from 'react';
import { X, Clock, DollarSign, Star, Wrench, ShoppingCart, ListChecks, Bookmark, Heart } from 'lucide-react';
import { STYLES } from '../data/projects';

const SKILL_COLOR = {
  Beginner:     'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-sky-100 text-sky-700',
  Advanced:     'bg-violet-100 text-violet-700',
};

export default function ProjectModal({ project, onClose, saved, onSave }) {
  // Lock body scroll while open
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!project) return null;

  const styleInfo = STYLES.find((s) => s.id === project.style);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" role="dialog" aria-modal>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet — full-screen on mobile, centered card on sm+ */}
      <div className="relative bg-white w-full sm:max-w-md sm:mx-4 sm:rounded-3xl rounded-t-3xl max-h-[92dvh] flex flex-col shadow-2xl">
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden shrink-0">
          <div className="w-10 h-1 bg-stone-200 rounded-full" />
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto no-scrollbar scroll-touch flex-1">
          {/* Hero area */}
          <div className="relative bg-gradient-to-br from-amber-50 to-stone-100 h-40 flex items-center justify-center shrink-0">
            <span className="text-7xl select-none">{project.image}</span>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-stone-500 hover:bg-white shadow-sm"
              aria-label="Close"
            >
              <X size={16} />
            </button>
            {styleInfo && (
              <span className={`absolute top-4 left-4 text-xs font-semibold px-2 py-1 rounded-full ${styleInfo.color}`}>
                {styleInfo.emoji} {styleInfo.label}
              </span>
            )}
          </div>

          <div className="p-5 space-y-5">
            {/* Title + badges */}
            <div>
              <h2 className="text-xl font-bold text-stone-900 leading-tight">{project.title}</h2>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SKILL_COLOR[project.skill]}`}>
                  {project.skill}
                </span>
                <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                  {project.room}
                </span>
                <span className="text-xs text-stone-400">
                  {project.saves.toLocaleString()} saves
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Clock,     label: 'Time',      value: project.time },
                { icon: DollarSign,label: 'Est. Cost',  value: `~$${project.cost}` },
                { icon: Star,      label: 'Rating',     value: project.rating, gold: true },
              ].map(({ icon: Icon, label, value, gold }) => (
                <div key={label} className="bg-stone-50 rounded-2xl p-3 text-center">
                  <Icon size={15} className={`mx-auto mb-1 ${gold ? 'text-amber-400' : 'text-amber-500'}`} fill={gold ? 'currentColor' : 'none'} />
                  <div className="text-sm font-bold text-stone-900">{value}</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm text-stone-600 leading-relaxed">{project.description}</p>

            {/* Tools */}
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <Wrench size={13} className="text-amber-500" />
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
              <div className="flex items-center gap-2 mb-2.5">
                <ShoppingCart size={13} className="text-amber-500" />
                <h4 className="text-sm font-semibold text-stone-800">Materials list</h4>
              </div>
              <ul className="space-y-2">
                {project.materials.map((m) => (
                  <li key={m} className="flex items-start gap-2 text-sm text-stone-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            {/* Step count */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shrink-0">
                <ListChecks size={18} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-800">{project.steps}-step illustrated guide</div>
                <div className="text-xs text-stone-500 mt-0.5">Photos + measurements for every step</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky action bar */}
        <div className="shrink-0 border-t border-stone-100 p-4 flex gap-3 bg-white pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            onClick={() => onSave(project.id)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-colors shrink-0 ${
              saved ? 'bg-amber-500 border-amber-500 text-white' : 'border-stone-200 text-stone-400 hover:border-amber-400 hover:text-amber-500'
            }`}
            aria-label={saved ? 'Unsave' : 'Save'}
          >
            <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
          </button>
          <button className="flex-1 bg-amber-500 active:bg-amber-600 hover:bg-amber-600 text-white font-semibold rounded-2xl text-sm transition-colors">
            Start this project →
          </button>
        </div>
      </div>
    </div>
  );
}
