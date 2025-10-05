
import React from 'react';

interface SpinnerProps {
  message: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600 dark:border-blue-400"></div>
      <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">{message}</p>
    </div>
  );
};
