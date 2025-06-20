// src/features/PokemonsByAbility/CompareChart.tsx
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchPokemon } from '../../api/pokemon';

interface CompareChartProps {
  pokemonNames: [string, string];
}

interface DataItem {
  metric: string;
  [key: string]: number | string;
}

export const CompareChart: React.FC<CompareChartProps> = ({ pokemonNames }) => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    Promise.all(pokemonNames.map((n) => fetchPokemon(n))).then((results) => {
      const [p1, p2] = results;
      setData([
        { metric: 'Height', [pokemonNames[0]]: p1.height, [pokemonNames[1]]: p2.height },
        { metric: 'Weight', [pokemonNames[0]]: p1.weight, [pokemonNames[1]]: p2.weight },
        { metric: 'Moves', [pokemonNames[0]]: p1.moves.length, [pokemonNames[1]]: p2.moves.length },
      ]);
    });
  }, [pokemonNames]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="metric" stroke="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip />
        <Legend />
        <Bar dataKey={pokemonNames[0]} fill="#8884d8" />
        <Bar dataKey={pokemonNames[1]} fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};
