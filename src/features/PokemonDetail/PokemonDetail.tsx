import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CardPokemon } from '../../components/CardPokemon/CardPokemon';
import { useEvolutionChain, usePokemonDetail, usePokemonSpecies } from '../../hooks/usePokemon';
import { extractNextEvolutions } from '../../utils';
import { PokemonStats } from './PokemonStants';
import { Tag } from '../../components/Tag/Tag';

export const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = usePokemonDetail(name);
  const { data: species } = usePokemonSpecies(name);
  const { data: evoResponse } = useEvolutionChain(species?.evolution_chain.url);
  // evoResponse is the whole object with { id, chain: { … } }
  const nextEvos = evoResponse ? extractNextEvolutions(evoResponse.chain) : [];

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
    <main className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-900 my-16 shadow-2xl rounded-lg">
      <button onClick={() => navigate(-1)} className="text-sm hover:underline">
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Column left: imag and evol */}
        <div className="flex-1 p-6 bg-gray-800 rounded-xl shadow-lg text-center">
          <CardPokemon name={data.name} img={imgUrl} color={undefined} onClick={undefined} />
          {nextEvos.length > 0 && (
            <section className="my2">
              <h3 className="font-semibold mt-6 mb-4 text-lg text-white">Evolutions</h3>
              <ul className="flex flex-wrap gap-3 mt-2">
                {nextEvos.map((evoName) => (
                  <li key={evoName}>
                    <Tag
                      label={evoName}
                      onClick={() => navigate(`/pokemon/${evoName}`)}
                      className="
                        bg-sky-500 text-white
                        px-3 py-1 rounded-full
                        hover:bg-sky-600
                        focus:outline-none focus:ring-2 focus:ring-sky-300
                        transition
                    "
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Column rigth: stats */}
        <div className="flex-1 space-y-6">
          <PokemonStats stats={stats} />
        </div>
      </div>
    </main>
  );
};
