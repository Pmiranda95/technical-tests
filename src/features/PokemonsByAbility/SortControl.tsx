import React from 'react';

export interface SortControlProps {
  sortOrder: 'asc' | 'desc';
  onChange: (order: 'asc' | 'desc') => void;
}

export const SortControl: React.FC<SortControlProps> = ({ sortOrder, onChange }) => (
  <div className="flex justify-end items-center space-x-2 px-4 mb-4">
    <label htmlFor="sort" className="text-sm text-gray-200">
      Sort by height:
    </label>
    <select
      id="sort"
      value={sortOrder}
      onChange={(e) => onChange(e.target.value as 'asc' | 'desc')}
      className="bg-gray-800 text-white px-2 py-1 rounded"
    >
      <option value="asc">Low → High</option>
      <option value="desc">High → Low</option>
    </select>
  </div>
);
