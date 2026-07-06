import { Bookmark } from 'lucide-react';
import ProjectCard from './ProjectCard';

export default function SavedView({ projects, saved, onSave, onSelect }) {
  const savedProjects = projects.filter((p) => saved.has(p.id));

  if (savedProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
          <Bookmark size={28} className="text-stone-300" />
        </div>
        <p className="font-bold text-stone-700 text-lg">Nothing saved yet</p>
        <p className="text-sm text-stone-400 mt-1">Tap the bookmark on any project to save it here</p>
      </div>
    );
  }

  return (
    <div>
      <div className="px-4 py-3">
        <p className="text-sm text-stone-500">
          <span className="font-bold text-stone-900">{savedProjects.length}</span> saved projects
        </p>
      </div>
      <div className="project-grid">
        {savedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            saved={saved.has(project.id)}
            onSave={onSave}
            onClick={() => onSelect(project)}
          />
        ))}
      </div>
    </div>
  );
}
