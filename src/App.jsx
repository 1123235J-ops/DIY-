import { useState, useMemo } from 'react';
import Header from './components/Header';
import CategoryBar from './components/CategoryBar';
import FilterSheet from './components/FilterSheet';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import BottomNav from './components/BottomNav';
import SavedView from './components/SavedView';
import CategoriesView from './components/CategoriesView';
import { projects, BUDGET_MAX } from './data/projects';
import './index.css';

const DEFAULT_FILTERS = { room: 'All', skill: 'All', time: 'All', budget: 'Any' };

function sortProjects(list, sort) {
  const arr = [...list];
  switch (sort) {
    case 'rating':   return arr.sort((a, b) => b.rating - a.rating);
    case 'cheapest': return arr.sort((a, b) => a.cost - b.cost);
    case 'quickest': return arr.sort((a, b) => a.timeMin - b.timeMin);
    default:         return arr.sort((a, b) => b.saves - a.saves);
  }
}

export default function App() {
  const [tab, setTab] = useState('explore');
  const [search, setSearch] = useState('');
  const [style, setStyle] = useState('All');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState('popular');
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState(new Set());
  const [showFilter, setShowFilter] = useState(false);

  const toggleSave = (id) => setSaved((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const handleStyleSelect = (styleId) => {
    setStyle(styleId);
    setTab('explore');
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
    filters.budget !== 'Any',
    !!search,
  ].filter(Boolean).length;

  const resetAll = () => {
    setSearch('');
    setStyle('All');
    setFilters(DEFAULT_FILTERS);
    setSort('popular');
  };

  return (
    <div className="min-h-dvh" style={{ background: 'var(--bg)' }}>
      <Header
        search={search}
        onSearch={setSearch}
        filterCount={activeFilterCount}
        onFilterOpen={() => setShowFilter(true)}
      />

      {tab === 'explore' && (
        <CategoryBar active={style} onSelect={setStyle} />
      )}

      <main className="pb-20">
        {tab === 'saved' && (
          <SavedView
            projects={projects}
            saved={saved}
            onSave={toggleSave}
            onSelect={setSelected}
          />
        )}

        {tab === 'categories' && (
          <CategoriesView onSelectStyle={handleStyleSelect} />
        )}

        {tab === 'explore' && (
          <>
            <div className="flex items-center justify-between px-4 py-2">
              <p className="text-xs text-stone-500">
                <span className="font-bold text-stone-800">{filtered.length}</span>
                {filtered.length !== projects.length && ` of ${projects.length}`} projects
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetAll}
                    className="ml-2 text-amber-600 text-xs font-semibold hover:underline underline-offset-2"
                  >
                    Clear all
                  </button>
                )}
              </p>
            </div>

            {filtered.length > 0 ? (
              <div className="masonry">
                {filtered.map((project) => (
                  <div key={project.id} className="masonry-item">
                    <ProjectCard
                      project={project}
                      saved={saved.has(project.id)}
                      onSave={toggleSave}
                      onClick={() => setSelected(project)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center px-8">
                <div className="text-5xl mb-3">🔍</div>
                <p className="font-semibold text-stone-700">No matches</p>
                <p className="text-sm text-stone-400 mt-1 mb-4">Try different filters or search terms</p>
                <button
                  onClick={resetAll}
                  className="text-sm bg-amber-500 text-white font-bold px-5 py-2.5 rounded-full shadow-sm shadow-amber-200"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <BottomNav active={tab} onChange={setTab} savedCount={saved.size} />

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
        saved={selected ? saved.has(selected.id) : false}
        onSave={toggleSave}
      />

      <FilterSheet
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        filters={filters}
        onChange={setFilters}
        sort={sort}
        onSort={setSort}
        onReset={resetAll}
      />
    </div>
  );
}
