import { Clock, DollarSign, Star, Bookmark, ChevronRight } from 'lucide-react';

const SKILL_COLOR = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-blue-100 text-blue-700',
  Advanced: 'bg-purple-100 text-purple-700',
};

export default function ProjectCard({ project, onClick, saved, onSave }) {
  return (
    <div
      className="bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="bg-amber-50 h-36 flex items-center justify-center text-5xl relative">
        {project.image}
        <button
          className={`absolute top-3 right-3 p-1.5 rounded-full transition-colors ${
            saved ? 'bg-amber-500 text-white' : 'bg-white text-stone-400 hover:text-amber-500'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onSave(project.id);
          }}
          aria-label="Save project"
        >
          <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-stone-900 text-sm leading-snug group-hover:text-amber-600 transition-colors">
            {project.title}
          </h3>
          <ChevronRight size={16} className="text-stone-300 group-hover:text-amber-400 shrink-0 mt-0.5 transition-colors" />
        </div>

        <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{project.description}</p>

        {/* Meta */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SKILL_COLOR[project.skill]}`}>
            {project.skill}
          </span>
          <span className="text-xs text-stone-400 bg-stone-50 px-2 py-0.5 rounded-full">{project.room}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-50">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {project.time}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign size={11} />
              ~${project.cost}
            </span>
          </div>
          <span className="flex items-center gap-1 text-amber-500 font-medium">
            <Star size={11} fill="currentColor" />
            {project.rating}
          </span>
        </div>
      </div>
    </div>
  );
}
