import { abilityColors } from '../constans/abilityColors';
import { useMediaQuery } from 'react-responsive';

export function getPokemonIdFromUrl(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? parseInt(match[1], 10) : NaN;
}

export function getPokemonSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export const getColor = (avility: string) => {
  return abilityColors[avility];
};

export const getIsMobile = () => {
  return useMediaQuery({ maxWidth: 767 });
};
