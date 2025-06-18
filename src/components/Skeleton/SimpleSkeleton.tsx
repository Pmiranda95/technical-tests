import React from 'react';

export interface SimpleSkeletonProps {
  className?: string;
}

export const SimpleSkeleton: React.FC<SimpleSkeletonProps> = ({ className = '' }) => (
  <div
    className={['bg-gray-400', 'dark:bg-gray-700', 'animate-pulse', 'rounded-lg', className].join(
      ' '
    )}
  />
);
