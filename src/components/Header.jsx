import { Hammer } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-amber-500 p-1.5 rounded-lg">
            <Hammer size={20} className="text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-stone-900 tracking-tight">BuildIt</span>
            <span className="text-lg font-bold text-amber-500 tracking-tight">DIY</span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-xs text-stone-500">
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
            12 projects ready
          </span>
        </div>
      </div>
    </header>
  );
}
