import { useQuery } from '@tanstack/react-query';
import {
  fetchPokemonsByAbility,
  fetchAbilities,
  PokemonDetail,
  fetchPokemon,
  fetchPokemonsByAbilityWithHeight,
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

export function usePokemonsByAbilityWithHeight(abilityName?: string) {
  return useQuery({
    queryKey: ['pokemons-by-ability', abilityName, 'withHeight'],
    queryFn: () => fetchPokemonsByAbilityWithHeight(abilityName!),
    enabled: Boolean(abilityName),
  });
}
