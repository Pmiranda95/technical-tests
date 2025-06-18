import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CardPokemon } from '../../components/CardPokemon/CardPokemon';
import { usePokemonDetail } from '../../hooks/usePokemon';
import { PokemonStats } from './PokemonStants';

export const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = usePokemonDetail(name);

  const imgUrl = useMemo(() => {
    if (!data) return '';
    return (
      data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default || ''
    );
  }, [data]);

  if (isLoading) return <p className="text-center py-8">Loading…</p>;
  if (isError || !data)
    return <p className="text-center py-8 text-red-500">Error loading Pokémon</p>;

  // maps stats
  const stats = data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat }));

  return (
    <main className="max-w-md mx-auto p-6 space-y-6 bg-gray-900">
      <button onClick={() => navigate(-1)} className="text-sm text-blue-400 hover:underline">
        ← Back
      </button>

      <div className="p-6 rounded-xl shadow-lg text-center">
        <CardPokemon name={data.name} img={imgUrl} color={undefined} onClick={undefined} />
      </div>

      <PokemonStats stats={stats} />
    </main>
  );
};
