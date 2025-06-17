// src/hooks/usePokemon.ts
import { useQuery } from "@tanstack/react-query";
import { fetchTypes, fetchPokemonsByType, fetchPokemonsByAbility } from "../api/pokemon";

// Hook para tipos
export function usePokemonTypes() {
  return useQuery({
    queryKey: ["types"],
    queryFn: async () => {
      const data = await fetchTypes();
      return data.results;
    },
  });
}

export function usePokemonsByAbility(abilityName?: string) {
  return useQuery({
    queryKey: ['pokemons-by-ability', abilityName],
    queryFn: () => fetchPokemonsByAbility(abilityName!),
    enabled: !!abilityName,
  });
}

// Hook para pokémons de un tipo
export function usePokemonsByType(typeName: string | undefined) {
  return useQuery({
    queryKey: ["pokemons", typeName],
    queryFn: () => {
      if (!typeName) return Promise.resolve([]);
      return fetchPokemonsByType(typeName);
    },
    enabled: !!typeName,
  });
}
