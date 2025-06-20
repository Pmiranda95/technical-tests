import { useQuery } from '@tanstack/react-query';
import {
  fetchPokemonsByAbility,
  fetchAbilities,
  fetchPokemon,
  fetchPokemonsByAbilityWithHeight,
  fetchEvolutionChain,
  fetchPokemonSpecies,
} from '../api/pokemon';
import { PokemonDetail } from '../api/types';

export const usePokemonAbilities = () => {
  return useQuery({
    queryKey: ['abilities'],
    queryFn: fetchAbilities,
  });
};

export const usePokemonsByAbility = (abilityName?: string) => {
  return useQuery({
    queryKey: ['pokemons-by-ability', abilityName],
    queryFn: () => fetchPokemonsByAbility(abilityName!),
    enabled: !!abilityName,
  });
};

export const usePokemonDetail = (name?: string) => {
  return useQuery<PokemonDetail, Error>({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemon(name!),
    enabled: Boolean(name),
  });
};

export const usePokemonsByAbilityWithHeight = (abilityName?: string) => {
  return useQuery({
    queryKey: ['pokemons-by-ability', abilityName, 'withHeight'],
    queryFn: () => fetchPokemonsByAbilityWithHeight(abilityName!),
    enabled: Boolean(abilityName),
  });
};

export const usePokemonSpecies = (name?: string) => {
  return useQuery({
    queryKey: ['pokemon-species', name],
    queryFn: () => fetchPokemonSpecies(name!),
    enabled: Boolean(name),
  });
};

export const useEvolutionChain = (chainUrl?: string) => {
  return useQuery({
    queryKey: ['evolution-chain', chainUrl],
    queryFn: () => fetchEvolutionChain(chainUrl!),
    enabled: Boolean(chainUrl),
  });
};
