import { useState, useMemo } from 'react';
import Header from './components/Header';
import StyleGallery from './components/StyleGallery';
import FilterBar from './components/FilterBar';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import BottomNav from './components/BottomNav';
import SavedView from './components/SavedView';
import StylesView from './components/StylesView';
import { projects } from './data/projects';
import './index.css';

const DEFAULT_FILTERS = { room: 'All', skill: 'All', time: 'All' };

export default function App() {
  const [tab, setTab] = useState('browse');        // 'browse' | 'saved' | 'styles'
  const [search, setSearch] = useState('');
  const [style, setStyle] = useState('All');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState(new Set());

  const toggleSave = (id) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Switch to browse + pre-select a style (from StylesView on mobile)
  const handleStyleSelect = (styleId) => {
    setStyle(styleId);
    setTab('browse');
  };

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (style !== 'All' && p.style !== style) return false;
      if (filters.room !== 'All' && p.room !== filters.room) return false;
      if (filters.skill !== 'All' && p.skill !== filters.skill) return false;
      if (filters.time !== 'All' && p.time !== filters.time) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)) ||
          p.room.toLowerCase().includes(q) ||
          p.style.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [style, filters, search]);

  const activeFilterCount = [
    style !== 'All',
    filters.room !== 'All',
    filters.skill !== 'All',
    filters.time !== 'All',
    !!search,
  ].filter(Boolean).length;

  const resetAll = () => {
    setSearch('');
    setStyle('All');
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="min-h-dvh bg-stone-50">
      <Header search={search} onSearch={setSearch} />

      {/* Desktop sidebar would go here; for now show content based on tab state */}
      {tab === 'browse' && (
        <>
          <StyleGallery activeStyle={style} onSelect={setStyle} />
          <FilterBar filters={filters} onChange={setFilters} />
        </>
      )}

      <main className="max-w-7xl mx-auto pb-24 sm:pb-8">
        {/* Saved tab */}
        {tab === 'saved' && (
          <SavedView
            projects={projects}
            saved={saved}
            onSave={toggleSave}
            onSelect={setSelected}
          />
        )}

        {/* Styles tab (mobile) */}
        {tab === 'styles' && (
          <StylesView onSelectStyle={handleStyleSelect} />
        )}

        {/* Browse tab */}
        {tab === 'browse' && (
          <div className="px-4 py-4">
            {/* Hero — only when nothing is filtered */}
            {activeFilterCount === 0 && (
              <div className="text-center py-6 mb-2">
                <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                  Build something <span className="text-amber-500">amazing</span>
                </h1>
                <p className="text-stone-500 text-sm mt-1 max-w-sm mx-auto">
                  42 curated DIY projects across 10 styles, every skill level, and any budget.
                </p>
              </div>
            )}

            {/* Results header */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-stone-500">
                <span className="font-semibold text-stone-700">{filtered.length}</span>
                {filtered.length !== projects.length && ` of ${projects.length}`} projects
                {activeFilterCount > 0 && (
                  <button onClick={resetAll} className="ml-2 text-amber-600 font-medium text-xs">
                    Clear all
                  </button>
                )}
              </p>
              {saved.size > 0 && (
                <button
                  onClick={() => setTab('saved')}
                  className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-semibold"
                >
                  {saved.size} saved
                </button>
              )}
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-5xl mb-3">🔍</div>
                <p className="font-semibold text-stone-700">No matches</p>
                <p className="text-sm text-stone-400 mt-1">Try different filters</p>
                <button onClick={resetAll} className="mt-3 text-sm text-amber-600 font-medium">
                  Reset everything
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Mobile bottom nav */}
      <BottomNav active={tab} onChange={setTab} savedCount={saved.size} />

      {/* Project detail modal */}
      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
        saved={selected ? saved.has(selected.id) : false}
        onSave={toggleSave}
      />
    </div>
  );
}
