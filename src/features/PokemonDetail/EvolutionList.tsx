import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag } from '../../components/Tag/Tag';

interface EvolutionListProps {
  evolutions: string[];
}

export const EvolutionList: React.FC<EvolutionListProps> = ({ evolutions }) => {
  const navigate = useNavigate();

  if (evolutions.length === 0) return null;

  return (
    <section className="my-2">
      <h3 className="font-semibold mt-6 mb-4 text-lg text-white">Evolutions</h3>
      <ul className="flex flex-wrap gap-3 mt-2">
        {evolutions.map((name) => (
          <li key={name}>
            <Tag
              label={name.replace('-', ' ')}
              onClick={() => navigate(`/pokemon/${name}`)}
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
  );
};
