import { useEffect, useState } from 'react';
import { X, Clock, DollarSign, Star, Wrench, ShoppingCart, ListChecks, Bookmark, Check, Share2 } from 'lucide-react';
import { STYLES } from '../data/projects';
import ProjectIllustration from './ProjectIllustration';

const SKILL_COLOR = {
  Beginner:     'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-sky-100 text-sky-700',
  Advanced:     'bg-violet-100 text-violet-700',
};
const SKILL_STEPS = { Beginner: 1, Intermediate: 2, Advanced: 3 };

export default function ProjectModal({ project, onClose, saved, onSave, onToast }) {
  const [started, setStarted] = useState(false);
  const [checked, setChecked] = useState(() => new Set());

  // Reset the checklist whenever a different project opens
  useEffect(() => {
    setStarted(false);
    setChecked(new Set());
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  if (!project) return null;

  const styleInfo = STYLES.find((s) => s.id === project.style);
  const difficultyDots = SKILL_STEPS[project.skill] || 1;

  const toggleItem = (item) => setChecked((prev) => {
    const next = new Set(prev);
    next.has(item) ? next.delete(item) : next.add(item);
    return next;
  });

  const handleStart = () => {
    setStarted(true);
    if (!saved) onSave(project.id);
    onToast?.('Project added — checklist ready ✓');
    // scroll the checklist into view on next paint
    requestAnimationFrame(() => {
      document.getElementById('start-checklist')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleShare = async () => {
    const text = `${project.title} — a ${project.skill} ${project.style} DIY project (~$${project.cost}, ${project.time}).`;
    try {
      if (navigator.share) {
        await navigator.share({ title: project.title, text });
      } else {
        await navigator.clipboard?.writeText(text);
        onToast?.('Copied to clipboard');
      }
    } catch { /* user cancelled share — ignore */ }
  };

  const doneCount = checked.size;
  const total = project.materials.length;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" role="dialog" aria-modal aria-label={project.title}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm fade-enter" onClick={onClose} />

      <div className="relative bg-white w-full sm:max-w-lg sm:mx-4 sm:rounded-3xl rounded-t-3xl max-h-[94dvh] flex flex-col shadow-2xl sheet-enter">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 sm:hidden shrink-0">
          <div className="w-10 h-1.5 bg-stone-200 rounded-full" />
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto no-scroll scroll-ios flex-1">
          {/* Hero illustration */}
          <div className="relative h-52 overflow-hidden sm:rounded-t-3xl">
            <ProjectIllustration project={project} className="absolute inset-0 w-full h-full" />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:bg-white shadow-sm"
              aria-label="Close"
            >
              <X size={17} />
            </button>
            <button
              onClick={handleShare}
              className="absolute top-3 right-14 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-600 hover:bg-white shadow-sm"
              aria-label="Share"
            >
              <Share2 size={15} />
            </button>
            {styleInfo && (
              <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/80 text-stone-700">
                {styleInfo.emoji} {styleInfo.label}
              </span>
            )}
          </div>

          <div className="p-5 space-y-5">
            {/* Title + badges */}
            <div>
              <h2 className="text-xl font-bold text-stone-900 leading-tight">{project.title}</h2>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SKILL_COLOR[project.skill]}`}>
                  {project.skill}
                </span>
                <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                  {project.room}
                </span>
                <span className="flex items-center gap-0.5" aria-label={`Difficulty ${difficultyDots} of 3`}>
                  {[1, 2, 3].map((d) => (
                    <div key={d} className={`w-2 h-2 rounded-full ${d <= difficultyDots ? 'bg-amber-500' : 'bg-stone-200'}`} />
                  ))}
                </span>
                <span className="text-xs text-stone-400">{project.saves.toLocaleString()} saves</span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { Icon: Clock,      label: 'Time',      value: project.time,        gold: false },
                { Icon: DollarSign, label: 'Est. Cost', value: `~$${project.cost}`, gold: false },
                { Icon: Star,       label: 'Rating',    value: project.rating,      gold: true },
              ].map(({ Icon, label, value, gold }) => (
                <div key={label} className="bg-stone-50 rounded-2xl p-3 text-center">
                  <Icon size={15} className={`mx-auto mb-1 ${gold ? 'text-amber-400' : 'text-amber-500'}`} fill={gold ? 'currentColor' : 'none'} />
                  <div className="text-sm font-bold text-stone-900">{value}</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm text-stone-600 leading-relaxed">{project.description}</p>

            {/* Tools */}
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <Wrench size={13} className="text-amber-500" />
                <h4 className="text-sm font-semibold text-stone-800">Tools needed</h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map((tool) => (
                  <span key={tool} className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Materials — becomes an interactive shopping checklist once started */}
            <div id="start-checklist">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={13} className="text-amber-500" />
                  <h4 className="text-sm font-semibold text-stone-800">
                    {started ? 'Shopping checklist' : 'Materials list'}
                  </h4>
                </div>
                {started && (
                  <span className="text-xs font-semibold text-stone-500">{doneCount}/{total}</span>
                )}
              </div>

              {started && (
                <div className="h-1.5 bg-stone-100 rounded-full mb-3 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{ width: `${total ? (doneCount / total) * 100 : 0}%` }}
                  />
                </div>
              )}

              <ul className="space-y-1">
                {project.materials.map((m) => {
                  const isChecked = checked.has(m);
                  return started ? (
                    <li key={m}>
                      <button
                        onClick={() => toggleItem(m)}
                        className="w-full flex items-center gap-3 text-left py-2 px-1 rounded-lg active:bg-stone-50"
                      >
                        <span
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isChecked ? 'bg-amber-500 border-amber-500 text-white' : 'border-stone-300'
                          }`}
                        >
                          {isChecked && <Check size={13} strokeWidth={3} />}
                        </span>
                        <span className={`text-sm ${isChecked ? 'text-stone-400 line-through' : 'text-stone-700'}`}>
                          {m}
                        </span>
                      </button>
                    </li>
                  ) : (
                    <li key={m} className="flex items-start gap-2 text-sm text-stone-600 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      {m}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Steps banner */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shrink-0">
                <ListChecks size={18} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-800">{project.steps}-step illustrated guide</div>
                <div className="text-xs text-stone-500 mt-0.5">Photos + measurements for every step</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky action bar */}
        <div className="shrink-0 border-t border-stone-100 p-4 flex gap-3 bg-white pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            onClick={() => onSave(project.id)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all shrink-0 ${
              saved
                ? 'bg-amber-500 border-amber-500 text-white'
                : 'border-stone-200 text-stone-400 hover:border-amber-400 hover:text-amber-500'
            }`}
            aria-label={saved ? 'Remove from saved' : 'Save'}
            aria-pressed={saved}
          >
            <Bookmark size={20} fill={saved ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleStart}
            disabled={started}
            className={`flex-1 h-14 font-bold rounded-2xl text-sm transition-colors shadow-lg shadow-amber-200 ${
              started
                ? 'bg-emerald-500 text-white shadow-emerald-200'
                : 'bg-amber-500 active:bg-amber-600 hover:bg-amber-600 text-white'
            }`}
          >
            {started ? '✓ Building this — checklist below' : 'Start this project →'}
          </button>
        </div>
      </div>
    </div>
  );
}
