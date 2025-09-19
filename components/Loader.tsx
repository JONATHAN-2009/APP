
import React from 'react';

interface LoaderProps {
  message: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 mt-8 text-center">
      <div className="w-12 h-12 border-4 border-t-transparent border-teal-400 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-gray-300">{message}</p>
    </div>
  );
};
