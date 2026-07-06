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
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 card-tap cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProjectIllustration project={project} className="absolute inset-0 w-full h-full" />
        <button
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-sm transition-all ${
            saved ? 'bg-amber-500 text-white scale-110' : 'bg-white/90 text-stone-400 hover:text-amber-500'
          }`}
          onClick={(e) => { e.stopPropagation(); onSave(project.id); }}
          aria-label={saved ? 'Unsave project' : 'Save project'}
        >
          <Bookmark size={12} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="p-2.5 space-y-1.5">
        <h3 className="font-semibold text-stone-900 text-sm leading-snug line-clamp-2">
          {project.title}
        </h3>
        <div className="flex items-center justify-between">
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
          <span>·</span>
          <span className="font-medium text-stone-600">~${project.cost}</span>
        </div>
      </div>
    </article>
  );
}
