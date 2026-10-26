import { Search, Download } from 'lucide-react';

export default function FilterBar({ searchQuery, onSearchChange, sortBy, onSortChange, onExport, totalShown }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4">
      <div className="relative w-full sm:w-1/3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18} />
        <input
          type="text"
          placeholder="Search usernames..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-black border border-white text-white py-2 pl-10 pr-4 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-black border border-white text-white py-2 px-4 focus:outline-none uppercase text-xs font-bold tracking-wider cursor-pointer"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="alpha-asc">A - Z</option>
          <option value="alpha-desc">Z - A</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => onExport('csv')}
            className="flex items-center gap-2 border border-white py-2 px-4 hover:bg-white hover:text-black uppercase text-xs font-bold tracking-wider transition-colors"
          >
            <Download size={14} /> CSV
          </button>
          <button
            onClick={() => onExport('txt')}
            className="flex items-center gap-2 border border-white py-2 px-4 hover:bg-white hover:text-black uppercase text-xs font-bold tracking-wider transition-colors"
          >
            <Download size={14} /> TXT
          </button>
        </div>
      </div>
    </div>
  );
}