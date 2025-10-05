
import React from 'react';

interface ComparisonViewProps {
  originalImage: string;
  restoredImage: string;
  onReset: () => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  originalImage,
  restoredImage,
  onReset,
}) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-3 text-gray-700 dark:text-gray-300">Predtým</h2>
          <img
            src={originalImage}
            alt="Original"
            className="rounded-lg shadow-md w-full h-auto object-contain max-h-[60vh]"
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-3 text-gray-700 dark:text-gray-300">Potom</h2>
          <img
            src={restoredImage}
            alt="Restored"
            className="rounded-lg shadow-md w-full h-auto object-contain max-h-[60vh]"
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <a
          href={restoredImage}
          download="obnovena-fotografia.png"
          className="w-full sm:w-auto text-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-download"></i>
          Stiahnuť obnovenú fotografiu
        </a>
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-arrow-rotate-left"></i>
          Obnoviť ďalšiu fotografiu
        </button>
      </div>
    </div>
  );
};
