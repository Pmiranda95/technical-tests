import React from 'react';
import { AbilityCard } from '../../components/Card/Card';
import { usePokemonAbilities } from '../../hooks/usePokemon';

interface AbilitiesListProps {
  selectedAbility?: string;
  onSelect: (ability: string) => void;
}

export const AbilitiesList: React.FC<AbilitiesListProps> = ({ selectedAbility, onSelect }) => {
  const { data: abilities, isLoading, isError } = usePokemonAbilities();

  if (isLoading) {
    return <p className="text-center py-8">Cargando habilidades…</p>;
  }
  if (isError || !abilities) {
    return <p className="text-center py-8 text-red-500">Error al cargar habilidades</p>;
  }

  return (
    <section aria-labelledby="abilities-title" className="py-8">
      <h2 id="abilities-title" className="text-xl font-bold text-center mb-6">
        Selecciona una Ability:
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-8 gap-4 px-4">
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
    </section>
  );
};
