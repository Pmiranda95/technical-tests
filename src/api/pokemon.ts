export interface PokemonType {
    name: string;
    url: string;
  }
  
  export interface PokemonTypeResponse {
    results: PokemonType[];
  }
  
  export interface PokemonBasic {
    name: string;
    url: string;
  }
  
  export interface PokemonsByTypeResponse {
    pokemon: { pokemon: PokemonBasic }[];
  }
  
  const BASE = 'https://pokeapi.co/api/v2';
  
  export async function fetchTypes(): Promise<PokemonTypeResponse> {
    const res = await fetch(`${BASE}/type`);
    if (!res.ok) throw new Error('Error fetching types');
    return res.json();
  }

  // Añade:
export async function fetchPokemonsByAbility(ability: string) {
  const res = await fetch(`${BASE}/ability/${ability}`)
  if (!res.ok) throw new Error('Error fetching pokémons by ability')
  const data: { pokemon: { pokemon: PokemonBasic }[] } = await res.json()
  return data.pokemon.map(p => p.pokemon).slice(0, 20)
}
  
  export async function fetchPokemonsByType(typeName: string): Promise<PokemonBasic[]> {
    const res = await fetch(`${BASE}/type/${typeName}`);
    if (!res.ok) throw new Error('Error fetching pokémons');
    const data: PokemonsByTypeResponse = await res.json();
    
    return data.pokemon.slice(0, 20).map(p => p.pokemon);
  }
  