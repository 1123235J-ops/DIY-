import { Bookmark } from 'lucide-react';
import ProjectCard from './ProjectCard';

export default function SavedView({ projects, saved, onSave, onSelect }) {
  const savedProjects = projects.filter((p) => saved.has(p.id));

  if (savedProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
          <Bookmark size={28} className="text-amber-400" />
        </div>
        <h3 className="font-bold text-stone-800 text-lg mb-1">No saved projects yet</h3>
        <p className="text-sm text-stone-500 max-w-xs">
          Tap the bookmark icon on any project to save it here for later.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <h2 className="font-bold text-stone-900 text-lg mb-4">
        Saved projects
        <span className="ml-2 text-sm text-stone-400 font-normal">({savedProjects.length})</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {savedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            saved={true}
            onSave={onSave}
            onClick={() => onSelect(project)}
          />
        ))}
      </div>
    </div>
  );
}
