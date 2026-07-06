import { Bookmark, Star } from 'lucide-react';
import ProjectIllustration from './ProjectIllustration';

const SKILL_COLOR = {
  Beginner:     'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-sky-100 text-sky-700',
  Advanced:     'bg-violet-100 text-violet-700',
};

export default function ProjectCard({ project, onClick, saved, onSave }) {
  return (
    <article
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 card-tap cursor-pointer flex flex-col h-full"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
    >
      <div className="relative aspect-[4/3] overflow-hidden shrink-0">
        <ProjectIllustration project={project} className="absolute inset-0 w-full h-full" />
        {/* 44px touch target; visible circle is smaller and centered */}
        <button
          className="absolute top-0 right-0 w-11 h-11 flex items-center justify-center"
          onClick={(e) => { e.stopPropagation(); onSave(project.id); }}
          aria-label={saved ? 'Remove from saved' : 'Save project'}
          aria-pressed={saved}
        >
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center shadow-sm transition-all ${
              saved ? 'bg-amber-500 text-white scale-110' : 'bg-white/90 text-stone-500'
            }`}
          >
            <Bookmark size={13} fill={saved ? 'currentColor' : 'none'} />
          </span>
        </button>
      </div>

      <div className="p-2.5 flex flex-col gap-1.5 flex-1">
        <h3 className="font-semibold text-stone-900 text-sm leading-snug line-clamp-2">
          {project.title}
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${SKILL_COLOR[project.skill]}`}>
            {project.skill}
          </span>
          <span className="flex items-center gap-0.5 text-[11px] font-semibold text-amber-500">
            <Star size={10} fill="currentColor" />
            {project.rating}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
          <span>{project.time}</span>
          <span aria-hidden>·</span>
          <span className="font-medium text-stone-600">~${project.cost}</span>
        </div>
      </div>
    </article>
  );
}
