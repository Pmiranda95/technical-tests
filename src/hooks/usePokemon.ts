import { useQuery } from '@tanstack/react-query';
import { fetchPokemonsByAbility, fetchAbilities } from '../api/pokemon';

export function usePokemonAbilities() {
  return useQuery({
    queryKey: ['abilities'],
    queryFn: fetchAbilities,
  });
}

export function usePokemonsByAbility(abilityName?: string) {
  return useQuery({
    queryKey: ['pokemons-by-ability', abilityName],
    queryFn: () => fetchPokemonsByAbility(abilityName!),
    enabled: !!abilityName,
  });
}
