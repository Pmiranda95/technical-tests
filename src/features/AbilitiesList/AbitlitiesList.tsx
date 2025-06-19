import React from 'react';
import { usePokemonAbilities } from '../../hooks/usePokemon';
import { AbilityCard } from '../../components/Card/Card';
import { getIsMobile } from '../../utils';

interface AbilitiesListProps {
  selectedAbility?: string;
  onSelect: (ability: string) => void;
}

export const AbilitiesList: React.FC<AbilitiesListProps> = ({ selectedAbility, onSelect }) => {
  const { data: abilities, isError } = usePokemonAbilities();
  const isMobile = getIsMobile();

  if (isError || !abilities) {
    return <p className="text-center py-8 text-red-500">Error loading abilities</p>;
  }

  return (
    <section aria-labelledby="abilities-title" className="py-8">
      <h2 id="abilities-title" className="text-2xl font-bold text-center mb-6 text-white">
        Select an Ability
      </h2>

      {/* Responsive horizontal scroll on small */}
      {isMobile && (
        <div className="overflow-x-auto py-2">
          <ul className="flex space-x-4 px-4">
            {abilities.map((ability) => (
              <li key={ability.name} className="flex-shrink-0">
                <AbilityCard
                  name={ability.name}
                  isSelected={ability.name === selectedAbility}
                  onSelect={onSelect}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Grid layout for larger screens */}
      {!isMobile && (
        <ul className="hidden md:grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 px-4 mt-6">
          {abilities.map((ability) => (
            <li key={ability.name}>
              <AbilityCard
                name={ability.name}
                isSelected={ability.name === selectedAbility}
                onSelect={onSelect}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
