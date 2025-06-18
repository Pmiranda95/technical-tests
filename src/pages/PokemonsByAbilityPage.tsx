import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AbilitiesList } from '../features/AbilitiesList/AbitlitiesList';
import { PokemonsByAbility } from '../features/PokemonsByAbility/PokemonsByAbility';
import { usePokemonsByAbility } from '../hooks/usePokemon';

export const PokemonsByAbilityPage: React.FC = () => {
  const [ability, setAbility] = useState<string>();
  const navigate = useNavigate();
  const { data: pokemons, isLoading } = usePokemonsByAbility(ability);

  return (
    <main className="max-w-4xl mx-auto">
      <AbilitiesList selectedAbility={ability} onSelect={setAbility} />
      <PokemonsByAbility
        pokemons={pokemons}
        isLoading={isLoading}
        onItemClick={(name) => navigate(`/pokemon/${name}`)}
        abilitySelect={ability}
      />
    </main>
  );
};
