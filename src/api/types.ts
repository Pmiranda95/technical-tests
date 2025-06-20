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

export interface Stat {
  base_stat: number;
  stat: { name: string };
}

export interface PokemonDetail {
  name: string;
  sprites: { front_default: string; other?: { 'official-artwork'?: { front_default: string } } };
  stats: Stat[];
  height: string;
  weight: string;
  moves: [];
}

export interface PokemonWithHeight {
  name: string;
  url: string;
  height: number;
  sprite: string;
}
