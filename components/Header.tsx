
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        AI Reštaurátor Fotografií
      </h1>
      <p className="mt-3 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Vdýchnite nový život vašim starým spomienkam pomocou umelej inteligencie.
      </p>
    </header>
  );
};
