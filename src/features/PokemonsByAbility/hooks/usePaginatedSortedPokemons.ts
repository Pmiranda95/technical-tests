import { useState, useMemo, useEffect } from 'react';
import { usePokemonsByAbilityWithHeight } from '../../../hooks/usePokemon';

export function usePaginatedSortedPokemons(ability?: string, perPage = 10) {
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // reset pagination when ability or sort changes
  useEffect(() => setPage(1), [ability, sortOrder]);

  const { data: allPokemons = [], isLoading } = usePokemonsByAbilityWithHeight(ability);

  // sort pokémons by height
  const sorted = useMemo(() => {
    return [...allPokemons].sort((a, b) =>
      sortOrder === 'asc' ? a.height - b.height : b.height - a.height
    );
  }, [allPokemons, sortOrder]);

  const paginated = sorted.slice(0, page * perPage);
  const hasMore = paginated.length < sorted.length;

  return {
    paginated,
    isLoading,
    sortOrder,
    setSortOrder,
    loadMore: () => setPage((p) => p + 1),
    hasMore,
  };
}
