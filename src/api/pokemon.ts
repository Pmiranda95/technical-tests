import {
  Ability,
  PokemonAbilityResponse,
  PokemonBasic,
  PokemonDetail,
  PokemonsByAbilityResponse,
  PokemonWithHeight,
} from './types';

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

export async function fetchPokemon(name: string): Promise<PokemonDetail> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error('Pokémon not found');
  return res.json();
}

export async function fetchPokemonsByAbilityWithHeight(
  abilityName: string
): Promise<PokemonWithHeight[]> {
  // 1) First, we fetch the basic list (name + url)
  const basics = await fetchPokemonsByAbility(abilityName);

  // 2) Then, in parallel, we fetch each detail
  const details = await Promise.all(
    basics.map(async (p) => {
      const res = await fetch(p.url);
      if (!res.ok) throw new Error('Error fetching pokemon detail');
      const data = await res.json();
      return {
        name: p.name,
        url: p.url,
        height: data.height,
        sprite: data.sprites.front_default,
      };
    })
  );

  return details;
}

export async function fetchPokemonSpecies(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
  if (!res.ok) throw new Error('Species fetch failed');
  return res.json() as Promise<{ evolution_chain: { url: string } }>;
}

export async function fetchEvolutionChain(chainUrl: string) {
  const res = await fetch(chainUrl);
  if (!res.ok) throw new Error('Evolution chain fetch failed');
  return res.json();
}
