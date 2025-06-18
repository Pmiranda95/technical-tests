import React, { useMemo } from 'react';
import { CardPokemon } from '../../components/CardPokemon/CardPokemon';
import { SimpleSkeleton } from '../../components/Skeleton/SimpleSkeleton';
import { abilityColors } from '../../constans/abilityColors';
import { getPokemonIdFromUrl, getPokemonSpriteUrl } from '../../utils';

export interface PokemonBasic {
  name: string;
  url: string;
}

interface PokemonGridProps {
  pokemons?: PokemonBasic[];
  isLoading: boolean;
  abilitySelect: string;
  onItemClick: (name: string) => void;
}

export const PokemonsByAbility: React.FC<PokemonGridProps> = ({
  pokemons,
  isLoading,
  abilitySelect,
  onItemClick,
}) => {
  const count = isLoading ? 12 : (pokemons?.length ?? 0);

  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      if (isLoading) {
        return (
          <li key={i}>
            <SimpleSkeleton className="h-32 w-full" />
          </li>
        );
      }

      const p = pokemons![i];
      const id = getPokemonIdFromUrl(p.url);
      const img = getPokemonSpriteUrl(id);
      const color = abilityColors[abilitySelect] ?? '#57534E';

      return (
        <li key={p.name}>
          <CardPokemon name={p.name} img={img} color={color} onClick={() => onItemClick(p.name)} />
        </li>
      );
    });
  }, [count, isLoading, pokemons, abilitySelect, onItemClick]);

  return (
    <ul
      aria-busy={isLoading}
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-6 mt-4 p-4
      "
    >
      {items}
    </ul>
  );
};
