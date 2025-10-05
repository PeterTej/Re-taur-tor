
import React, { useCallback, useState } from 'react';

interface UploadProps {
  onImageUpload: (file: File) => void;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const Upload: React.FC<UploadProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (files: FileList | null) => {
    setError(null);
    if (files && files.length > 0) {
      const file = files[0];
      if (ALLOWED_TYPES.includes(file.type)) {
        onImageUpload(file);
      } else {
        setError('Nepodporovaný formát súboru. Prosím, nahrajte JPG, PNG alebo WEBP.');
      }
    }
  };

  const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [onImageUpload]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`relative w-full h-64 border-2 border-dashed rounded-lg flex flex-col justify-center items-center transition-colors duration-200 ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
        }`}
      >
        <input
          type="file"
          id="file-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept={ALLOWED_TYPES.join(',')}
          onChange={(e) => handleFileChange(e.target.files)}
        />
        <div className="text-center pointer-events-none">
          <i className="fa-solid fa-cloud-arrow-up text-5xl text-gray-400 dark:text-gray-500 mb-4"></i>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Kliknite pre nahratie alebo presuňte fotografiu sem
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Podporované formáty: JPG, PNG, WEBP
          </p>
        </div>
      </div>
      {error && <p className="mt-4 text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};
