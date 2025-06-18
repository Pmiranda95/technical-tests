import React, { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
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
  pokemons = [],
  isLoading,
  abilitySelect,
  onItemClick,
}) => {
  const perPage = 10;
  const [page, setPage] = useState(1);
  const total = pokemons.length;
  const visibleCount = Math.min(page * perPage, total);

  useEffect(() => {
    setPage(1);
  }, [abilitySelect]);

  const items = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: perPage }).map((_, i) => (
        <li key={`skeleton-${i}`}>
          <SimpleSkeleton className="h-32 w-full" />
        </li>
      ));
    }
    return pokemons.slice(0, visibleCount).map((p) => {
      const id = getPokemonIdFromUrl(p.url);
      const img = getPokemonSpriteUrl(id);
      const color = abilityColors[abilitySelect] ?? '#57534E';
      return (
        <li key={p.name}>
          <CardPokemon name={p.name} img={img} color={color} onClick={() => onItemClick(p.name)} />
        </li>
      );
    });
  }, [isLoading, pokemons, visibleCount, abilitySelect, onItemClick]);

  const hasMore = visibleCount < total;

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={() => setPage((p) => p + 1)}
      hasMore={hasMore}
      loader={
        <div className="flex justify-center py-4">
          <SimpleSkeleton className="h-32 w-16" />
        </div>
      }
      endMessage={
        abilitySelect && <p className="text-center text-sm text-gray-400 my-4">No more Pokémon</p>
      }
    >
      <ul
        aria-busy={isLoading}
        className="
          grid
          grid-cols-2
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
    </InfiniteScroll>
  );
};
