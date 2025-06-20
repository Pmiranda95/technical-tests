import React from 'react';

export interface CompareControlsProps {
  compareMode: boolean;
  compareCount: number;
  onToggleMode: () => void;
  onCompare: () => void;
}

export const CompareControls: React.FC<CompareControlsProps> = ({
  compareMode,
  compareCount,
  onToggleMode,
  onCompare,
}) => (
  <div className="flex justify-end gap-2 mb-4">
    <button
      onClick={onToggleMode}
      className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white transition"
    >
      {compareMode ? 'Cancel Compare' : 'Start Compare'}
    </button>

    {compareMode && compareCount === 2 && (
      <button
        onClick={onCompare}
        className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white transition"
      >
        Compare Pokémon
      </button>
    )}
  </div>
);
