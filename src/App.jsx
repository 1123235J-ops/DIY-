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

const DEFAULT_FILTERS = { room: 'All', skill: 'All', time: 'All', budget: 'Any budget' };

const BUDGET_MAX = {
  'Any budget': Infinity,
  'Under $25':  25,
  'Under $50':  50,
  'Under $100': 100,
  'Under $200': 200,
};

const TIME_ORDER = { '< 1 hr': 1, '< 4 hrs': 2, 'Weekend': 3, 'Multi-day': 4 };

function sortProjects(list, sort) {
  const arr = [...list];
  switch (sort) {
    case 'rating':   return arr.sort((a, b) => b.rating - a.rating);
    case 'cost_asc': return arr.sort((a, b) => a.cost - b.cost);
    case 'time_asc': return arr.sort((a, b) => (TIME_ORDER[a.time] || 5) - (TIME_ORDER[b.time] || 5));
    default:         return arr.sort((a, b) => b.saves - a.saves); // 'saves' = popular
  }
}

export default function App() {
  const [tab, setTab] = useState('browse');
  const [search, setSearch] = useState('');
  const [style, setStyle] = useState('All');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState('saves');
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState(new Set());

  const toggleSave = (id) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleStyleSelect = (styleId) => {
    setStyle(styleId);
    setTab('browse');
  };

  const filtered = useMemo(() => {
    const budgetMax = BUDGET_MAX[filters.budget] ?? Infinity;
    const base = projects.filter((p) => {
      if (style !== 'All' && p.style !== style) return false;
      if (filters.room !== 'All' && p.room !== filters.room) return false;
      if (filters.skill !== 'All' && p.skill !== filters.skill) return false;
      if (filters.time !== 'All' && p.time !== filters.time) return false;
      if (p.cost > budgetMax) return false;
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
    return sortProjects(base, sort);
  }, [style, filters, sort, search]);

  const activeFilterCount = [
    style !== 'All',
    filters.room !== 'All',
    filters.skill !== 'All',
    filters.time !== 'All',
    filters.budget !== 'Any budget',
    !!search,
  ].filter(Boolean).length;

  const resetAll = () => {
    setSearch('');
    setStyle('All');
    setFilters(DEFAULT_FILTERS);
    setSort('saves');
  };

  return (
    <div className="min-h-dvh bg-stone-50">
      <Header search={search} onSearch={setSearch} totalCount={projects.length} />

      {tab === 'browse' && (
        <>
          <StyleGallery activeStyle={style} onSelect={setStyle} />
          <FilterBar filters={filters} onChange={setFilters} sort={sort} onSort={setSort} />
        </>
      )}

      <main className="max-w-7xl mx-auto pb-24 sm:pb-8">
        {tab === 'saved' && (
          <SavedView projects={projects} saved={saved} onSave={toggleSave} onSelect={setSelected} />
        )}

        {tab === 'styles' && (
          <StylesView onSelectStyle={handleStyleSelect} />
        )}

        {tab === 'browse' && (
          <div className="px-4 py-4">
            {activeFilterCount === 0 && (
              <div className="text-center py-6 mb-2">
                <div className="text-4xl mb-2">🏗️</div>
                <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                  Build something <span className="text-amber-500">amazing</span>
                </h1>
                <p className="text-stone-500 text-sm mt-1 max-w-sm mx-auto">
                  65 animated DIY projects across 10 styles — from $15 quick wins to full weekend builds.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-stone-500">
                <span className="font-bold text-stone-700">{filtered.length}</span>
                {filtered.length !== projects.length && ` of ${projects.length}`} projects
                {activeFilterCount > 0 && (
                  <button onClick={resetAll} className="ml-2 text-amber-600 font-medium text-xs underline-offset-2 hover:underline">
                    Clear all
                  </button>
                )}
              </p>
              {saved.size > 0 && (
                <button
                  onClick={() => setTab('saved')}
                  className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-bold hover:bg-amber-200 transition-colors"
                >
                  ♥ {saved.size} saved
                </button>
              )}
            </div>

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
                <p className="text-sm text-stone-400 mt-1 mb-3">Try loosening the filters</p>
                <button
                  onClick={resetAll}
                  className="text-sm bg-amber-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-amber-600 transition-colors"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <BottomNav active={tab} onChange={setTab} savedCount={saved.size} />

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
        saved={selected ? saved.has(selected.id) : false}
        onSave={toggleSave}
      />
    </div>
  );
}
