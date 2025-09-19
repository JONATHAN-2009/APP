
import React from 'react';

interface SportSelectorProps {
  sports: string[];
  selectedSports: string[];
  onSportChange: (sport: string) => void;
  onGenerate: () => void;
  isGenerateDisabled: boolean;
}

export const SportSelector: React.FC<SportSelectorProps> = ({ sports, selectedSports, onSportChange, onGenerate, isGenerateDisabled }) => {
  return (
    <div className="bg-gray-800/60 p-6 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-center text-teal-300">2. Choose Your Sports</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
        {sports.map((sport) => (
          <label
            key={sport}
            className={`flex items-center justify-center p-3 text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 border-2 ${
              selectedSports.includes(sport)
                ? 'bg-teal-500 border-teal-400 text-white shadow-md shadow-teal-500/20'
                : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={selectedSports.includes(sport)}
              onChange={() => onSportChange(sport)}
            />
            {sport}
          </label>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={onGenerate}
          disabled={isGenerateDisabled}
          className="px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
        >
          {isGenerateDisabled && selectedSports.length > 0 ? 'Generating...' : 'Generate Briefing'}
        </button>
      </div>
    </div>
  );
};
