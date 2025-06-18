import { useQuery } from '@tanstack/react-query';
import {
  fetchPokemonsByAbility,
  fetchAbilities,
  PokemonDetail,
  fetchPokemon,
} from '../api/pokemon';

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

export function usePokemonDetail(name?: string) {
  return useQuery<PokemonDetail, Error>({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemon(name!),
    enabled: Boolean(name),
  });
}
