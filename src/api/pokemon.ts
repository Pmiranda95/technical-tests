export interface PokemonBasic {
  name: string;
  url: string;
}

export interface Ability {
  name: string;
  url: string;
}

export interface PokemonAbilityResponse {
  results: Ability[];
}

export interface PokemonsByAbilityResponse {
  pokemon: { pokemon: PokemonBasic }[];
}

const BASE = 'https://pokeapi.co/api/v2';

export async function fetchAbilities(): Promise<Ability[]> {
  const res = await fetch('https://pokeapi.co/api/v2/ability');
  if (!res.ok) throw new Error('Error fetching abilities');
  const data: PokemonAbilityResponse = await res.json();
  return data.results;
}

export async function fetchPokemonsByAbility(abilityName: string): Promise<PokemonBasic[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`);
  if (!res.ok) throw new Error('Error fetching pokémons');
  const data: PokemonsByAbilityResponse = await res.json();
  return data.pokemon.slice(0, 20).map((p) => p.pokemon);
}
