import { abilityColors } from '../constans/abilityColors';
import { useMediaQuery } from 'react-responsive';
import { EvolutionNode } from './types';

export const getPokemonIdFromUrl = (url: string): number => {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? parseInt(match[1], 10) : NaN;
};

export const getPokemonSpriteUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

export const getColor = (avility: string) => {
  return abilityColors[avility];
};

export const getIsMobile = () => {
  return useMediaQuery({ maxWidth: 767 });
};

export const extractNextEvolutions = (chain: EvolutionNode): string[] => {
  const result: string[] = [];

  const walk = (node: EvolutionNode) => {
    for (const evo of node.evolves_to) {
      result.push(evo.species.name);
      walk(evo);
    }
  };

  walk(chain);
  return result;
};
