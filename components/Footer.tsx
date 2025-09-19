
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center py-4 mt-8 border-t border-gray-800">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Sportify. Powered by Google Gemini.
      </p>
    </footer>
  );
};
