import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CardPokemon } from '../../components/CardPokemon/CardPokemon';
import { SimpleSkeleton } from '../../components/Skeleton/SimpleSkeleton';
import { abilityColors } from '../../constans/abilityColors';
import { usePaginatedSortedPokemons } from './hooks/usePaginatedSortedPokemons';
import { SortControl } from './SortControl';

export interface PokemonBasic {
  name: string;
  url: string;
}

interface PokemonGridProps {
  abilitySelect: string;
  onItemClick: (name: string) => void;
  selectedForCompare: string[];
}

export const PokemonsByAbility: React.FC<PokemonGridProps> = ({
  abilitySelect,
  onItemClick,
  selectedForCompare,
}) => {
  // Use custom hook for fetch, sort and pagination
  const { paginated, isLoading, sortOrder, setSortOrder, loadMore, hasMore } =
    usePaginatedSortedPokemons(abilitySelect);

  return (
    <div>
      {/* Sort control */}
      {paginated.length > 0 && <SortControl sortOrder={sortOrder} onChange={setSortOrder} />}
      {/* Infinite scroll container */}
      <InfiniteScroll
        dataLength={paginated.length}
        next={loadMore}
        hasMore={!isLoading && hasMore}
        loader={
          <div className="flex justify-center py-4">
            <SimpleSkeleton className="h-32 w-16" />
          </div>
        }
        endMessage={
          !isLoading &&
          !hasMore && <p className="text-center text-sm text-gray-400 my-4">No more Pokémon</p>
        }
      >
        <ul
          aria-busy={isLoading}
          className="
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
            gap-6 p-4
          "
        >
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <li key={i}>
                  <SimpleSkeleton className="h-32 w-full" />
                </li>
              ))
            : paginated.map((p) => {
                const isSel = selectedForCompare?.includes(p.name);
                return (
                  <li key={p.name}>
                    <CardPokemon
                      name={p.name}
                      img={p.sprite}
                      color={abilityColors[abilitySelect] ?? '#57534E'}
                      onClick={() => onItemClick(p.name)}
                      isSelected={isSel}
                    />
                  </li>
                );
              })}
        </ul>
      </InfiniteScroll>
    </div>
  );
};
