import { RotateCcw } from 'lucide-react';

export default function Header({ logo, isAnalyzed, onReset }) {
  return (
    <header className="border-b border-white pb-4 mb-6">
      <div className="max-w-6xl mx-auto px-4 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={logo} alt="InstaTrace Logo" className="w-8 h-8 filter grayscale invert" />
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">InstaTrace</h1>
        </div>
        {isAnalyzed && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 border border-white hover:bg-white hover:text-black transition-colors uppercase text-sm font-bold tracking-wider"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        )}
      </div>
    </header>
  );
}