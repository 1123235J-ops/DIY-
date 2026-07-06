import { useEffect } from 'react';
import { X, Clock, DollarSign, Star, Wrench, ShoppingCart, ListChecks, Bookmark } from 'lucide-react';
import { STYLES } from '../data/projects';
import ProjectIllustration from './ProjectIllustration';

const SKILL_COLOR = {
  Beginner:     'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-sky-100 text-sky-700',
  Advanced:     'bg-violet-100 text-violet-700',
};
const SKILL_STEPS = { Beginner: 1, Intermediate: 2, Advanced: 3 };

export default function ProjectModal({ project, onClose, saved, onSave }) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  if (!project) return null;

  const styleInfo = STYLES.find((s) => s.id === project.style);
  const difficultyDots = SKILL_STEPS[project.skill] || 1;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" role="dialog" aria-modal>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm fade-enter" onClick={onClose} />

      <div className="relative bg-white w-full sm:max-w-lg sm:mx-4 sm:rounded-3xl rounded-t-3xl max-h-[94dvh] flex flex-col shadow-2xl sheet-enter">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 sm:hidden shrink-0">
          <div className="w-10 h-1 bg-stone-200 rounded-full" />
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto no-scroll scroll-ios flex-1">
          {/* Hero illustration */}
          <div className="relative h-52 overflow-hidden sm:rounded-t-3xl">
            <ProjectIllustration project={project} className="absolute inset-0 w-full h-full" />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:bg-white shadow-sm"
            >
              <X size={16} />
            </button>
            {styleInfo && (
              <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/80 text-stone-700`}>
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
                <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                  {project.room}
                </span>
                <span className="flex items-center gap-0.5">
                  {[1, 2, 3].map((d) => (
                    <div key={d} className={`w-2 h-2 rounded-full ${d <= difficultyDots ? 'bg-amber-500' : 'bg-stone-200'}`} />
                  ))}
                </span>
                <span className="text-xs text-stone-400">
                  {project.saves.toLocaleString()} saves
                </span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { Icon: Clock,      label: 'Time',      value: project.time,        gold: false },
                { Icon: DollarSign, label: 'Est. Cost', value: `~$${project.cost}`, gold: false },
                { Icon: Star,       label: 'Rating',    value: project.rating,      gold: true },
              ].map(({ Icon, label, value, gold }) => (
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

            {/* Steps banner */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-3">
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
            className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all shrink-0 ${
              saved
                ? 'bg-amber-500 border-amber-500 text-white scale-105'
                : 'border-stone-200 text-stone-400 hover:border-amber-400 hover:text-amber-500'
            }`}
            aria-label={saved ? 'Unsave' : 'Save'}
          >
            <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
          </button>
          <button className="flex-1 bg-amber-500 active:bg-amber-600 hover:bg-amber-600 text-white font-bold rounded-2xl text-sm transition-colors shadow-lg shadow-amber-200">
            Start this project →
          </button>
        </div>
      </div>
    </div>
  );
}
