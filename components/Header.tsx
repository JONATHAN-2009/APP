
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm shadow-lg shadow-teal-500/10 text-center py-6 border-b border-gray-700">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-teal-300 via-sky-400 to-indigo-500 text-transparent bg-clip-text">
          Sportify
        </span>
      </h1>
      <p className="mt-2 text-gray-400 text-sm md:text-base">Your AI-Powered Sports Desk</p>
    </header>
  );
};
