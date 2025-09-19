
import React from 'react';
import { Briefing } from '../types';

interface BriefingDisplayProps {
  briefing: Briefing;
}

export const BriefingDisplay: React.FC<BriefingDisplayProps> = ({ briefing }) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
      <div className="w-full h-48 sm:h-64 md:h-80 bg-gray-700">
        <img 
          src={briefing.imageUrl} 
          alt="AI Generated Sports Briefing Visual" 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-teal-300">Your Daily Briefing</h2>
        <div 
            className="prose prose-invert max-w-none text-gray-300 prose-headings:text-sky-300" 
            style={{ whiteSpace: 'pre-wrap' }}
        >
            {briefing.text}
        </div>

        {briefing.sources && briefing.sources.length > 0 && (
          <div className="mt-8 pt-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-gray-400 mb-3">Sources:</h3>
            <ul className="list-disc list-inside space-y-1">
              {briefing.sources.map((source, index) => (
                <li key={index} className="text-sm">
                  <a 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sky-400 hover:text-sky-300 hover:underline transition-colors"
                  >
                    {source.title || source.uri}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
