import React from 'react';
import { abilityColors } from '../../constans/abilityColors';

export interface AbilityCardProps {
  name: string;
  isSelected: boolean;
  onSelect: (ability: string) => void;
}

export const AbilityCard: React.FC<AbilityCardProps> = ({ name, isSelected, onSelect }) => {
  const color = abilityColors[name] ?? '#6B7280';
  const style: React.CSSProperties = {
    borderColor: color,
    '--tw-ring-color': color,
  } as any;

  return (
    <button
      onClick={() => onSelect(name)}
      style={style}
      className={`
        relative flex items-center justify-center 
        px-4 py-3 rounded-xl border-2 
        bg-gray-900 text-white
        transition transform
        hover:scale-105
        ${isSelected ? 'ring-2 ring-opacity-50' : 'hover:ring-2 hover:ring-opacity-30'}
        focus:outline-none focus:ring-4 focus:ring-opacity-50
      `}
      aria-pressed={isSelected}
    >
      <span className="capitalize font-medium">{name}</span>
    </button>
  );
};
