
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SportSelector } from './components/SportSelector';
import { BriefingDisplay } from './components/BriefingDisplay';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { generateSportsBriefing, generateBriefingImage } from './services/geminiService';
import { Briefing } from './types';
import { SPORTS_LIST } from './constants';

const App: React.FC = () => {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [briefing, setBriefing] = useState<Briefing | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSportSelectionChange = (sport: string) => {
    setSelectedSports(prev =>
      prev.includes(sport)
        ? prev.filter(s => s !== sport)
        : [...prev, sport]
    );
  };

  const handleGenerateBriefing = useCallback(async () => {
    if (selectedSports.length === 0) {
      setError("Please select at least one sport to generate a briefing.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setBriefing(null);

    try {
      setLoadingMessage("Analyzing the latest sports news...");
      const briefingResult = await generateSportsBriefing(selectedSports);

      if (!briefingResult || !briefingResult.text) {
        throw new Error("Failed to generate a briefing. The AI model returned no content.");
      }
      
      setLoadingMessage("Creating a unique image for your briefing...");
      const imageUrl = await generateBriefingImage(briefingResult.text);

      setBriefing({ text: briefingResult.text, imageUrl, sources: briefingResult.sources });

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [selectedSports]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-8">
          
          <SportSelector
            sports={SPORTS_LIST}
            selectedSports={selectedSports}
            onSportChange={handleSportSelectionChange}
            onGenerate={handleGenerateBriefing}
            isGenerateDisabled={isLoading || selectedSports.length === 0}
          />

          {isLoading && <Loader message={loadingMessage} />}
          {error && <ErrorMessage message={error} />}
          
          {!isLoading && briefing && (
            <div className="mt-8 w-full animate-fade-in">
              <BriefingDisplay briefing={briefing} />
            </div>
          )}

          {!isLoading && !briefing && !error && (
             <div className="text-center mt-12 p-8 bg-gray-800/50 rounded-lg">
                <h2 className="text-2xl font-bold text-teal-300">Welcome to Sportify!</h2>
                <p className="mt-2 text-gray-400">Select your favorite sports and click "Generate Briefing" to get your personalized AI-powered sports report.</p>
             </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;