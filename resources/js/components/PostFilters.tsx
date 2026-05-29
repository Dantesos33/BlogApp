import { categories } from '@/lib/postsData';

interface PostFiltersProps {
  category: string;
  mode: 'all' | 'mine';
  canViewMine: boolean;
  onCategoryChange: (value: string) => void;
  onModeChange: (value: 'all' | 'mine') => void;
}

export default function PostFilters({ category, mode, canViewMine, onCategoryChange, onModeChange }: PostFiltersProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-4 lg:grid-cols-[220px_180px]">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Category
          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-blue-300 focus:bg-white"
          >
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <div className="grid gap-2 text-sm font-semibold text-slate-700">
          View
          <div className="flex rounded-2xl border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => onModeChange('all')}
              className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition ${mode === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-white'}`}
            >
              All posts
            </button>
            {canViewMine ? (
              <button
                type="button"
                onClick={() => onModeChange('mine')}
                className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition ${mode === 'mine' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-white'}`}
              >
                My posts
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
