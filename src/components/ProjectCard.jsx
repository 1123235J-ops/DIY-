import { Clock, DollarSign, Star, Bookmark } from 'lucide-react';
import { STYLES } from '../data/projects';
import ProjectIllustration from './ProjectIllustration';

const SKILL_PILL = {
  Beginner:     'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-sky-100 text-sky-700',
  Advanced:     'bg-violet-100 text-violet-700',
};

export default function ProjectCard({ project, onClick, saved, onSave }) {
  const styleInfo = STYLES.find((s) => s.id === project.style);

  return (
    <article
      className="bg-white rounded-2xl border border-stone-100 overflow-hidden active:scale-[0.97] hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      {/* Animated illustration */}
      <div className="relative h-36 overflow-hidden">
        <ProjectIllustration project={project} className="absolute inset-0" />

        {/* Style chip */}
        {styleInfo && (
          <span className={`absolute top-2 left-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-full backdrop-blur-sm ${styleInfo.color} bg-opacity-90`}>
            {styleInfo.emoji} {styleInfo.label}
          </span>
        )}

        {/* Save button */}
        <button
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-sm ${
            saved ? 'bg-amber-500 text-white scale-110' : 'bg-white/90 text-stone-400 hover:text-amber-500'
          }`}
          onClick={(e) => { e.stopPropagation(); onSave(project.id); }}
          aria-label={saved ? 'Unsave project' : 'Save project'}
        >
          <Bookmark size={12} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-stone-900 text-sm leading-snug line-clamp-2 group-hover:text-amber-600">
          {project.title}
        </h3>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${SKILL_PILL[project.skill]}`}>
            {project.skill}
          </span>
          <span className="text-[10px] text-stone-400 bg-stone-50 px-1.5 py-0.5 rounded-full">
            {project.room}
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-50">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-0.5">
              <Clock size={10} />
              {project.time}
            </span>
            <span className="flex items-center gap-0.5 font-medium text-stone-600">
              <DollarSign size={10} />
              ~${project.cost}
            </span>
          </div>
          <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
            <Star size={10} fill="currentColor" />
            {project.rating}
          </span>
        </div>
      </div>
    </article>
  );
}
