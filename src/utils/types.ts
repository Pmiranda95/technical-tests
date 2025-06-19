export interface EvolutionNode {
  species: { name: string };
  evolves_to: EvolutionNode[];
}
