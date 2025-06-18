import React from 'react';

export interface Stat {
  name: string;
  value: number;
}

interface PokemonStatsProps {
  stats: Stat[];
}

export const PokemonStats: React.FC<PokemonStatsProps> = ({ stats }) => (
  <section aria-labelledby="stats-title" className="space-y-4">
    <h2 id="stats-title" className="text-lg font-semibold text-center">
      Stats
    </h2>
    <ul className="space-y-2">
      {stats.map(({ name, value }) => (
        <li key={name} className="flex justify-between bg-gray-800 p-2 rounded">
          <span className="capitalize">{name.replace('-', ' ')}</span>
          <span>{value}</span>
        </li>
      ))}
    </ul>
  </section>
);
