import React from 'react';

export interface CardPokemonProps {
  name: string;
  img: string;
  color?: string;
  onClick?: () => void;
}

export const CardPokemon: React.FC<CardPokemonProps> = ({
  name,
  img,
  color = 'gray-600',
  onClick,
}) => {
  return (
    <li
      key={name}
      onClick={onClick}
      aria-label={name}
      style={{ border: 'solid', borderColor: color }}
      className={`
        relative
        flex flex-col items-center p-4
        bg-gray-900  
        text-white
        rounded-xl
        shadow-lg 
        transition-transform transform hover:scale-105
        cursor-pointer
      `}
    >
      <div
        className={`
          absolute inset-0 rounded-xl
          pointer-events-none
        `}
      />

      {/* content */}
      <div className="relative z-10 flex flex-col items-center">
        <img src={img} alt={name} loading="lazy" className="w-28 h-28 mb-3" />
        <p className="capitalize font-bold text-sm">{name}</p>
      </div>
    </li>
  );
};
