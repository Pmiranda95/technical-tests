import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AbilitiesList } from '../features/AbilitiesList';
import { PokemonsByAbility } from '../features/PokemonsByAbility';
import { CompareControls } from '../features/PokemonsByAbility/CompareControls';
import { CompareModal } from '../features/PokemonsByAbility/CompareModal';

export const PokemonsByAbilityPage: React.FC = () => {
  const [ability, setAbility] = useState<string>();
  const navigate = useNavigate();

  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const handleToggleMode = () => {
    setCompareMode((m) => {
      if (m) setCompareList([]);
      return !m;
    });
    setShowCompare(false);
  };

  const handleCompare = () => {
    setShowCompare(true);
  };

  const handleCardClick = (name: string) => {
    if (!compareMode) {
      navigate(`/pokemon/${name}`);
      return;
    }
    setCompareList((prev) => {
      if (prev.includes(name)) return prev.filter((x) => x !== name);
      if (prev.length < 2) return [...prev, name];
      return prev;
    });
  };

  return (
    <main className="max-w-4xl mx-auto">
      <AbilitiesList selectedAbility={ability} onSelect={setAbility} />
      {/* Controles de compare */}
      <CompareControls
        compareMode={compareMode}
        compareCount={compareList.length}
        onToggleMode={handleToggleMode}
        onCompare={handleCompare}
      />
      {/* pokemons by ability */}
      <PokemonsByAbility
        abilitySelect={ability!}
        onItemClick={handleCardClick}
        selectedForCompare={compareList}
      />
      {/* Modal compare */}
      {showCompare && (
        <CompareModal
          isOpen={showCompare}
          pokemonNames={[compareList[0] as string, compareList[1] as string]}
          onClose={() => setShowCompare(false)}
        />
      )}
    </main>
  );
};
