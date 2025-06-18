import React from 'react';
import { abilityColors } from '../../constans/abilityColors';

export interface AbilityCardProps {
  name: string;
  isSelected: boolean;
  onSelect: (ability: string) => void;
}

export const AbilityCard: React.FC<AbilityCardProps> = ({ name, isSelected, onSelect }) => {
  const color = abilityColors[name] ?? '#6B7280';

  return (
    <button
      onClick={() => onSelect(name)}
      className={
        `relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-transform transform hover:scale-105 focus:outline-none ` +
        (isSelected
          ? `bg-opacity-20 bg-[${color}] ring-4 ring-[${color}] ring-opacity-30 text-white`
          : `bg-gray-800 border-gray-700 text-gray-200 hover:border-[${color}]`)
      }
      style={{ borderColor: isSelected ? color : undefined }}
      aria-pressed={isSelected}
    >
      <span className="capitalize font-medium text-sm text-center leading-tight">
        {name.replace('-', ' ')}
      </span>
    </button>
  );
};
