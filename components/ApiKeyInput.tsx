
import React from 'react';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  isLoading: boolean;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, setApiKey, isLoading }) => {
  return (
    <div className="bg-gray-800/60 p-6 rounded-xl shadow-lg border border-gray-700">
      <label htmlFor="apiKey" className="block text-xl font-semibold mb-3 text-center text-teal-300">
        1. Enter Your Google Gemini API Key
      </label>
      <input
        id="apiKey"
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        disabled={isLoading}
        placeholder="Collez votre clé API ici..."
        className="w-full px-4 py-2 bg-gray-900 border-2 border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors"
        aria-label="Google Gemini API Key Input"
      />
       <p className="text-center text-xs text-gray-500 mt-3">
        Your key is used only for this session and is not stored.
      </p>
    </div>
  );
};
