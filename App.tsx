
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Upload } from './components/Upload';
import { ComparisonView } from './components/ComparisonView';
import { Spinner } from './components/Spinner';
import { restorePhoto } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

type AppState = 'idle' | 'loading' | 'success' | 'error';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleImageUpload = useCallback(async (file: File) => {
    setAppState('loading');
    setOriginalImage(URL.createObjectURL(file));
    setRestoredImage(null);
    setErrorMessage('');

    try {
      const { base64Data, mimeType } = await fileToBase64(file);
      const restoredImageData = await restorePhoto(base64Data, mimeType);
      
      if (!restoredImageData) {
        throw new Error('Nepodarilo sa získať obnovený obrázok z API.');
      }

      setRestoredImage(`data:${mimeType};base64,${restoredImageData}`);
      setAppState('success');
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Neznáma chyba.';
      setErrorMessage(`Nastala chyba pri obnove fotografie: ${message}`);
      setAppState('error');
    }
  }, []);

  const handleReset = () => {
    setOriginalImage(null);
    setRestoredImage(null);
    setAppState('idle');
    setErrorMessage('');
  };

  const renderContent = () => {
    switch (appState) {
      case 'loading':
        return <Spinner message="AI pracuje na obnove vašej fotografie..." />;
      case 'success':
        return (
          originalImage &&
          restoredImage && (
            <ComparisonView
              originalImage={originalImage}
              restoredImage={restoredImage}
              onReset={handleReset}
            />
          )
        );
      case 'error':
        return (
          <div className="text-center p-8 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 rounded-lg">
            <p className="text-red-700 dark:text-red-300 font-semibold mb-4">{errorMessage}</p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Skúsiť znova
            </button>
          </div>
        );
      case 'idle':
      default:
        return <Upload onImageUpload={handleImageUpload} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <Header />
        <main className="mt-8 bg-white dark:bg-gray-800/50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
