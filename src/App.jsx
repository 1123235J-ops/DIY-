import { useState, useMemo } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import { projects } from './data/projects';
import './index.css';

const DEFAULT_FILTERS = { search: '', room: 'All', skill: 'All', time: 'All' };

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState(new Set());

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (filters.room !== 'All' && p.room !== filters.room) return false;
      if (filters.skill !== 'All' && p.skill !== filters.skill) return false;
      if (filters.time !== 'All' && p.time !== filters.time) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.description.toLowerCase().includes(q) &&
          !p.tags.some((t) => t.includes(q)) &&
          !p.room.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [filters]);

  const toggleSave = (id) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const activeFilterCount = [
    filters.room !== 'All',
    filters.skill !== 'All',
    filters.time !== 'All',
    !!filters.search,
  ].filter(Boolean).length;

  return (
    <div className="min-h-svh bg-stone-50">
      <Header />
      <FilterBar filters={filters} onChange={setFilters} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeFilterCount === 0 && (
          <div className="mb-8 text-center py-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-2">
              Build something <span className="text-amber-500">amazing</span>
            </h1>
            <p className="text-stone-500 text-sm sm:text-base max-w-md mx-auto">
              Curated DIY projects for every skill level, room, and budget — from quick wins to full builds.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-stone-500">
            {filtered.length === projects.length
              ? `${projects.length} projects`
              : `${filtered.length} of ${projects.length} projects`}
            {activeFilterCount > 0 && (
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="ml-2 text-amber-600 hover:text-amber-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
          {saved.size > 0 && (
            <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium">
              {saved.size} saved
            </span>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                saved={saved.has(project.id)}
                onSave={toggleSave}
                onClick={() => setSelected(project)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-stone-400">
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-medium">No projects match your filters</p>
            <button
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="mt-3 text-sm text-amber-600 hover:text-amber-700 font-medium"
            >
              Reset filters
            </button>
          </div>
        )}
      </main>

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
        saved={selected ? saved.has(selected.id) : false}
        onSave={toggleSave}
      />
    </div>
  );
}
