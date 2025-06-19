import React from 'react';

export interface TagProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ label, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`
      inline-block
      px-3 py-1
      bg-blue-600 text-white
      rounded-full
      text-sm font-medium
      hover:bg-blue-700
      focus:outline-none focus:ring-2 focus:ring-blue-300
      transition
      ${className}
    `}
  >
    {label}
  </button>
);
