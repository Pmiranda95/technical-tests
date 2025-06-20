import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CompareChart } from '../../components/CompareChart/CompareChart';

interface CompareModalProps {
  isOpen: boolean;
  pokemonNames: [string, string];
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, pokemonNames, onClose }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'compare-modal-backdrop') {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      id="compare-modal-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div
        className="relative bg-gray-900 rounded-lg shadow-xl  p-20
                   w-full max-w-3xl mx-4
                   overflow-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Close comparison"
        >
          ← Close
        </button>

        {/* Only render chart if exactly two names */}
        {pokemonNames.length === 2 && <CompareChart pokemonNames={pokemonNames} />}
        {pokemonNames.length !== 2 && (
          <p className="text-center text-gray-400">You must select two Pokémon to compare.</p>
        )}
      </div>
    </div>,
    document.body
  );
};
